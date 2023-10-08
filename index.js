createHexDivision("hex_container_blue", "hex_row_blue", "hexagon_blue")
createHexDivision("hex_container_red", "hex_row_red", "hexagon_red")

//Hexagon code
function formatText(array) {
  let finalString = ""
  let currentIndex = 0
  for(let i = 1; i <= 11; i++) {
      for(let j = 1; j <= 7 - (i%2); j++) {
          let currentItem = array[currentIndex]
          let formattedCurrentItem = '<span style="color:'+ currentItem + ';">'+ currentItem +'</span> '
          finalString += formattedCurrentItem
          currentIndex++
      }
      finalString += "<br>"
  }
  //console.log(finalString)
  return finalString
}
const blueHexagons = document.querySelectorAll(".hexagon_blue")
const redHexagons  = document.querySelectorAll(".hexagon_red")
const blueColorStates = new Array(71)
const redColorStates  = new Array(71)
for(let i = 0; i < 71; i++) {
 blueColorStates[i] = "black"
 redColorStates[i]  = "black"
}

changeColor("red", redColorStates)
changeColor("blue", blueColorStates)

function changeColor(hexColor, colorStates) 
{
  let hexagons = (hexColor == "red")? redHexagons : blueHexagons;
  hexagons.forEach((hex, index) => {
    let currentColorIndex = 0
    hex.addEventListener("click", () => {
      hex.classList.remove("black", "white", "green", "purple", "yellow")
        currentColorIndex = (currentColorIndex + 1) % 5
        switch(currentColorIndex)
        {
          case 0:
            hex.classList.add("black")
            colorStates[index] = "black"
            break
          case 1:
            hex.classList.add("white")
            colorStates[index] = "white"
            break
          case 2:
            hex.classList.add("green")
            colorStates[index] = "green"
            break
          case 3:
            hex.classList.add("purple")
            colorStates[index] = "purple"
            break
          case 4:
            hex.classList.add("yellow")
            colorStates[index] = "yellow"
            break
        }
        //Update points here
        let filteredColorStates = colorStates.filter(color => color !== "black");
        if(hexColor == "red") {
          redAlliance[0] = filteredColorStates.length;
        } else {
          blueAlliance[0] = filteredColorStates.length;
        }
        updatePoints(hexColor);
        document.getElementsByClassName("redColorStateHeader")[0].innerHTML  = formatText(redColorStates); 
        document.getElementsByClassName("blueColorStateHeader")[0].innerHTML = formatText(blueColorStates);
    })
  })
}

//dropdown panel
let buttonDropdown = document.getElementById("buttonDropdown")
let dropdownPanel = document.getElementById("dropdownPanel")
let dropdownImg = document.getElementById("infoPanelImg")

buttonDropdown.addEventListener("click", () => {
  if (dropdownPanel.classList.contains("dropdown_panel")) {
    dropdownPanel.classList.remove("dropdown_panel")
    dropdownPanel.classList.add("panel_opened")
    dropdownImg.classList.remove("info_panel_img")
    dropdownImg.classList.add("info_panel_img_opened")
  } 
  else {
    dropdownPanel.classList.remove("panel_opened")
    dropdownPanel.classList.add("dropdown_panel")
    dropdownImg.classList.remove("info_panel_img_opened")
    dropdownImg.classList.add("info_panel_img")
  }
})

function createHexDivision(containerColor, hexRowColor, hexColor)
{
  const container = document.getElementsByClassName(containerColor)
  for(let i=0; i < 11; i++)
  {
    const hexRow = document.createElement("div")
    hexRow.classList.add(hexRowColor)
    hexRow.setAttribute("id", hexRowColor+i)
    container[0].appendChild(hexRow)
    for(let j=0; j < (!(i%2)?6:7); j++)
    {
      const hex = document.createElement("div")
      hex.classList.add(hexColor)
      hex.setAttribute("id", hexColor+i+j)
      hexRow.appendChild(hex)
    }
  }
}

function scoreMosaics(containerColor, hexRowColor, hexColor) 
{
  const container = document.getElementsByClassName(containerColor)[0]
  const hexRow    = document.getElementsByClassName(hexRowColor)
  const hex       = document.getElementsByClassName(hexColor)
  for(let i=10; i >= 0; i--)
  {
    for(let j=(!(i%2)?6:7); j >= 0; j--)
    {
      
    }
  }
}

