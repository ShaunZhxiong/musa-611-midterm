/* Animation Title*/
let canvas = document.querySelector('.the-canvas');
let context = canvas.getContext('2d');
let ratio = window.devicePixelRatio || 1;

let totalLineHeight = 1200;
let totalLines = 3;
let totalDiff = totalLineHeight / totalLines;
let fontHeight = 60 * ratio - 50; // Small centering

let smallestWidth = 280; // width of smallest line;
let offsetX = 15;
let offsetY = 1;
var iterations;
var verticalAlign, line1Diff, line2Diff, line3Diff, line4Diff, iterations, iteration, animationFrame;

let startRGB = [255, 186, 73];
let endRGB = [194, 205, 215];
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
  context.strokeStyle = "#EF6190";
  context.lineWidth = "5";
  context.textBaseline = "middle";
  // Centering of the text
  verticalAlign = (window.innerHeight / 2 * ratio) - totalLineHeight / 2;
  line2Diff = totalLineHeight + fontHeight - totalDiff * 1;
  line3Diff = totalLineHeight + fontHeight - totalDiff * 2;
  line4Diff = totalLineHeight + fontHeight - totalDiff * 3;
  // How many iterations will we go through?
  iterations = 10;
  prepareColorSets(iterations);
  iteration = 0;
  animationFrame = requestAnimationFrame(draw);
}

// Draw loop
function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = iterations - 1; i > 0; i--) {
    context.fillStyle = 'rgb(' + fullColorSet[i][0] + ',' + fullColorSet[i][1] + ',' + fullColorSet[i][2] + ')';
    let x = window.innerWidth / 2 * ratio - i * offsetX;
    let y = verticalAlign + i * offsetY + (Math.sin(i + iteration) * 2);
    drawText(x, y);
  }
  iteration += 1;
  animationFrame = requestAnimationFrame(draw);
}

// Draw the single lines of text.
function drawText(x, y) {
  context.fillText("DDDogs", x, y + line4Diff);
  context.strokeText("DDDogs", x, y + line4Diff);
  context.fillText("in", x, y + line3Diff);
  context.strokeText("in", x, y + line3Diff);
  context.fillText("New York City", x, y + line2Diff);
  context.strokeText("New York City", x, y + line2Diff);
}

// We do this so we don't have to calculate these EVERY loop.
function prepareColorSets(iterations) {
  fullColorSet = [];
  for (var i = 0; i < iterations; i++) {
    fullColorSet.push(colourGradientor(1 - i / iterations, startRGB, endRGB));
  }
}

// THNX - http://stackoverflow.com/questions/14482226/how-can-i-get-the-color-halfway-between-two-colors
function colourGradientor(p, rgb_beginning, rgb_end) {

  var w = p * 2 - 1;
  var w1 = (w + 1) / 2.0;
  var w2 = 1 - w1;
  var rgb = [parseInt(rgb_beginning[0] * w1 + rgb_end[0] * w2),
  parseInt(rgb_beginning[1] * w1 + rgb_end[1] * w2),
  parseInt(rgb_beginning[2] * w1 + rgb_end[2] * w2)];
  return rgb;
};


window.onresize = init;
