const express = require('express');
const knex = require('knex');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = knex({
  client: 'mysql',
  connection: {
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : 'password',
    database : '611test'
  }
});

// Serialization and Deserialization
const recordToFeature = function (record) {
    const geometry = {
      type: 'Point',
      coordinates: [record.longitude, record.latitude],
    };
    const properties = { ...record };  // This line makes a copy of the record.
    delete properties.latitude;
    delete properties.longitude;
  
    return {
      type: 'Feature',
      geometry,
      properties,
    };
  };

const featureToRecord = function (feature) {
    const coords = feature.geometry.coordinates;
    const record = { ...feature.properties };  // This makes a copy of the feature properties.
    [record.longitude, record.latitude] = coords;
    return record;
  };

app.get('/dogprofiles/', (req, res) => {
    db.select().from('dogprofiles')
        .then(records => {
        res.json({
          type: 'FeatureCollection',
          features: records.map(recordToFeature),  // Serialize the records.
        });
      });
  });

app.post('/dogprofiles/', (req, res) => {
    const newRecord = featureToRecord(req.body);  // Deserialize the request data.  
    console.log("the data ready to go to database");
    console.log(newRecord);
    db.insert(newRecord).into('dogprofiles')
      .then(insertedRecords => {
          console.log("the data from database");
          console.log(newRecord);
        //   const newFeature = recordToFeature(insertedRecords[0]);
          res.json(recordToFeature(newRecord));
      });
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});