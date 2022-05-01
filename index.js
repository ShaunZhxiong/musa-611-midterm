const dogMap = L.map('dog-map', { scrollWheelZoom: false }).setView([40.72995787857809, -73.99271702327988], 13);
const layerGroup = L.layerGroup().addTo(dogMap);
const dogFriendGroup = L.layerGroup().addTo(dogMap);
const dogLicenseGroup = L.layerGroup().addTo(dogMap);
const apiHost = 'http://localhost:3000';

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 20,
}).addTo(dogMap);

const dogLicensesBoundSmall = [
  [40.70250, -74.02656],
  [40.70250, -73.93524],
  [40.79509, -73.93524],
  [40.79509, -74.02656],
  [40.70250, -74.02656],
];

const petStoresBound = [
  [40.660847697284815, -74.0478515625],
  [40.660847697284815, -73.87859344482422],
  [40.823682398765996, -73.87859344482422],
  [40.823682398765996, -74.0478515625],
  [40.660847697284815, -74.0478515625],
];

/* show the dog breeds */

const dogLicensesStyle = {
  color: '#FFD000',
  fillColor: '#FFD000',
  fillOpacity: 0.5,
};

const dogLicensesBound = L.geoJSON(dogLicenses);

const updatedogLicensesMarkers = (dogLicenses) => {
  /* celar layer  */
  layerGroup.clearLayers();
  dogLicenseGroup.clearLayers();
  /* fly to bounds  */
  dogMap.flyToBounds(dogLicensesBoundSmall);
  /* Loop each dog store to plot it */
  dogLicenses.forEach((dogLicense) => {
    const circleMarker = L.circle([dogLicense.geometry.coordinates[1], dogLicense.geometry.coordinates[0]], 40, dogLicensesStyle)
      .bindTooltip(dogLicense.properties.GEOID.toString())
      .addTo(layerGroup);
    const dogLicensesGEOID = dogLicense.properties.GEOID.toString();
    /* Add event listener */
    circleMarker.addEventListener('click', () => {
      zipCodeBoundary(dogLicense.properties.GEOID);
      circleMarker.bindPopup(
        `<h6>${dogLicensesGEOID}</h6>
        <ul>
        <li>Total Numer: ${dogLicense.properties.count.toString()} </li>
        <li>Age: ${dogLicense.properties.Age.toString()} </li>
        <li>Female %: ${dogLicense.properties.Femalperc.toString()} </li>
        <li>Male %: ${dogLicense.properties.Maleperc.toString()} </li></ul>`,
        ).openPopup();
      });
  });
};

const zipCodeBoundary = (zipcode) => {
  dogLicenseGroup.clearLayers();
  const dataUrl = `data/zipcodePoly/${zipcode}.geojson`;
  $.getJSON(dataUrl, function (data) {
    const dogLicensesPoly = L.geoJson(data, dogLicensesStyle).addTo(dogLicenseGroup)
      .addEventListener('click', () => {
        dogLicenseGroup.clearLayers();
        if (zipcode !== 98363) {
          updatedogLicensesMarkers(dogLicenses);
        } else updatedogLicensesFarest(dogLicenses);
      });
    dogMap.flyToBounds(dogLicensesPoly.getBounds());
  });
};

$('#form1').submit( function(e) {
  e.preventDefault();
  const selectZipcodeElement = document.getElementById('zipcodeTypeIn');
  selectZipcode = selectZipcodeElement.value;
  if (selectZipcode === 'all') {
    updatedogLicensesMarkers(dogLicenses);
  } else zipCodedogLicenses(selectZipcode);
});

let zipCodedogLicenses = (selectZipcode) => {
  /* celar layer  */
  layerGroup.clearLayers();
  /* Loop each dog store to plot it */
  dogLicenses.forEach( (dogLicense) => {
    if (dogLicense.properties.GEOID.toString() === selectZipcode) {
      const circleMarker = L.circle([dogLicense.geometry.coordinates[1], dogLicense.geometry.coordinates[0]], 40, dogLicensesStyle)
        .bindTooltip(dogLicense.properties.GEOID.toString())
        .addTo(layerGroup);
      const dogLicensesGEOID = dogLicense.properties.GEOID.toString();
      zipCodeBoundary(dogLicense.properties.GEOID);
      circleMarker.bindPopup(
        `<h6>${dogLicensesGEOID}</h6>
        <ul>
        <li>Total Numer: ${dogLicense.properties.count.toString()} </li>
        <li>Age: ${dogLicense.properties.Age.toString()} </li>
        <li>Female %: ${dogLicense.properties.Femalperc.toString()} </li>
        <li>Male %: ${dogLicense.properties.Maleperc.toString()} </li></ul>`,
      ).openPopup();
    }
  });
};