//cookies for dropdown
let userData = parseCookie()

if(userData == undefined){
  newCookie()
  userData = parseCookie()
}

function newCookie(){
  userData = {
    timerCheck: 0,
    proCheck: 0,
    tooltipsCheck: 1,
  }
  let jsonData = JSON.stringify(userData);
  document.cookie = `userData=${encodeURIComponent(jsonData)}; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/`
}

function updateCookie(){
  let jsonData = JSON.stringify(userData);
  document.cookie = `userData=${encodeURIComponent(jsonData)}; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/`
}

function parseCookie(){
  let cookies = document.cookie
  let cookieData = cookies
    .split("; ")
    .find((cookie) => cookie.startsWith("userData="))

  if (cookieData) {
    let jsonData = decodeURIComponent(cookieData.split("=")[1])
    let userData = JSON.parse(jsonData)
    return(userData)
  }
}

//player name update
let teamNames = [
  document.getElementById("playerOne"),
  document.getElementById("playerTwo"),
  document.getElementById("playerThree"),
  document.getElementById("playerFour")
]
 let teamNameHeader = [
  document.getElementById("playerOneHeader"),
  document.getElementById("playerTwoHeader"),
  document.getElementById("playerThreeHeader"),
  document.getElementById("playerFourHeader")
 ]

for(let i = 0; i<4; i++){
  teamNames[i].addEventListener("input", ()=> {
    teamNameHeader[i].innerHTML=(teamNames[i].value)
  })
}

//toggle buttons
let toggleButtons = [
  document.getElementById("timerToggleButton"),
  document.getElementById("proToggleButton"),
  document.getElementById("tooltipsToggleButton")
]

var jsonItems = ["timerCheck", "proCheck", "tooltipsCheck"]

initializeButtonAppearances()

function initializeButtonAppearances() {
  for (let i = 0; i < toggleButtons.length; i++) {
    toggleButtons[i].style.backgroundColor = userData[jsonItems[i]] === 1? "red": "white"
  }
}

for (let i = 0; i < toggleButtons.length; i++) {
  toggleButtons[i].addEventListener("click", () => {
    userData[jsonItems[i]] = userData[jsonItems[i]] === 1 ? 0 : 1
    if (userData[jsonItems[i]] === 1) {
      toggleButtons[i].style.backgroundColor = "red"
    } else {
      toggleButtons[i].style.backgroundColor = "white"
    }
    updateCookie()
  });
}

const redAlliance = [
  0,//(0) pixels on backboard
  0,//(1) mozaiacs
  0,//(2) pixel in backstage done
  //player one left player 2 right
  [0,0],//(3) player prop    done
  [0,0],//(4) auto spike
  [0,0],//(5) auto pixel
  [0,0],//(6) auto park
  [0,0],//(7) suspension     done
  [0,0],//(8) park           done
  [0,0],//(9) drone          done
  0,//(10) minor penalties   done
  0,//(11) major penalties    done
  0 //(12) set lines crossed
]
const blueAlliance = [
  0,//(0) pixels on backboard
  0,//(1) mozaiacs
  0,//(2) pixel in backstage done
  //player one left player 2 right
  [0,0],//(3) player prop    done
  [0,0],//(4) auto spike    
  [0,0],//(5) auto pixel
  [0,0],//(6) auto park
  [0,0],//(7) suspension     done
  [0,0],//(8) park           done
  [0,0],//(9) drone          done
  0,//(10) minor penalties   done
  0,//(11) major penalties    done
  0 //(12) set lines crossed
]

