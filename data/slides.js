const slides = [
  {
    /* slide 0*/
    title: "Introduction",
    content: `
    Are you a dog lover?
    Are you curious about doggy in New York City?
    This is the exploring project about doggies in New York City.
    1. How many dog runs are within New York City and where are they?
    2. What kinds of dog breed are favored by New Yorkers?
    3. Where can New Yorkers access the pet supply stores?
    These are three questions will be answered in this project.`,
  },

  {
    /* slide 1*/
    title: 'Dog Runs',
    content: `
    There are 87 dog runs in New York City.
    They are mainly distributed around Manhattan Island and Brookyln.
    A dog run is any dedicated outdoor space or structure for your pooch to run free, scratch, roll, and be her delightful canine self. 
    `,
    comment: 'All',
    dataSources: 'https://data.cityofnewyork.us/Recreation/NYC-Parks-Dog-Runs/8nac-uner?category=Recreation&view_name=NYC-Parks-Dog-Runs',
    dataSample: [{
      "type": "Feature",
      "properties": {
        "zipcode": "10038",
        "name": "Fishbridge Garden Dog Run",
        "system": "M291-DOGAREA0043",
        "surface": null,
        "dog_area_t": "Dog Run",
        "featuresta": "Active",
        "parentid": "M291",
        "gispropnum": "M291",
        "objectid": "292",
        "communityb": "101",
        "department": "M-01",
        "precinct": "1",
        "seating": null,
        "councildis": "1",
        "borough": "M"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [
                -74.0016459156729,
                40.70932680472401
              ],
              [
                -74.00098833771662,
                40.70879507039175
              ],
              [
                -74.00099960334362,
                40.70878952584789
              ],
              [
                -74.00101171034044,
                40.70878356706042
              ],
              [
                -74.00117387177642,
                40.708936336320384
              ],
              [
                -74.00121032168734,
                40.7089132675515
              ],
              [
                -74.00122671644164,
                40.70892831491748
              ],
              [
                -74.00126161258908,
                40.70890685446162
              ],
              [
                -74.00138574985006,
                40.70902314683076
              ],
              [
                -74.00138872482171,
                40.709021319658035
              ],
              [
                -74.00167338737218,
                40.709306008827475
              ],
              [
                -74.0016459156729,
                40.70932680472401
              ]
            ]
          ]
        ]
      }
    }]
  },

  {
    /* slide 2*/
    title: 'Dog Runs - Focus Group',
    content: `
    The biggest dog run in NYC is Rockaway Freeway Dog Park in Queens.
    Its area is 8259 sqm, which equals to 1.15 standard soccer fileds.
    Your doggy can freely chase frisbee here. (should have pics) 
    `,
    comment: 'The Biggest',
    dataWrangling: 'to filter the data, I use name to do the filter',
    dataSources: 'https://data.cityofnewyork.us/Recreation/NYC-Parks-Dog-Runs/8nac-uner?category=Recreation&view_name=NYC-Parks-Dog-Runs',
    dataSample: {
      "type": "Feature",
      "properties": {
        "zipcode": "10038",
        "name": "Fishbridge Garden Dog Run",
        "system": "M291-DOGAREA0043",
        "surface": null,
        "dog_area_t": "Dog Run",
        "featuresta": "Active",
        "parentid": "M291",
        "gispropnum": "M291",
        "objectid": "292",
        "communityb": "101",
        "department": "M-01",
        "precinct": "1",
        "seating": null,
        "councildis": "1",
        "borough": "M"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [
                -74.0016459156729,
                40.70932680472401
              ],
              [
                -74.00098833771662,
                40.70879507039175
              ],
              [
                -74.00099960334362,
                40.70878952584789
              ],
              [
                -74.00101171034044,
                40.70878356706042
              ],
              [
                -74.00117387177642,
                40.708936336320384
              ],
              [
                -74.00121032168734,
                40.7089132675515
              ],
              [
                -74.00122671644164,
                40.70892831491748
              ],
              [
                -74.00126161258908,
                40.70890685446162
              ],
              [
                -74.00138574985006,
                40.70902314683076
              ],
              [
                -74.00138872482171,
                40.709021319658035
              ],
              [
                -74.00167338737218,
                40.709306008827475
              ],
              [
                -74.0016459156729,
                40.70932680472401
              ]
            ]
          ]
        ]
      }
    }
  },

  {
    title: 'Dog Licenses',
    content: `
    The percentage for Male Dog is 0.546. For Female Dog it is 0.453.
    The average year is 9.78
    The most popular breeds for NYC is Yorkshire Terrier.
    (should have photo)
    Play with the map to know the star breed around your neighborhood?
    `,
    comment: `All`,
    dataWrangling:'In python, attach zipcode with acs data to get locations',
    dataSources: `https://data.cityofnewyork.us/Health/NYC-Dog-Licensing-Dataset/nu7n-tubp`
    dataSample: {
      "type": "Feature",
      "properties": {
        "GEOID": 1001, 
        "count": 1, 
        "Femalperc": 0.0, 
        "Maleperc": 100.0, 
        "Age": 3.0
      },
      "geometry": { 
        "type": "Point", 
        "coordinates": [-72.625877468731304, 42.062582542707574] 
      }
    }
  },

  {
    title: 'Dog Licenses - Focus Group',
    content: `
    The wanderer NYC doggy is at Port Angeles, WA.
    It is a 
    (should have photo about the place)
    `,
    comment: `The Biggest Distance`,
    dataWrangling:'Use sort function to get the larggest distance',
    dataSources: `https://data.cityofnewyork.us/Health/NYC-Dog-Licensing-Dataset/nu7n-tubp`,
    dataSample: {
      "type": "Feature",
      "properties": {
        "GEOID": 1001, 
        "count": 1, 
        "Femalperc": 0.0, 
        "Maleperc": 100.0, 
        "Age": 3.0
      },
      "geometry": { 
        "type": "Point", 
        "coordinates": [-72.625877468731304, 42.062582542707574] 
      }
    }
  },

  {
    title: 'Pet Store',
    content: `
    There are XX pet stores in NYC.
    Come  and check the nearest pet stores around you.
    Make sure your doggy get the dog snacks!!
    (should have photos)
    `,
    comment: `All`,
    dataSources: 'Scrap from OSM',
    dataSample: {'id': 1157647167,
    'lat': 40.6774406,
    'lon': -73.9691709,
    'tags': {'addr:housenumber': '628',
     'addr:street': 'Vanderbilt Avenue',
     'delivery': 'yes',
     'name': 'Acme Pet Food',
     'opening_hours': 'Mo-Fr 10:00-19:00; Sa 10:00-18:00; Su 11:00-17:00',
     'phone': '+1-718-789-8062',
     'shop': 'pet'},
    'type': 'node'}
  },
];
