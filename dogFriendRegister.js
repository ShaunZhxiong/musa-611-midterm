const registerToggleEl = document.querySelector('.Register');
const registerBtn = document.querySelector('.Register button');
const closeRegisterFormBtns = document.querySelectorAll('.close-register-form');
const registerReportFormEl = document.querySelector('.register-form');
const registerReportStepEls = document.querySelectorAll('.register-step');
const selectLocationStepEl = document.querySelector('.step-select-location');
const selectLocationContinueBtn = document.querySelector('.step-select-location button');
const detailsStepEl = document.querySelector('.step-give-details');
const submitBtn = document.querySelector('.step-give-details button');
const dogRegisterName = document.querySelector('#name');
const dogRegisterEmail = document.querySelector('#email');
const dogRegisterDOB = document.querySelector('#birth-datetime');
const dogRegisterGender = document.querySelector('#gender');
const checkboxes = document.querySelectorAll('#multiAvailabilites input');
let checkboxVals = "";
const checkboxFunct = function() {
  for (let i =0, n=checkboxes.length; i<n; i++)
  {
    if (checkboxes[i].checked)
    {
      checkboxVals += "," + checkboxes[i].id;
    }
  }
  if (checkboxVals) checkboxVals=checkboxVals.substring(1);
}
// hide steps
const hideAllRegisterSteps = function () {
  for (const stepEl of registerReportStepEls) {                         // (1)
    stepEl.classList.add('hidden');
  }
  dogMap.removeEventListener('click', handlePointSelection);
  reportMarkers.clearLayers();
};
// click register and show registeration form
const openRegisterForm = function () {
    console.log('Opening the form.');
    registerToggleEl.classList.add('hidden');
    registerReportFormEl.classList.remove('hidden');
  };

// close form
const closeRegisterForm = function () {
    console.log('Closing the form.');
    hideAllRegisterSteps();
    registerToggleEl.classList.remove('hidden');
    registerReportFormEl.classList.add('hidden');
  };

// reset register form
const resetRegisterForm = function () {
  reportMarkers.clearLayers();
  reportMarker = null;
  selectLocationContinueBtn.disabled = true;
};
let reportMarker = null;
let reportMarkers = L.layerGroup().addTo(dogMap);
// select dog location
const showSelectPointStep = function () {
  console.log('Showing the select-point step.');
  openRegisterForm();                                      // (1)
  hideAllRegisterSteps();             // (2)
  dogMap.addEventListener('click', handlePointSelection);     // (3)
  selectLocationStepEl.classList.remove('hidden');                 // (4)
};

const handlePointSelection = function (evt) {
  if (reportMarker) {                            // (1)
    reportMarkers.removeLayer(reportMarker);
  }
  const clickedPoint = turf.point([              // (2)
    evt.latlng.lng,
    evt.latlng.lat
  ]);
  reportMarker = L.marker([                      // (3)
    clickedPoint.geometry.coordinates[1],
    clickedPoint.geometry.coordinates[0],
  ]);
  reportMarker.addTo(reportMarkers);
  selectLocationContinueBtn.disabled = false;       // (4)
};

// enter details
const showDetailsStep = function () {
  console.log('Showing the details step of Registeration.');
  openRegisterForm();                                      // (1)
  hideAllRegisterSteps();
  reportMarker.addTo(reportMarkers);
  // dogMap.addLayer(reportMarker);                                   // (3)
  detailsStepEl.classList.remove('hidden');                     // (4)
};

// submit registration
const submitIssueReportFormData = function () {
  console.log('Submitting the issue data.');
  const dogLatLng = reportMarker.getLatLng();
  const dogData = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [dogLatLng.lng, dogLatLng.lat],
    },
    properties: {
      Name: dogRegisterName.value,
      Gender: dogRegisterGender.value,
      Availability: checkboxVals,
      DOB: dogRegisterDOB.value,
      Email: dogRegisterEmail.value,
    },
  };
  console.log(dogData);
  fetch(`${apiHost}/dogprofiles/`, {
    method: 'post',
    body: JSON.stringify(dogData),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(resp => resp.json())
    .then(data => {
      console.log('Received the following response:');
      console.log(data);
      dogFriendLayer.addData(data);  // (1)
    });
};

// function ensamble
const handleRegistarationBtnClick = function () {
  resetRegisterForm();
  showSelectPointStep();
};

const handleSelectPointContinueBtnClick = function () {
  showDetailsStep();
};

const handleSubmitBtnClick = function () {
  checkboxFunct();
  submitIssueReportFormData();
  resetRegisterForm();
  closeRegisterForm();
};

const handleCloseRegistarationtnClick = function () {
  const confirmation = confirm('You really want to cancel this registaration?');
  if (confirmation) {
    resetRegisterForm();
    closeRegisterForm();
  }
};

// eventlister
registerBtn.addEventListener('click', handleRegistarationBtnClick);
selectLocationContinueBtn.addEventListener('click', handleSelectPointContinueBtnClick);
submitBtn.addEventListener('click', handleSubmitBtnClick);

for (const btn of closeRegisterFormBtns) {
  btn.addEventListener('click', handleCloseRegistarationtnClick);
}