//Function to calculate points
function updatePoints(color) {
  let alliance = [];
  alliance = (color == "red")? redAlliance: blueAlliance
  //Auto
  let parkPts = (alliance[6][0]*5)+(alliance[6][1]*5);
  let spikePts = (alliance[4][0] * (alliance[3][0]+1)*10) + (alliance[4][1] * (alliance[3][1]+1)*10);
  let autoPixelPts = (alliance[5][0] * (alliance[3][0]+1)*10) + (alliance[5][1] * (alliance[3][1]+1)*10);
  //Driver control period
  let pixelPts = (alliance[0] * 3) + (alliance[1] * 10) + (alliance[2]) + (alliance[12]*10);
  //Endgame
  let endgamePts = (alliance[8][0]*5) + (alliance[8][1]*5) + (alliance[7][0]*20) + (alliance[7][1]*20);
  let dronePts = ((alliance[9][0] == 0 ? 0 : 30 - (alliance[9][0]-1)*10)) + ((alliance[9][1] == 0 ? 0 : 30 - (alliance[9][1]-1)*10));

  //Penalties
  let penaltyPts = 0;
  if(color == "red") {
    penaltyPts = (blueAlliance[10] * 10) + (blueAlliance[11]*30);
    let total = parkPts + spikePts + autoPixelPts + pixelPts + endgamePts + dronePts + penaltyPts;
    scoreElements[0].innerHTML = total;

  } else {
    penaltyPts = (redAlliance[10] * 10) + (redAlliance[11]*30);
    let total = parkPts + spikePts + autoPixelPts + pixelPts + endgamePts + dronePts + penaltyPts;
    scoreElements[1].innerHTML = total;
  }
}

let scoreElements = [
  document.getElementById("redAllianceScore"),
  document.getElementById("blueAllianceScore")
]

function redAlliancePointsCalc () {
  
}

/**
 *  Team 1
 */
let redAlliancebackstagePixels = [
  document.getElementById("redAllianceBackstagePixelsNumber"),
  document.getElementById("redAllianceBackstagePixelsPlus"),
  document.getElementById("redAllianceBackstagePixelsMinus")
]

let redAllianceMinorPenalties = [
  document.getElementById("redAllianceMinorPenaltiesPixelsNumber"),
  document.getElementById("redAllianceMinorPenaltiesPixelsPlus"),
  document.getElementById("redAllianceMinorPenaltiesPixelsMinus")
]

let redAllianceMajorPenalties = [
  document.getElementById("redAllianceMajorPenaltiesPixelsNumber"),
  document.getElementById("redAllianceMajorPenaltiesPixelsPlus"),
  document.getElementById("redAllianceMajorPenaltiesPixelsMinus")
]

/**
 * Team 2
 */
let blueAlliancebackstagePixels = [
  document.getElementById("blueAllianceBackstagePixelsNumber"),
  document.getElementById("blueAllianceBackstagePixelsPlus"),
  document.getElementById("blueAllianceBackstagePixelsMinus")
]

let blueAllianceMinorPenalties = [
  document.getElementById("blueAllianceMinorPenaltiesPixelsNumber"),
  document.getElementById("blueAllianceMinorPenaltiesPixelsPlus"),
  document.getElementById("blueAllianceMinorPenaltiesPixelsMinus")
]

let blueAllianceMajorPenalties = [
  document.getElementById("blueAllianceMajorPenaltiesPixelsNumber"),
  document.getElementById("blueAllianceMajorPenaltiesPixelsPlus"),
  document.getElementById("blueAllianceMajorPenaltiesPixelsMinus")
]

let redAlliancePoints  = [redAlliancebackstagePixels, redAllianceMinorPenalties, redAllianceMajorPenalties]
let blueAlliancePoints = [blueAlliancebackstagePixels, blueAllianceMinorPenalties, blueAllianceMajorPenalties]

function penaltyScoreUpdate(change, team, teamPoints, arrayPos, pointType) {
  if(change > 0 || teamPoints[pointType][0].value != 0) 
  {
    team[arrayPos] = Number(teamPoints[pointType][0].value)
    team[arrayPos] += change
    teamPoints[pointType][0].value = team[arrayPos]

    if (teamPoints[pointType][0].value.length > 4)
      teamPoints[pointType][0].value = teamPoints[pointType][0].value.slice(0, 4)
  }
  updatePoints("blue")
  updatePoints("red")
}

const teamIndices = [2, 10, 11]

/**
 *  Change team 1 data
 */
for(let i=0; i < redAlliancePoints.length; i++) 
{
  redAlliancePoints[i][0].addEventListener('input', () => {
    penaltyScoreUpdate(0, redAlliance, redAlliancePoints, teamIndices[i], i)
  })
  
  redAlliancePoints[i][1].addEventListener("click", () => {
    penaltyScoreUpdate(1, redAlliance, redAlliancePoints, teamIndices[i], i)
  })
  
  redAlliancePoints[i][2].addEventListener("click", () => {
    penaltyScoreUpdate(-1, redAlliance, redAlliancePoints, teamIndices[i], i)
  })
}