let updatedogLicensesFarest = (dogLicenses) => {
  /* FIND THE farrest ONE */
  dogLicenses.forEach((dogLicense) => {
    if (dogLicense.properties.GEOID === 98363) {
      const farestLicense = dogLicense;
      /* celar layer  */
      layerGroup.clearLayers();
      /* fly to bounds  */
      const dogLicensesBound = L.latLng(farestLicense.geometry.coordinates[1], farestLicense.geometry.coordinates[0]);
      dogMap.flyToBounds(dogLicensesBound.toBounds(100000));
      /* PLOT IT  */
      zipCodeBoundary(dogLicense.properties.GEOID);
      const circleMarker = L.circle([farestLicense.geometry.coordinates[1], farestLicense.geometry.coordinates[0]], 40, dogLicensesStyle)
        .bindTooltip(farestLicense.properties.GEOID.toString())
        .addTo(layerGroup);
      const dogLicensesGEOID = farestLicense.properties.GEOID.toString();
      circleMarker.bindPopup(
        `<h6>${dogLicensesGEOID}</h6>
        <ul>
        <li>Total Numer: ${farestLicense.properties.count.toString()} </li>
        <li>Age: ${farestLicense.properties.Age.toString()} </li>
        <li>Female %: ${farestLicense.properties.Femalperc.toString()} </li>
        <li>Male %: ${farestLicense.properties.Maleperc.toString()} </li></ul>`,
      ).openPopup();
    }
  });
};

/* show the dog runs */

const dogRunsStyle = {
  color: '#ff7800',
  weight: 5,
  opacity: 0.65,
};

const dogRunBound = L.geoJSON(dogRuns, { style: dogRunsStyle });

const updateDogRunsMarkers = (dogRuns) => {
  /* celar layer  */
  layerGroup.clearLayers();
  /* fly to bounds  */
  dogMap.flyToBounds(dogRunBound.getBounds());
  /* Loop each dog run to plot it */
  dogRuns.forEach((dogRun) => {
    const dogRunpolygon = L.geoJSON([dogRun], { style: dogRunsStyle })
      .bindTooltip(dogRun.properties.name)
      .addTo(layerGroup);
    /* Add event listener */
    dogRunpolygon.addEventListener('click', () => {
      dogMap.flyToBounds(dogRunpolygon.getBounds());
      dogRunpolygon.bindTooltip(
        `<h6>${dogRun.properties.name}</h6>
        <ul>
          <li>Zipcode:${dogRun.properties.zipcode} </li>
          <li>Area: ${Math.round(dogRun.properties.area)} sqm</li>
          <li><a href='https://www.google.com/search?q=${dogRun.properties.name}' target='_blank'>More Info</a></li></ul>`,
      ).addTo(layerGroup);
      dogRunpolygon.addEventListener('click', () => {
        updateDogRunsMarkers(dogRuns);
      });
    });
  });
};

const updateDogRunsBiggest = (dogRuns) => {
  /* FIND THE BIGGEST ONE */
  dogRuns.forEach((dogRun) => {
    if (dogRun.properties.name === 'Rockaway Freeway Dog Park') {
      const biggestDogRun = dogRun;
      /* celar layer  */
      layerGroup.clearLayers();
      /* fly to bounds  */
      const dogRunBound = L.geoJSON([biggestDogRun], { style: dogRunsStyle });
      dogMap.flyToBounds(dogRunBound.getBounds().pad(0.75));
      /* PLOT IT  */
      const dogRunpolygon = L.geoJSON([biggestDogRun], { style: dogRunsStyle })
        .bindTooltip(biggestDogRun.properties.name)
        .addTo(layerGroup);
      /* Add event listener */
      dogRunpolygon.addEventListener('click', () => {
        dogRunpolygon.bindPopup(
          `<h6>${dogRun.properties.name}</h6>
          <ul>
            <li>Zipcode:${dogRun.properties.zipcode} </li>
            <li>Area: ${Math.round(dogRun.properties.area)}</li>
            <li><a href='https://www.google.com/search?q=${dogRun.properties.name}'>More Info</a></li>
          </ul>`,
        ).openPopup();
      });
    }
  });
};

