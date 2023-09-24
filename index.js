

// // Get the container and hexagon elements
// const container = document.querySelector('.blue_backdrop');
// const hexagon   = document.querySelector('.hexagon');

// // Define the number of rows and columns
// const numRows = 3; // Adjust the number of rows
// const numCols = 3; // Adjust the number of columns

// // Calculate the horizontal and vertical spacing between hexagons
// const horizontalSpacing = hexagon.offsetWidth  * 0.75; // 75% of hexagon width
// const verticalSpacing   = hexagon.offsetHeight * 0.5;  // 50% of hexagon height

// let newHex = hexagon.cloneNode(true);
// let x      = newHex.getBoundingClientRect().left + window.scrollX;
// let y      = newHex.getBoundingClientRect().top + window.scrollY;

// // Loop to create and position hexagons
// for (let row = 0; row < numRows; row++) {
//     for (let col = 0; col < numCols; col++) {        
//         // Calculate the position for the cloned hexagon
//         console.log(y)
//         y -= 5;

//         // Apply the position to the cloned hexagon
//         newHex.style.transform = `translate(${x}px, ${y}px)`;

//         // Append the cloned hexagon to the container
//         container.appendChild(newHex);

//         // Clone the hexagon element
//         newHex = hexagon.cloneNode(true);
//     }
// }

const teamOne = [0,0,0,0,0,0,0]


function teamOnePoints () {
}

function backstagePixelsChange (change) {
  let backstagePixels = document.getElementById("teamOneBackstagePixelsNumber")
  if(change < 0 && backstagePixels.value == 0){}else{
    teamOne[1] = Number(backstagePixels.value)
    teamOne[1] += change
    backstagePixels.value = teamOne[2]
  }
}

let backstagePixelsPlus = document.getElementById("teamOneBackstagePixelsPlus")
let backstagePixelsMinus = document.getElementById("teamOneBackstagePixelsMinus")
backstagePixels.addEventListener('input', function () {
  backstagePixelsChange(0)
}); 
backstagePixelsPlus.addEventListener("click", function() {
  backstagePixelsChange(1)
});
backstagePixelsMinus.addEventListener("click", function() {
  backstagePixelsChange(-1)
});