/**
 *  Change team 2 data
 */
for(let i=0; i < blueAlliancePoints.length; i++) 
{
  blueAlliancePoints[i][0].addEventListener('input', () => {
    penaltyScoreUpdate(0, blueAlliance, blueAlliancePoints, teamIndices[i], i)
  })
  
  blueAlliancePoints[i][1].addEventListener("click", () => {
    penaltyScoreUpdate(1, blueAlliance, blueAlliancePoints, teamIndices[i], i)
  })
  
  blueAlliancePoints[i][2].addEventListener("click", () => {
    penaltyScoreUpdate(-1, blueAlliance, blueAlliancePoints, teamIndices[i], i)
  })
}

//player One Team One

let playerOneDroneZone = [
  document.getElementById("playerOneDroneZoneNone"),
  document.getElementById("playerOneDroneZoneOne"),
  document.getElementById("playerOneDroneZoneTwo"),
  document.getElementById("playerOneDroneZoneThree")
]

function playerOneDroneZoneChange(change){
  redAlliance[9][0] = change
  for(let i = 0; i < 4; i++){
    playerOneDroneZone[i].style.backgroundColor = "aliceblue"
  }
  playerOneDroneZone[change].style.backgroundColor = "red"
}

playerOneDroneZone[0].addEventListener("click", () => {
  playerOneDroneZoneChange(0);
  updatePoints("red");
})

playerOneDroneZone[1].addEventListener("click", () => {
  playerOneDroneZoneChange(1);
  updatePoints("red");
})

playerOneDroneZone[2].addEventListener("click", () => {
  playerOneDroneZoneChange(2);
  updatePoints("red");
})

playerOneDroneZone[3].addEventListener("click", () => {
  playerOneDroneZoneChange(3);
  updatePoints("red");
})

playerOneProp = [
  document.getElementById("playerOnePropNo"),
  document.getElementById("playerOnePropYes")
]

function playerOnePropChange(change) {
  redAlliance[3][0] = change
  playerOneProp[0].style.backgroundColor = "aliceblue"
  playerOneProp[1].style.backgroundColor = "aliceblue"
  playerOneProp[change].style.backgroundColor = "red"
}
playerOneProp[0].addEventListener("click", () => {
  playerOnePropChange(0);
  updatePoints("red");
})
playerOneProp[1].addEventListener("click", () => {
  playerOnePropChange(1);
  updatePoints("red");
})

let playerOneEndgamePark = [
  document.getElementById("playerOneParkNone"),
  document.getElementById("playerOneParkPark"),
  document.getElementById("playerOneParkSuspend")
]

function playerOneEndgameParkChange(change){  
  switch(change) {
    case 1:
      redAlliance[8][0] = 1
      redAlliance[7][0] = 0
      break;
    case 2:
      redAlliance[7][0] = 1
      redAlliance[8][0] = 0
      break;
    default:
      redAlliance[7][0] = 0
      redAlliance[8][0] = 0
  }
  for(let i = 0; i < 3 ;i++){
    playerOneEndgamePark[i].style.backgroundColor = "aliceblue"
  }
  playerOneEndgamePark[change].style.backgroundColor = "red"
}

playerOneEndgamePark[0].addEventListener("click", () => {
  playerOneEndgameParkChange(0);
  updatePoints("red");
})

playerOneEndgamePark[1].addEventListener("click", () => {
  playerOneEndgameParkChange(1);
  updatePoints("red");
})

playerOneEndgamePark[2].addEventListener("click", () => {
  playerOneEndgameParkChange(2);
  updatePoints("red");
})

let playerOneAutoSpike = [
  document.getElementById("playerOneAutoSpikeNo"),
  document.getElementById("playerOneAutoSpikeYes")
]

function playerOneAutoSpikeChange(change){
  redAlliance[4][0] = change
  for(let i = 0; i < 2 ;i++){
    playerOneAutoSpike[i].style.backgroundColor = "aliceblue"
  }
  playerOneAutoSpike[change].style.backgroundColor = "red"
}

playerOneAutoSpike[0].addEventListener("click", () => {
  playerOneAutoSpikeChange(0);
  updatePoints("red");
})

