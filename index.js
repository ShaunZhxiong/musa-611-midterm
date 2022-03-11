/* global map */

const dogMap = L.map('dog-map',{scrollWheelZoom: false}).setView([40.72995787857809, -73.99271702327988], 13);
const layerGroup = L.layerGroup().addTo(dogMap);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
}).addTo(dogMap);

const dogLicensesBoundSmall = [
	[40.70250,-74.02656],
	[40.70250,-73.93524],
	[40.79509,-73.93524],
	[40.79509,-74.02656],
	[40.70250,-74.02656]
];

const petStoresBound = [
	[40.660847697284815,-74.0478515625],
	[40.660847697284815,-73.87859344482422],
	[40.823682398765996,-73.87859344482422],
	[40.823682398765996,-74.0478515625],
	[40.660847697284815,-74.0478515625]
];

/* current slide index */
let currentSlideIndex = 0;

const slideDivs = document.getElementsByClassName('slide');

function calcCurrentSlideIndex() {
  const scrollPos = window.scrollY + window.innerHeight;
  let i;
  for (i = 0; i < slideDivs.length; i++) {
    const slidePos = slideDivs[i].offsetTop;
    if (slidePos > scrollPos) {
      break;
    }
  }

  if (i === 0) {
    currentSlideIndex = 0;
		layerGroup.clearLayers();
  } else if (currentSlideIndex != i-1) {
    currentSlideIndex = i - 1;
		if (currentSlideIndex === 0) {
			init();
			layerGroup.clearLayers();
			} else if (currentSlideIndex === 1) {
			updateDogRunsMarkers(dogRuns);
			} else if (currentSlideIndex === 2) {
			updateDogRunsBiggest(dogRuns);
			} else if (currentSlideIndex === 3) {
			updatedogLicensesMarkers(dogLicenses);
			} else if (currentSlideIndex === 4) {
			updatedogLicensesFarest(dogLicenses);
			} else if (currentSlideIndex === 5) {
			updatePetStoresMarkers(petStores);
			};
  }
}
/* show the dog breeds */

const dogLicensesStyle = {
  color: "#FFD000",
  fillColor: "#FFD000",
  fillOpacity: 0.5,
};

let updatedogLicensesMarkers = (dogLicenses) => {
  /* celar layer*/
  layerGroup.clearLayers();
  /* fly to bounds*/
  let dogLicensesBound = L.geoJSON(dogLicenses);
  dogMap.flyToBounds(dogLicensesBoundSmall);
  /* Loop each dog store to plot it*/
  dogLicenses.forEach(dogLicense => {
    let circleMarker = L.circle([dogLicense.geometry.coordinates[1], dogLicense.geometry.coordinates[0]],40, dogLicensesStyle)
    .bindTooltip(dogLicense.properties.GEOID.toString())
    .addTo(layerGroup);
    let dogLicensesGEOID = dogLicense.properties.GEOID.toString();
  /* Add event listener*/
    circleMarker.addEventListener('click', () => {
      circleMarker.bindPopup(
        `<h6>${dogLicensesGEOID}</h6>`
        ).openPopup();
    });
  });
};

let updatedogLicensesFarest = (dogLicenses) => {
  /* FIND THE BIGGEST ONE*/
  dogLicenses.forEach(dogLicense => {
		if (dogLicense.properties.GEOID === 98363) {
			let farestLicense = dogLicense;
		/* celar layer*/
  		layerGroup.clearLayers();	
		/* fly to bounds*/
			let dogLicensesBound = L.latLng(farestLicense.geometry.coordinates[1], farestLicense.geometry.coordinates[0]);
			dogMap.flyToBounds(dogLicensesBound.toBounds(2000));
			console.log(L.rectangle(dogLicensesBound.toBounds(50)));
		/* PLOT IT*/
			let circleMarker = L.circle([farestLicense.geometry.coordinates[1], farestLicense.geometry.coordinates[0]],40, dogLicensesStyle)
			.bindTooltip(farestLicense.properties.GEOID.toString())
			.addTo(layerGroup);
			let dogLicensesGEOID = farestLicense.properties.GEOID.toString();
		/* Add event listener*/
			circleMarker.addEventListener('click', () => {
				circleMarker.bindPopup(
					`<h6>${dogLicensesGEOID}</h6>`
					).openPopup();
			});
		};
  });
};

/* show the dog runs */

const dogRunsStyle = {
  "color": "#ff7800",
  "weight": 5,
  "opacity": 0.65
};

let updateDogRunsMarkers = (dogRuns) => {
  /* celar layer*/
  layerGroup.clearLayers();
  /* fly to bounds*/
	let dogRunBound = L.geoJSON(dogRuns,{style: dogRunsStyle});
	dogMap.flyToBounds(dogRunBound.getBounds());
  /* Loop each dog run to plot it*/
  dogRuns.forEach(dogRun => {
    let dogRunpolygon = L.geoJSON([dogRun],{style: dogRunsStyle})
    .bindTooltip(dogRun.properties.name)
    .addTo(layerGroup);
    let dogRunName = dogRun.properties.name
  /* Add event listener*/
    dogRunpolygon.addEventListener('click', () => {
      dogRunpolygon.bindPopup(
        `<h6>${dogRunName}</h6>`
        ).openPopup();
    });
  });
};