/* show the pet store */

const petStoreStyle = {
  color: '#EF6190',
  fillColor: '#EF6190',
  fillOpacity: 0.5,
};

const updatePetStoresMarkers = (petStores) => {
  /* celar layer  */
  layerGroup.clearLayers();
  /* fly to bounds  */
  dogMap.flyToBounds(petStoresBound);
  /* Loop each dog store to plot it */
  petStores.forEach((PetStore) => {
    const circleMarker = L.circle([PetStore.lat, PetStore.lon], 40, petStoreStyle)
      .bindTooltip(PetStore.tags.name)
      .addTo(layerGroup);
    /* Add event listener */
    circleMarker.addEventListener('click', () => {
      circleMarker.bindPopup(
        JSON.stringify(PetStore.tags)
          .replace('{', '')
          .replace('}', '')
          .replaceAll('"', '')
          .replaceAll('addr:', '')
          .replaceAll(':', ':\ ')
          .replaceAll(',', '<br>')
          .toUpperCase(),
        // PetStore.tags.forEach( tag => {
        //   console.log(tag);
        // })
        // `<h6>${PetStore.tags[0]}</h6>`
      ).openPopup();
    });
  });
};

/* show the dog dating */
const icon = L.icon({
  iconUrl: 'dogPin.png',
  iconSize: [30, 45],
  iconAnchor: [15, 45]
});

let dogFriendLayer = null;
const loadDogFile = function () {
  fetch(`${apiHost}/dogprofiles/`)
    .then(resp => resp.json())
    .then(data => {
      // console.log(data);
      dogFriendLayer = L.geoJSON(data, {
        pointToLayer: (feature, latlng) => {
          return L.marker(latlng, { icon })
          .bindTooltip(feature.properties.Name)
          .bindPopup(
            `<ul>
              <li>Name: ${feature.properties.Name}</li>
              <li>Gender: ${feature.properties.Gender}</li>
              <li>Date of Birth: ${feature.properties.DOB}</li>
              <li>Contat: ${feature.properties.Email}</li>
              <li>Availability: ${feature.properties.Availability}</li>
            </ul>`
            ).openPopup();
        },
      });
      dogFriendLayer.addTo(dogFriendGroup);
    });
};


/* current slide index */
let currentSlideIndex = -1;

const slideDivs = document.getElementsByClassName('slide');

function calcCurrentSlideIndex() {
  const scrollPos = window.scrollY + window.innerHeight;
  let i;
  for (i = 0; i < (slideDivs.length); i++) {
    const slidePos = slideDivs[i].offsetTop;
    if (slidePos > scrollPos) {
      break;
    }
  }
  i--;
  if (i !== currentSlideIndex) {
    // changing
    currentSlideIndex = i;
    if (currentSlideIndex === 0) {
      layerGroup.clearLayers();
      init();
    } else {
      cancelAnimationFrame(animationFrame);
      if (currentSlideIndex === 1) {
        updateDogRunsMarkers(dogRuns);
      } else if (currentSlideIndex === 2) {
        updateDogRunsBiggest(dogRuns);
      } else if (currentSlideIndex === 3) {
        updatedogLicensesMarkers(dogLicenses);
      } else if (currentSlideIndex === 4) {
        updatedogLicensesFarest(dogLicenses);
      } else if (currentSlideIndex === 5) {
        dogFriendGroup.clearLayers();
        updatePetStoresMarkers(petStores);
      } else if (currentSlideIndex === 6) {
        layerGroup.clearLayers();
        loadDogFile();
      }
    }
  }
}

/* initial function */
init();
calcCurrentSlideIndex();
document.addEventListener('scroll', calcCurrentSlideIndex);