playerOneAutoSpike[1].addEventListener("click", () => {
  playerOneAutoSpikeChange(1);
  updatePoints("red");
})

let playerOneAutoPixel = [
  document.getElementById("playerOneAutoPixelNo"),
  document.getElementById("playerOneAutoPixelYes")
]

function playerOneAutoPixelChange(change){
redAlliance[5][0] = change
for(let i = 0; i < 2 ;i++){
playerOneAutoPixel[i].style.backgroundColor = "aliceblue"
}
playerOneAutoPixel[change].style.backgroundColor = "red"
}

playerOneAutoPixel[0].addEventListener("click", () => {
  playerOneAutoPixelChange(0);
  updatePoints("red");
})

playerOneAutoPixel[1].addEventListener("click", () => {
  playerOneAutoPixelChange(1);
  updatePoints("red");
})

let playerOneAutoPark = [
  document.getElementById("playerOneAutoParkNo"),
  document.getElementById("playerOneAutoParkYes")
]

function playerOneAutoParkChange(change){
  redAlliance[6][0] = change
  for(let i = 0; i < 2; i++){
    playerOneAutoPark[i].style.backgroundColor = "aliceblue"
  }
  playerOneAutoPark[change].style.backgroundColor = "red"
}

playerOneAutoPark[0].addEventListener("click", () => {
  playerOneAutoParkChange(0);
  updatePoints("red");
})

playerOneAutoPark[1].addEventListener("click", () => {
  playerOneAutoParkChange(1);
  updatePoints("red");
})

//player Two Team One

let playerTwoDroneZone = [
  document.getElementById("playerTwoDroneZoneNone"),
  document.getElementById("playerTwoDroneZoneOne"),
  document.getElementById("playerTwoDroneZoneTwo"),
  document.getElementById("playerTwoDroneZoneThree")
]

function playerTwoDroneZoneChange(change){
  redAlliance[9][1] = change
  for(let i = 0; i < 4 ;i++){
    playerTwoDroneZone[i].style.backgroundColor = "aliceblue"
  }
  playerTwoDroneZone[change].style.backgroundColor = "red"
}

playerTwoDroneZone[0].addEventListener("click", () => {
  playerTwoDroneZoneChange(0);
  updatePoints("red");
})

playerTwoDroneZone[1].addEventListener("click", () => {
  playerTwoDroneZoneChange(1);
  updatePoints("red");
})

playerTwoDroneZone[2].addEventListener("click", () => {
  playerTwoDroneZoneChange(2);
  updatePoints("red");
})

playerTwoDroneZone[3].addEventListener("click", () => {
  playerTwoDroneZoneChange(3);
  updatePoints("red");
})

let playerTwoProp = [
  document.getElementById("playerTwoPropNo"),
  document.getElementById("playerTwoPropYes")
]

function playerTwoPropChange(change) {
  redAlliance[3][1] = change
  playerTwoProp[0].style.backgroundColor = "aliceblue"
  playerTwoProp[1].style.backgroundColor = "aliceblue"
  playerTwoProp[change].style.backgroundColor = "red"
}
playerTwoProp[0].addEventListener("click", () => {
  playerTwoPropChange(0);
  updatePoints("red");
})
playerTwoProp[1].addEventListener("click", () => {
  playerTwoPropChange(1);
  updatePoints("red");
})

let playerTwoEndgamePark = [
  document.getElementById("playerTwoParkNone"),
  document.getElementById("playerTwoParkPark"),
  document.getElementById("playerTwoParkSuspend")
]

function playerTwoEndgameParkChange(change){  
  switch(change) {
    case 1:
      redAlliance[8][1] = 1
      redAlliance[7][1] = 0
      break;
    case 2:
      redAlliance[7][1] = 1
      redAlliance[8][1] = 0
      break;
    default:
      redAlliance[7][1] = 0
      redAlliance[8][1] = 0
  }
  for(let i = 0; i < 3 ;i++){
    playerTwoEndgamePark[i].style.backgroundColor = "aliceblue"
  }
  playerTwoEndgamePark[change].style.backgroundColor = "red"
}

playerTwoEndgamePark[0].addEventListener("click", () => {
  playerTwoEndgameParkChange(0);
  updatePoints("red");
})