let updateDogRunsBiggest = (dogRuns) => {
  /* FIND THE BIGGEST ONE*/
  dogRuns.forEach(dogRun => {
		if (dogRun.properties.name === "Rockaway Freeway Dog Park") {
			let biggestDogRun = dogRun;
		/* celar layer*/
  		layerGroup.clearLayers();	
		/* fly to bounds*/
			let dogRunBound = L.geoJSON([biggestDogRun],{style: dogRunsStyle});
			dogMap.flyToBounds(dogRunBound.getBounds().pad(0.75));
			console.log(dogRunBound.getBounds());
		/* PLOT IT*/
			let dogRunpolygon = L.geoJSON([biggestDogRun],{style: dogRunsStyle})
			.bindTooltip(biggestDogRun.properties.name)
			.addTo(layerGroup);
			let dogRunName = biggestDogRun.properties.name
		/* Add event listener*/
			dogRunpolygon.addEventListener('click', () => {
				dogRunpolygon.bindPopup(
					`<h6>${dogRunName}</h6>`
					).openPopup();
			});
		};
  });
};

/* show the pet store */

const petStoreStyle = {
  color: "#EF6190",
  fillColor: "#EF6190",
  fillOpacity: 0.5,
};

let updatePetStoresMarkers = (petStores) => {
  /* celar layer*/
  layerGroup.clearLayers();
	/* fly to bounds*/
  dogMap.flyToBounds(petStoresBound);
  /* Loop each dog store to plot it*/
  petStores.forEach(PetStore => {
    let circleMarker = L.circle([PetStore.lat, PetStore.lon],40, petStoreStyle)
    .bindTooltip(PetStore.tags.name)
    .addTo(layerGroup);
    let petStoreName = PetStore.tags.name
  /* Add event listener*/
    circleMarker.addEventListener('click', () => {
      circleMarker.bindPopup(
        `<h6>${petStoreName}</h6>`
        ).openPopup();
    });
  });
};

/* initial function*/
calcCurrentSlideIndex()
document.addEventListener('scroll', calcCurrentSlideIndex);

/* Animation Title*/
let canvas = document.querySelector('.the-canvas');
let context = canvas.getContext('2d');
let ratio = window.devicePixelRatio || 1;

let totalLineHeight = 1000;
let totalLines = 3;
let totalDiff = totalLineHeight / totalLines;
let fontHeight = 60 * ratio - 50; // Small centering

let smallestWidth = 280; // width of smallest line;
let offsetX = 10;
let offsetY = 1;
var iterations;
var verticalAlign, line1Diff, line2Diff, line3Diff, line4Diff, iterations, iteration, animationFrame;

let startRGB = [100, 255, 255];
let endRGB   = [220, 165, 163];
let fullColorSet = [];

function init() {
  
  // Cancel any already running animations
  cancelAnimationFrame(animationFrame);
  // Set the canvas width and height
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  // Set the canvas font properties
  context.font = '350px Varela Round';
  context.textAlign = 'center';
  context.strokeStyle = "#F3BE4E";
  context.lineWidth = "5";
  context.textBaseline = "middle"; 
  // Centering of the text
  verticalAlign = (window.innerHeight / 2  * ratio) - totalLineHeight / 2;
  line2Diff = totalLineHeight + fontHeight - totalDiff * 1;
  line3Diff = totalLineHeight + fontHeight - totalDiff * 2;
  line4Diff = totalLineHeight + fontHeight - totalDiff * 3;
  // How many iterations will we go through?
  iterations = Math.floor(((window.innerWidth * ratio / 2) - (smallestWidth * ratio / 2)) / offsetX + 5);
  prepareColorSets(iterations);
  iteration = 0;
  animationFrame = requestAnimationFrame(draw);
}

// Draw loop
function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for( let i = iterations - 1; i > 0; i-- ) {
    context.fillStyle = 'rgb(' + fullColorSet[i][0] + ',' + fullColorSet[i][1] + ',' + fullColorSet[i][2] + ')';
    let x = window.innerWidth / 2 * ratio - i * offsetX;
    let y = verticalAlign + i * offsetY + (Math.sin(i + iteration) * 2);
    drawText( x, y );
  } 
  iteration += 0.1; 
  animationFrame = requestAnimationFrame(draw);
}

// Draw the single lines of text.
function drawText(x, y) {
  context.fillText("Doggy", x, y + line4Diff);
  context.strokeText("Doggy", x, y + line4Diff);
  context.fillText("in", x, y + line3Diff);
  context.strokeText("in", x, y + line3Diff);
  context.fillText("New York City", x, y + line2Diff);
  context.strokeText("New York City", x, y + line2Diff);
}

// We do this so we don't have to calculate these EVERY loop.
function prepareColorSets(iterations) {
  fullColorSet = [];
  for( var i = 0; i < iterations; i++ ) {
    fullColorSet.push(colourGradientor(1 - i / iterations, startRGB, endRGB));
  }
}

// THNX - http://stackoverflow.com/questions/14482226/how-can-i-get-the-color-halfway-between-two-colors
function colourGradientor(p, rgb_beginning, rgb_end){

  var w = p * 2 - 1;
  var w1 = (w + 1) / 2.0;
  var w2 = 1 - w1;
  var rgb = [parseInt(rgb_beginning[0] * w1 + rgb_end[0] * w2),
             parseInt(rgb_beginning[1] * w1 + rgb_end[1] * w2),
             parseInt(rgb_beginning[2] * w1 + rgb_end[2] * w2)];
  return rgb;
};

window.onresize = init;
