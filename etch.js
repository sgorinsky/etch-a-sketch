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
container.setAttribute("style", "position: absolute; top:65px; left:150px; height:900px; width:1100px; border: 7px solid red;");
html.appendChild(container);


// CALLBACK FUNCTIONS FOR SETTING UP ETCH-A-SKETCH CANVAS
// pushing the boxes into the container, making them each 1% by 1% of the container's width and height (10000 boxes in total)
var divs = [];
function createBoxes() {
	for (let i = 0; i < 10000; ++i) {

		divs[i] = document.createElement('div');
	  divs[i].className = 'box';
	  let attributes = "float:left; height:1%; width:1%;";
	  divs[i].setAttribute("style", attributes);
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

// fun little easter egg if someone updates the container to the defaults
var colored = []
function colorEventListeners() { //function for initializing event listeners
	// adding event listeners to each box element
	divs.forEach(div => div.addEventListener("mouseover", (e) => {

		if (mouseDown) {
			let r = Math.floor(Math.random() * 255);
			let g = Math.floor(Math.random() * 255);
			let b = Math.floor(Math.random() * 255);
			let color = "rgb("+ r + ", " + g + ", " + b + ")"
			e.target.style.backgroundColor = color;
			colored.push(e.target);

		}

	}));

}

// CLEARING ALL DIVS AND SKETCHES
function clearAll() {
	for (var i = 0; i < divs.length; ++i) {
		container.removeChild(container.firstChild);

	}
	divs = [];

}

const clearSketch = () => {
	for (let i = 0; i < sketches.length; ++i) {
		sketches[i].classList.remove("sketch");
		sketches.splice(i, 1); // removing sketches elements so it doesn't take up too much memory if someone sketches a lot
		--i;
	}
	sketches = [];

	if (colored.length > 0) {
		for (var i = 0; i < colored.length; ++i) {
			colored[i].style.backgroundColor = "white";
		}
	}
}

//initializing the sketch boxes in the canvas
createBoxes();
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
		width = Number(prompt('Width', 1080));
		height = Number(prompt('Height', 720)); // prompt returns a string so we need to numberify it

	}

	let atts = "position:absolute; top:65px; left:" + (700-width/2) + "px; height:" + (height+1) + "px; width:" + (width+1) + "px; border: 7px solid red;";
	clearAll();
	createBoxes();
	if (height === 720 && width === 1080) {

		alert("Good choice!");
		alert("We have a little surprise for you!");
		colorEventListeners();

	} else {
		container.setAttribute("style", atts);


		eventListeners();
	}

});

// revert back to default
normal.addEventListener("click", () => {
	container.setAttribute("style", "position: absolute; top:65px; left:150px; height:900px; width:1100px; border: 7px solid red;");

	clearAll();
	createBoxes();
	eventListeners();
});