playerTwoEndgamePark[1].addEventListener("click", () => {
  playerTwoEndgameParkChange(1);
  updatePoints("red");
})

playerTwoEndgamePark[2].addEventListener("click", () => {
  playerTwoEndgameParkChange(2);
  updatePoints("red");
})

let playerTwoAutoSpike = [
  document.getElementById("playerTwoAutoSpikeNo"),
  document.getElementById("playerTwoAutoSpikeYes")
]

function playerTwoAutoSpikeChange(change){
  redAlliance[4][1] = change
  for(let i = 0; i < 2 ;i++){
    playerTwoAutoSpike[i].style.backgroundColor = "aliceblue"
  }
  playerTwoAutoSpike[change].style.backgroundColor = "red"
}

playerTwoAutoSpike[0].addEventListener("click", () => {
  playerTwoAutoSpikeChange(0);
  updatePoints("red");
})

playerTwoAutoSpike[1].addEventListener("click", () => {
  playerTwoAutoSpikeChange(1);
  updatePoints("red");
})

let playerTwoAutoPixel = [
  document.getElementById("playerTwoAutoPixelNo"),
  document.getElementById("playerTwoAutoPixelYes")
]

function playerTwoAutoPixelChange(change){
redAlliance[5][1] = change
for(let i = 0; i < 2 ;i++){
playerTwoAutoPixel[i].style.backgroundColor = "aliceblue"
}
playerTwoAutoPixel[change].style.backgroundColor = "red"
}

playerTwoAutoPixel[0].addEventListener("click", () => {
  playerTwoAutoPixelChange(0);
  updatePoints("red");
})

playerTwoAutoPixel[1].addEventListener("click", () => {
  playerTwoAutoPixelChange(1);
  updatePoints("red");
})

let playerTwoAutoPark = [
  document.getElementById("playerTwoAutoParkNo"),
  document.getElementById("playerTwoAutoParkYes")
]

function playerTwoAutoParkChange(change){
redAlliance[6][1] = change
for(let i = 0; i < 2 ;i++){
playerTwoAutoPark[i].style.backgroundColor = "aliceblue"
}
playerTwoAutoPark[change].style.backgroundColor = "red"
}

playerTwoAutoPark[0].addEventListener("click", () => {
  playerTwoAutoParkChange(0);
  updatePoints("red");
})

playerTwoAutoPark[1].addEventListener("click", () => {
  playerTwoAutoParkChange(1);
  updatePoints("red");
})

//player Three Team Two

let playerThreeDroneZone = [
  document.getElementById("playerThreeDroneZoneNone"),
  document.getElementById("playerThreeDroneZoneOne"),
  document.getElementById("playerThreeDroneZoneTwo"),
  document.getElementById("playerThreeDroneZoneThree")
]

function playerThreeDroneZoneChange(change){
  blueAlliance[9][0] = change
  for(let i = 0; i < 4 ;i++){
    playerThreeDroneZone[i].style.backgroundColor = "aliceblue"
  }
  playerThreeDroneZone[change].style.backgroundColor = "red"
}

playerThreeDroneZone[0].addEventListener("click", () => {
  playerThreeDroneZoneChange(0);
  updatePoints("blue");
})

playerThreeDroneZone[1].addEventListener("click", () => {
  playerThreeDroneZoneChange(1);
  updatePoints("blue");
})

playerThreeDroneZone[2].addEventListener("click", () => {
  playerThreeDroneZoneChange(2);
  updatePoints("blue");
})

playerThreeDroneZone[3].addEventListener("click", () => {
  playerThreeDroneZoneChange(3);
  updatePoints("blue");
})

let playerThreeProp = [
  document.getElementById("playerThreePropNo"),
  document.getElementById("playerThreePropYes")
]

function playerThreePropChange(change) {
  blueAlliance[3][0] = change
  playerThreeProp[0].style.backgroundColor = "aliceblue"
  playerThreeProp[1].style.backgroundColor = "aliceblue"
  playerThreeProp[change].style.backgroundColor = "red"
}
playerThreeProp[0].addEventListener("click", () => {
  playerThreePropChange(0);
  updatePoints("blue");
})
playerThreeProp[1].addEventListener("click", () => {
  playerThreePropChange(1);
  updatePoints("blue");
})

