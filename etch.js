//CREATING DOM ELEMENTS
html = document.querySelector('html');

// title and button
title = document.createElement('h1');
title.className += 'title';
title.textContent = 'Etch-a-sketch!';
html.appendChild(title);

reset = document.createElement('button');
reset.className += 'reset';
reset.textContent = 'reset!';
html.appendChild(reset);

grid = document.createElement('button');
grid.className += 'grid';
grid.textContent = 'new grid?';
html.appendChild(grid);

normal = document.createElement('button');
normal.textContent = 'default';
normal.className += 'normal';
html.appendChild(normal);


// setting up etch-a-sketch container for boxes
container = document.createElement('div');
container.className += "container";
container.setAttribute("style", "position: absolute; top:65px; left:200px; height:1000px; width:1000px; border: 5px solid red;");
html.appendChild(container);


// CALLBACK FUNCTIONS FOR SETTING UP ETCH-A-SKETCH CANVAS
// pushing the boxes into the container, making them each 1% by 1% of the container's width and height
var divs = [];
function createBoxes(h, w) {
	for (let i = 0; i < (h * w); ++i) {

		d = document.createElement('div');
	  d.className += 'box';
	  let attributes = "float:left; height:" + (100/h) + "%; width:" + (100/w) + "%;";
	  d.setAttribute("style", attributes);
	  divs.push(d);
	  container.appendChild(divs[i]);

	}

}

// ATTACHING EVENT LISTENERS TO EVERY LITTLE DIV OF THE CANVAS
var sketches = []; // this array keeps track of the sketched boxes specifically
function eventListeners() { //function for initializing event listeners
	// adding event listeners to each box element
	divs.forEach(div => div.addEventListener("mouseover", (e) => {

		if (mouseDown) {
			e.target.classList.add("sketch");
			sketches.push(e.target);
		}

	}));


	divs.forEach(div => div.addEventListener("click", (e) => {

		e.target.classList.add("sketch");
		sketches.push(e.target);

	}));
}

const clearSketch = () => {
	for (let i = 0; i < sketches.length; ++i) {
		sketches[i].classList.remove("sketch");
		sketches.splice(i, 1); // removing sketches elements so it doesn't take up too much memory if someone sketches a lot
		--i;
	}
}

//initializing the sketch boxes in the canvas
createBoxes(100, 100);
eventListeners();

// checking if the mouse is down in the titleContainer
var mouseDown = 0;
container.onmousedown = function() {
  ++mouseDown;
}

container.onmouseup = function() {
  mouseDown=0;
}


// ADDING EVENT LISTENERS TO BUTTONS
// remove sketch class from boxes to revert sketch on click
reset.addEventListener("click", clearSketch);

grid.addEventListener("click", () => {
	alert('Enter positive numbers to determine dimensions of new sketch in pixels.');
	var height = '';
	var width = '';

	while ( isNaN(height) || isNaN(width) || height <= 0 || width <= 0 ) { // must be a positive number
		height = Number(prompt('Height')); // prompt returns a string so we need to numberify it
		width = Number(prompt('Width'));
	}

	let atts = "position:absolute; top:65px; left:" + (640-width/2) + "px; height:" + (height+1) + "px; width:" + (width+1) + "px; border: 5px solid red;";
	container.setAttribute("style", atts);

	clearSketch(); // we have to place this before we clear divs because the divs with the sketch class added are still in memory if we don't
	divs = []; // empty divs
	createBoxes(100, 100);
	eventListeners();

});

// revert back to default
normal.addEventListener("click", () => {
	container.setAttribute("style", "position: absolute; top:65px; left:200px; height:1000px; width:1000px; border: 5px solid red;");

	clearSketch();
	divs = [];
	createBoxes(100, 100);
	eventListeners();
});
