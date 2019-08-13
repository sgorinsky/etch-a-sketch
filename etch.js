html = document.querySelector('html');

// title and button
titleContainer = document.createElement('div');
titleContainer.className += 'titleContainer';

title = document.createElement('h1');
title.className += 'title';
title.textContent = 'Etch-a-sketch!';

btn = document.createElement('button');
btn.textContent = 'reset!';

html.appendChild(titleContainer);
html.appendChild(title);
titleContainer.appendChild(btn);

// setting up etch-a-sketch container for boxes
container = document.createElement('div');
container.className += "container";
container.setAttribute("style", "border: 5px solid red;");
html.appendChild(container);


// pushing the boxes into the container, making them each 1% by 1% of the container's width and height
const divs = [];
const numBoxes = 100
for (var i = 0; i < numBoxes**2; ++i) {
	d = document.createElement('div');
  d.className += 'box';
  //div.textContent = 'div ' + (i+1);
  d.setAttribute("style", "float:left; height:1%; width:1%;");

  divs.push(d);
  container.appendChild(divs[i]);

}