let playerThreeEndgamePark = [
  document.getElementById("playerThreeParkNone"),
  document.getElementById("playerThreeParkPark"),
  document.getElementById("playerThreeParkSuspend")
]

function playerThreeEndgameParkChange(change){  
  switch(change) {
    case 1:
      blueAlliance[8][0] = 1
      blueAlliance[7][0] = 0
      break;
    case 2:
      blueAlliance[7][0] = 1
      blueAlliance[8][0] = 0
      break;
    default:
      blueAlliance[7][0] = 0
      blueAlliance[8][0] = 0
  }
  for(let i = 0; i < 3 ;i++){
    playerThreeEndgamePark[i].style.backgroundColor = "aliceblue"
  }
  playerThreeEndgamePark[change].style.backgroundColor = "red"
}

playerThreeEndgamePark[0].addEventListener("click", () => {
  playerThreeEndgameParkChange(0);
  updatePoints("blue");
})

playerThreeEndgamePark[1].addEventListener("click", () => {
  playerThreeEndgameParkChange(1);
  updatePoints("blue");
})

playerThreeEndgamePark[2].addEventListener("click", () => {
  playerThreeEndgameParkChange(2);
  updatePoints("blue");
})

let playerThreeAutoSpike = [
  document.getElementById("playerThreeAutoSpikeNo"),
  document.getElementById("playerThreeAutoSpikeYes")
]

function playerThreeAutoSpikeChange(change){
  blueAlliance[4][0] = change
  for(let i = 0; i < 2 ;i++){
    playerThreeAutoSpike[i].style.backgroundColor = "aliceblue"
  }
  playerThreeAutoSpike[change].style.backgroundColor = "red"
}

playerThreeAutoSpike[0].addEventListener("click", () => {
  playerThreeAutoSpikeChange(0)
  updatePoints("blue");
})

playerThreeAutoSpike[1].addEventListener("click", () => {
  playerThreeAutoSpikeChange(1);
  updatePoints("blue");
})

let playerThreeAutoPixel = [
  document.getElementById("playerThreeAutoPixelNo"),
  document.getElementById("playerThreeAutoPixelYes")
]

function playerThreeAutoPixelChange(change){
  blueAlliance[5][0] = change
  for(let i = 0; i < 2 ;i++){
    playerThreeAutoPixel[i].style.backgroundColor = "aliceblue"
  }
  playerThreeAutoPixel[change].style.backgroundColor = "red"
}

playerThreeAutoPixel[0].addEventListener("click", () => {
  playerThreeAutoPixelChange(0);
  updatePoints("blue");
})

playerThreeAutoPixel[1].addEventListener("click", () => {
  playerThreeAutoPixelChange(1);
  updatePoints("blue");
})

let playerThreeAutoPark = [
  document.getElementById("playerThreeAutoParkNo"),
  document.getElementById("playerThreeAutoParkYes")
]

function playerThreeAutoParkChange(change){
  blueAlliance[6][0] = change
  for(let i = 0; i < 2 ;i++){
    playerThreeAutoPark[i].style.backgroundColor = "aliceblue"
  }
  playerThreeAutoPark[change].style.backgroundColor = "red"
}

playerThreeAutoPark[0].addEventListener("click", () => {
  playerThreeAutoParkChange(0);
  updatePoints("blue");
})

playerThreeAutoPark[1].addEventListener("click", () => {
  playerThreeAutoParkChange(1);
  updatePoints("blue");
})

//player four team two

let playerFourDroneZone = [
  document.getElementById("playerFourDroneZoneNone"),
  document.getElementById("playerFourDroneZoneOne"),
  document.getElementById("playerFourDroneZoneTwo"),
  document.getElementById("playerFourDroneZoneThree")
]

function playerFourDroneZoneChange(change){
  blueAlliance[9][1] = change
  for(let i = 0; i < 4 ;i++){
    playerFourDroneZone[i].style.backgroundColor = "aliceblue"
  }
  playerFourDroneZone[change].style.backgroundColor = "red"
}

playerFourDroneZone[0].addEventListener("click", () => {
  playerFourDroneZoneChange(0);
  updatePoints("blue");
})

playerFourDroneZone[1].addEventListener("click", () => {
  playerFourDroneZoneChange(1);
  updatePoints("blue");
})

