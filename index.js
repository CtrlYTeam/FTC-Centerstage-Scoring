

// Get the container and hexagon elements
const container = document.querySelector('.blue_backdrop');
const hexagon   = document.querySelector('.hexagon');

// Define the number of rows and columns
const numRows = 3; // Adjust the number of rows
const numCols = 3; // Adjust the number of columns

// Calculate the horizontal and vertical spacing between hexagons
const horizontalSpacing = hexagon.offsetWidth  * 0.75; // 75% of hexagon width
const verticalSpacing   = hexagon.offsetHeight * 0.5;  // 50% of hexagon height

let newHex = hexagon.cloneNode(true);
let x      = newHex.getBoundingClientRect().left + window.scrollX;
let y      = newHex.getBoundingClientRect().top + window.scrollY;

// Loop to create and position hexagons
for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {        
        // Calculate the position for the cloned hexagon
        console.log(y)
        y -= 5;

        // Apply the position to the cloned hexagon
        newHex.style.transform = `translate(${x}px, ${y}px)`;

        // Append the cloned hexagon to the container
        container.appendChild(newHex);

        // Clone the hexagon element
        newHex = hexagon.cloneNode(true);
    }
}
