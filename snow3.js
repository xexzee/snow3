// get canvas and context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// set up variables
var numberOfSnowflakes = 320;
var canvasHeight = 400;
var canvasWidth = 400;

// set the fill color to white
ctx.fillStyle = "#ffffff";

// snowflake constructor function
var Snowflake = function() {
	// generates a random scale value
  this.scale = (Math.random() * 1.25) + .25;
  
  // multiplies the given size by the scale
	this.size = 4 * this.scale;
  
  // sets xPos to a random number between -size and -canvasWidth
	this.xPos = ((canvasWidth + this.size) * Math.random()) - this.size;
  
  // sets yPos to a random number between -size and the right canvas edge
  this.yPos = -this.size - (canvasHeight * Math.random());
  
  // creates a filled rectangle at the xPos, Ypos, using the size
  this.draw = function(){
  	ctx.fillRect(this.xPos, this.yPos, this.size, this.size);
  };
  
  // the function that actually moves the snowflake
  this.fall = function(){
  	// increment yPos by the scale (moves the snowflake downwards)
    this.yPos += 1 * this.scale;
    
    // generates a random number, if that number is outside of a certain range,
    // move to the left or to the right
    this.randomNum = Math.random();
    if (this.randomNum > .988) {
    	this.xPos += 1 * this.scale / 2;
    }
    else if (this.randomNum < .012) {
    	this.xPos -= 1 * this.scale / 2;
    }
    
    // if the snowflake is past the bottom edge of the canvas, set
    // yPos to -size and xPos to a random number between -size and
    // the right edge of the canvas
    if (this.yPos > canvasHeight) {
    	this.yPos = -this.size;
      this.xPos = ((canvasWidth + this.size) * Math.random()) - this.size;
    }
    
    // create a filled rectangle at the new xPos and yPos
    ctx.fillRect(this.xPos, this.yPos, this.size, this.size);
    
    
  };
};

// create an empty array that will hold the snowflakes
var snowflakes = [];

// fills the array with snowflakes
for (i = 0; i < numberOfSnowflakes; i++) {
	snowflakes[i] = new Snowflake();
}

// draws the snowflakes, this is totally unnecessary
// but whatever
for (i = 0; i < numberOfSnowflakes; i++) {
	snowflakes[i].draw();
}

// set an interval for the nextFrame function
var timer = window.setInterval(function(){ nextFrame() }, 50);

// clears the screen, then calls snowflakes[i].fall for each
// snowflake in the snowflakes array, which redraws the snowflake
// at it's new position
function nextFrame() {
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	for (var i = 0; i < numberOfSnowflakes; i++) {
		snowflakes[i].fall();
	}
}