playerFourDroneZone[2].addEventListener("click", () => {
  playerFourDroneZoneChange(2);
  updatePoints("blue");
})
playerFourDroneZone[3].addEventListener("click", () => {
  playerFourDroneZoneChange(3);
  updatePoints("blue");
})

let playerFourProp = [
  document.getElementById("playerFourPropNo"),
  document.getElementById("playerFourPropYes")
]

function playerFourPropChange(change) {
  blueAlliance[3][1] = change
  playerFourProp[0].style.backgroundColor = "aliceblue"
  playerFourProp[1].style.backgroundColor = "aliceblue"
  playerFourProp[change].style.backgroundColor = "red"
}
playerFourProp[0].addEventListener("click", () => {
  playerFourPropChange(0)
  updatePoints("blue");
})
playerFourProp[1].addEventListener("click", () => {
  playerFourPropChange(1)
  updatePoints("blue");
})

let playerFourEndgamePark = [
  document.getElementById("playerFourParkNone"),
  document.getElementById("playerFourParkPark"),
  document.getElementById("playerFourParkSuspend")
]

function playerFourEndgameParkChange(change){  
  switch(change) {
    case 1:
      blueAlliance[8][1] = 1
      blueAlliance[7][1] = 0
      break;
    case 2:
      blueAlliance[7][1] = 1
      blueAlliance[8][1] = 0
      break;
    default:
      blueAlliance[7][1] = 0
      blueAlliance[8][1] = 0
  }
  for(let i = 0; i < 3 ;i++){
    playerFourEndgamePark[i].style.backgroundColor = "aliceblue"
  }
  playerFourEndgamePark[change].style.backgroundColor = "red"
}

playerFourEndgamePark[0].addEventListener("click", () => {
  playerFourEndgameParkChange(0)
  updatePoints("blue");
})

playerFourEndgamePark[1].addEventListener("click", () => {
  playerFourEndgameParkChange(1)
  updatePoints("blue");
})

playerFourEndgamePark[2].addEventListener("click", () => {
  playerFourEndgameParkChange(2)
  updatePoints("blue");
})

let playerFourAutoSpike = [
  document.getElementById("playerFourAutoSpikeNo"),
  document.getElementById("playerFourAutoSpikeYes")
]

function playerFourAutoSpikeChange(change){
  blueAlliance[4][1] = change
  for(let i = 0; i < 2 ;i++){
    playerFourAutoSpike[i].style.backgroundColor = "aliceblue"
  }
  playerFourAutoSpike[change].style.backgroundColor = "red"
}

playerFourAutoSpike[0].addEventListener("click", () => {
  playerFourAutoSpikeChange(0)
  updatePoints("blue");
})

playerFourAutoSpike[1].addEventListener("click", () => {
  playerFourAutoSpikeChange(1)
  updatePoints("blue");
})

let playerFourAutoPixel = [
  document.getElementById("playerFourAutoPixelNo"),
  document.getElementById("playerFourAutoPixelYes")
]

function playerFourAutoPixelChange(change){
  blueAlliance[5][1] = change
  for(let i = 0; i < 2 ;i++){
    playerFourAutoPixel[i].style.backgroundColor = "aliceblue"
  }
  playerFourAutoPixel[change].style.backgroundColor = "red"
}

playerFourAutoPixel[0].addEventListener("click", () => {
  playerFourAutoPixelChange(0)
  updatePoints("blue");
})

playerFourAutoPixel[1].addEventListener("click", () => {
  playerFourAutoPixelChange(1)
  updatePoints("blue");
})

let playerFourAutoPark = [
  document.getElementById("playerFourAutoParkNo"),
  document.getElementById("playerFourAutoParkYes")
]

function playerFourAutoParkChange(change){
  blueAlliance[6][1] = change
  for(let i = 0; i < 2 ;i++){
    playerFourAutoPark[i].style.backgroundColor = "aliceblue"
  }
  playerFourAutoPark[change].style.backgroundColor = "red"
}

playerFourAutoPark[0].addEventListener("click", () => {
  playerFourAutoParkChange(0)
  updatePoints("blue");
})

playerFourAutoPark[1].addEventListener("click", () => {
  playerFourAutoParkChange(1)
  updatePoints("blue");
})