createHexDivision("hex_container_blue", "hex_row_blue", "hexagon_blue")
createHexDivision("hex_container_red", "hex_row_red", "hexagon_red")
let redReset = new Array(71);
let blueReset = new Array(71)
redReset.fill(false);
blueReset.fill(false);
const universalGreen = "#58b917";
const universalRed = "red"
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
  return finalString
}

const redHexagons  = document.querySelectorAll(".hexagon_red")
const blueHexagons = document.querySelectorAll(".hexagon_blue")

let redColorStates  = new Array(71)
let blueColorStates = new Array(71)

redColorStates.fill("black")
blueColorStates.fill("black")

changeColor("red", redColorStates)
changeColor("blue", blueColorStates)

function changeColor(hexColor, colorStates) 
{
  let hexagons = hexColor == "red"? redHexagons : blueHexagons;
  hexagons.forEach((hex, index) => {
    let currentColorIndex = 0
    hex.addEventListener("click", () => {
      if(hexColor == "red") {
        if(redReset[index]) {
          currentColorIndex = 0
          redReset[index] = false
        }
      } else {
        if(blueReset[index]) {
          currentColorIndex = 0
          blueReset[index] = false
        }
      }
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
          redAlliance[0] = filteredColorStates.length
          updateSetLines(redAlliance,colorStates);
          scoreMosaics(colorStates, redAlliance);

        } else {
          blueAlliance[0] = filteredColorStates.length
          updateSetLines(blueAlliance,colorStates);
          scoreMosaics(colorStates, blueAlliance);
        }
        updatePoints(hexColor)
        
        //run scoreMosaiacs(mosaicsArr, team)
        
        updateBackboardStats();
        //document.getElementsByClassName("redColorStateHeader")[0].innerHTML  = formatText(redColorStates)
        //document.getElementsByClassName("blueColorStateHeader")[0].innerHTML = formatText(blueColorStates)
    })
  })
}

function updateSetLines(team, colorStates) {
  let maxIndex = 0; 
  for(let i = 0; i < 71;i++) {
    if(colorStates[70-i] != "black") {
      maxIndex = i; 
    }
  }
  team[12] = 0;
  if(maxIndex >= 52) {
    team[12] = 3;
  }
  else if(maxIndex >= 32) {
    team[12] = 2;
  }
  else if(maxIndex >= 13 ) {
    team[12] = 1;
  }
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

let backboard = [
  document.getElementById("totalMosaiacs"),
  document.getElementById("totalPixels"),
  document.getElementById("totalWhitePixels"),
  document.getElementById("totalGreenPixels"),
  document.getElementById("totalPurplePixels"),
  document.getElementById("totalYellowPixels"),
  document.getElementById("setLines")
]


function updateBackboardStats()
{
  let red = redAlliance; let blue = blueAlliance;
  const colorArr = ["White", "Green", "Purple", "Yellow"];
  backboard[0].innerHTML = red[1] + " - Mosaics - " + blue[1];
  backboard[1].innerHTML = redColorStates.filter(color => color !== "black").length + "- Total Pixels - " + blueColorStates.filter(color => color !== "black").length;
  backboard[6].innerHTML = red[12] + " - Set Lines Crossed - " + blue[12];
  for(let i=0; i < 4; i++) {
    backboard[i+2].innerHTML = redColorStates.filter(color => color == colorArr[i].toLowerCase()).length
    + " - " + colorArr[i] + " Pixels - " 
    + blueColorStates.filter(color => color == colorArr[i].toLowerCase()).length;
  }
}
function createHexDivision(containerColor, hexRowColor, hexColor)
{
  const container = document.getElementsByClassName(containerColor)
  for(let i=0; i < 11; i++)
  {
    const hexRow = document.createElement("div")
    hexRow.classList.add(hexRowColor)
    if(i == 8 || i == 5 || i == 2) {
      hexRow.classList.add("hex_row_setLine");
    }
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
  const resetBtn = document.createElement("button");
  let resetClass = hexColor == "hexagon_red"? "reset_red_backpanel_button" : "reset_blue_backpanel_button";
  resetBtn.classList.add(resetClass);
  resetBtn.innerHTML = "Reset"
  container[0].appendChild(resetBtn);
}

const getRow = n => {
  const lastMod = (n - (n%6)) / 6;
  return ((n-Math.floor(lastMod/2)) - (n-Math.floor(lastMod/2)) % 6) / 6;
}

function checkBorders(mosaicsArr, index, tertiary_idx) 
{
  const borderIndices = tertiary_idx === 1? [-2, 1, 5, 6, 7, -8, -6, -14, -13]: [-1, 1, 6, 7, -8, -5, -14, -13, -12]
  const rowDeviations = tertiary_idx === 1? [ 0, 0, 1, 1, 1, -1, -1, -2,  -2]:  [ 0, 0, 1, 1, -1, -1, -2,  -2,  -2]
  const indexRow      = getRow(index)
  for(let i=0; i < borderIndices.length; i++)
  {
    if(index + borderIndices[i] > 70 || index + borderIndices[i] < 0 || getRow(index + borderIndices[i]) - indexRow !== rowDeviations[i])
      continue
    if(mosaicsArr[index + borderIndices[i]] != "black" && mosaicsArr[index + borderIndices[i]] != "white")
      return false
  }
  return true
}

const mosaicsMatch = (mosaicsArr, index, tertiary_idx) => {
  return (mosaicsArr[index] !== mosaicsArr[index-tertiary_idx] && mosaicsArr[index-tertiary_idx] !== mosaicsArr[index-7] && mosaicsArr[index] !== mosaicsArr[index-7] ||
          mosaicsArr[index] === mosaicsArr[index-tertiary_idx] && mosaicsArr[index-tertiary_idx] === mosaicsArr[index-7]) &&
          mosaicsArr[index] !== "black" && mosaicsArr[index-tertiary_idx] !== "black" && mosaicsArr[index-7] !== "black"  &&
          mosaicsArr[index] !== "white" && mosaicsArr[index-tertiary_idx] !== "white" && mosaicsArr[index-7] !== "white"
}

/**
 * @param mosaicsArr - colorState string array (redColorStates or blueColorStates)
 * @param team       - alliance score array (blueAlliance or redAlliance)
 */
function scoreMosaics(mosaicsArr, team) 
{
  team[1] = 0
  for(let i=70; i >= 6; i--)
    if(mosaicsMatch(mosaicsArr, i, 6) && checkBorders(mosaicsArr, i, 6) || mosaicsMatch(mosaicsArr, i, 1) && checkBorders(mosaicsArr, i, 1))
      team[1]++
}

//cookies for dropdown
let userData = parseCookie()

if(userData == undefined){
  newCookie()
  userData = parseCookie()
}

function newCookie(){
  userData = {
    // timerCheck: 0,
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
  // document.getElementById("timerToggleButton"),
  document.getElementById("tooltipsToggleButton")
]

var jsonItems = ["timerCheck", "tooltipsCheck"]

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
      updateTooltips()
    } else {
      toggleButtons[i].style.backgroundColor = "white"
      updateTooltips()
    }
    updateCookie()
  });
}

function updateTooltips(){
  var elements = document.querySelectorAll('.toolbox_backstage_pixel');
  var elements2 = document.querySelectorAll('.tooltip_backstage_pixel_image');
    //console.log(elements2)
    //console.log(userData)
  if(userData[jsonItems[0]] == 0){
    for(let i = 0; i <elements.length; i++){
      console.log("test")
      elements[i].style.display = 'none';
      elements2[i].style.display = 'none';
    }
  }else{
    for(let i = 0; i <elements.length; i++){
      elements[i].style = "";
      elements2[i].style = "";
    }
  }

}

let redAlliance = [
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
let blueAlliance = [
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

  // console.log("Number of mosaics:", alliance[1])
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

/*
 *
 *      Drone zones 
 *
 */
let playerOneDroneZone = [
  document.getElementById("playerOneDroneZoneNone"),
  document.getElementById("playerOneDroneZoneOne"),
  document.getElementById("playerOneDroneZoneTwo"),
  document.getElementById("playerOneDroneZoneThree")
]
let playerTwoDroneZone = [
  document.getElementById("playerTwoDroneZoneNone"),
  document.getElementById("playerTwoDroneZoneOne"),
  document.getElementById("playerTwoDroneZoneTwo"),
  document.getElementById("playerTwoDroneZoneThree")
]
let playerThreeDroneZone = [
  document.getElementById("playerThreeDroneZoneNone"),
  document.getElementById("playerThreeDroneZoneOne"),
  document.getElementById("playerThreeDroneZoneTwo"),
  document.getElementById("playerThreeDroneZoneThree")
]
let playerFourDroneZone = [
  document.getElementById("playerFourDroneZoneNone"),
  document.getElementById("playerFourDroneZoneOne"),
  document.getElementById("playerFourDroneZoneTwo"),
  document.getElementById("playerFourDroneZoneThree")
]

let teamDroneZone = [playerOneDroneZone, playerTwoDroneZone, playerThreeDroneZone, playerFourDroneZone]

function droneZoneChange(alliance, teamNumber, change)
{
  alliance[9][teamNumber%2] = change
  for(let i=0; i < 4; i++) {
      teamDroneZone[teamNumber][i].style = "";
  }
  teamDroneZone[teamNumber][change].style.color = "white"
  if(change == 0)
    teamDroneZone[teamNumber][change].style.backgroundColor = universalRed
  else if(change == 1)
    teamDroneZone[teamNumber][change].style.backgroundColor = universalGreen
  else if(change == 2)
    teamDroneZone[teamNumber][change].style.backgroundColor = "#D5D817"
  else
    teamDroneZone[teamNumber][change].style.backgroundColor = "orange"
}

/*
 *
 *      Props
 *
 */
let playerOneProp = [
  document.getElementById("playerOnePropNo"),
  document.getElementById("playerOnePropYes")
]
let playerTwoProp = [
  document.getElementById("playerTwoPropNo"),
  document.getElementById("playerTwoPropYes")
]
let playerThreeProp = [
  document.getElementById("playerThreePropNo"),
  document.getElementById("playerThreePropYes")
]
let playerFourProp = [
  document.getElementById("playerFourPropNo"),
  document.getElementById("playerFourPropYes")
]

let teamProps = [playerOneProp, playerTwoProp, playerThreeProp, playerFourProp]

function propChange(alliance, teamNumber, change)
{
  alliance[3][teamNumber%2] = change
  teamProps[teamNumber][0].style.backgroundColor = "aliceblue"
  teamProps[teamNumber][1].style.backgroundColor = "aliceblue"
  teamProps[teamNumber][0].style= ""
  teamProps[teamNumber][1].style= ""
  teamProps[teamNumber][change].style.color = "white"
  if(change == 0)
    teamProps[teamNumber][change].style.backgroundColor = universalRed
  else
    teamProps[teamNumber][change].style.backgroundColor = universalGreen
}

/*
 *
 *      Endgame Park
 *
 */
let playerOneEndgamePark = [
  document.getElementById("playerOneParkNone"),
  document.getElementById("playerOneParkPark"),
  document.getElementById("playerOneParkSuspend")
]
let playerTwoEndgamePark = [
  document.getElementById("playerTwoParkNone"),
  document.getElementById("playerTwoParkPark"),
  document.getElementById("playerTwoParkSuspend")
]
let playerThreeEndgamePark = [
  document.getElementById("playerThreeParkNone"),
  document.getElementById("playerThreeParkPark"),
  document.getElementById("playerThreeParkSuspend")
]
let playerFourEndgamePark = [
  document.getElementById("playerFourParkNone"),
  document.getElementById("playerFourParkPark"),
  document.getElementById("playerFourParkSuspend")
]

let teamEndgamePark = [playerOneEndgamePark, playerTwoEndgamePark, playerThreeEndgamePark, playerFourEndgamePark]

function endgameParkChange(alliance, teamNumber, change)
{
  switch(change)
  {
    
    case 1:
      alliance[8][teamNumber%2] = 1
      alliance[7][teamNumber%2] = 0
      break
    case 2:
      alliance[8][teamNumber%2] = 0
      alliance[7][teamNumber%2] = 1
      break
    default:
      alliance[8][teamNumber%2] = 0
      alliance[7][teamNumber%2] = 0
      break
          
  }
  for(let i=0; i < 3; i++) {
      teamEndgamePark[teamNumber][i].style = ""
  }

  teamEndgamePark[teamNumber][change].style.color = "white"
  if(change == 0)
    teamEndgamePark[teamNumber][change].style.backgroundColor = universalRed
  else if(change == 1)
    teamEndgamePark[teamNumber][change].style.backgroundColor = "#D5D817"
  else
    teamEndgamePark[teamNumber][change].style.backgroundColor = universalGreen
}

/*
 *
 *      Auto Spike
 *
 */
let playerOneAutoSpike = [
  document.getElementById("playerOneAutoSpikeNo"),
  document.getElementById("playerOneAutoSpikeYes")
]  
let playerTwoAutoSpike = [
  document.getElementById("playerTwoAutoSpikeNo"),
  document.getElementById("playerTwoAutoSpikeYes")
]
let playerThreeAutoSpike = [
  document.getElementById("playerThreeAutoSpikeNo"),
  document.getElementById("playerThreeAutoSpikeYes")
]
let playerFourAutoSpike = [
  document.getElementById("playerFourAutoSpikeNo"),
  document.getElementById("playerFourAutoSpikeYes")
]

let teamAutoSpike = [playerOneAutoSpike, playerTwoAutoSpike, playerThreeAutoSpike, playerFourAutoSpike]

function autoSpikeChange(alliance, teamNumber, change)
{
  alliance[4][teamNumber%2] = change
  for(let i=0; i < 2; i++) {
      teamAutoSpike[teamNumber][i].style = ""
  }

  teamAutoSpike[teamNumber][change].style.color = "white"
  if(change == 0)
    teamAutoSpike[teamNumber][change].style.backgroundColor = universalRed
  else
    teamAutoSpike[teamNumber][change].style.backgroundColor = universalGreen
}

/*
 *
 *      Auto Pixel
 *
 */
let playerOneAutoPixel = [
  document.getElementById("playerOneAutoPixelNo"),
  document.getElementById("playerOneAutoPixelYes")
]
let playerTwoAutoPixel = [
  document.getElementById("playerTwoAutoPixelNo"),
  document.getElementById("playerTwoAutoPixelYes")
]
let playerThreeAutoPixel = [
  document.getElementById("playerThreeAutoPixelNo"),
  document.getElementById("playerThreeAutoPixelYes")
]
let playerFourAutoPixel = [
  document.getElementById("playerFourAutoPixelNo"),
  document.getElementById("playerFourAutoPixelYes")
]

let teamAutoPixel = [playerOneAutoPixel, playerTwoAutoPixel, playerThreeAutoPixel, playerFourAutoPixel]

function autoPixelChange(alliance, teamNumber, change)
{
  alliance[5][teamNumber%2] = change
  for(let i=0; i < 2; i++) {
      teamAutoPixel[teamNumber][i].style = "";
  }
  teamAutoPixel[teamNumber][change].style.color = "white"
  if(change == 0)
    teamAutoPixel[teamNumber][change].style.backgroundColor = universalRed
  else
    teamAutoPixel[teamNumber][change].style.backgroundColor = universalGreen
}

/*
 *
 *      Auto Park
 *
 */
let playerOneAutoPark = [
  document.getElementById("playerOneAutoParkNo"),
  document.getElementById("playerOneAutoParkYes")
]
let playerTwoAutoPark = [
  document.getElementById("playerTwoAutoParkNo"),
  document.getElementById("playerTwoAutoParkYes")
]
let playerThreeAutoPark = [
  document.getElementById("playerThreeAutoParkNo"),
  document.getElementById("playerThreeAutoParkYes")
]
let playerFourAutoPark = [
  document.getElementById("playerFourAutoParkNo"),
  document.getElementById("playerFourAutoParkYes")
]

let teamAutoPark = [playerOneAutoPark, playerTwoAutoPark, playerThreeAutoPark, playerFourAutoPark]

function autoParkChange(alliance, teamNumber, change)
{
  alliance[6][teamNumber%2] = change
  for(let i=0; i < 2; i++) {
      teamAutoPark[teamNumber][i].style = ""
  }
  teamAutoPark[teamNumber][change].style.color = "white"
  if(change == 0)
    teamAutoPark[teamNumber][change].style.backgroundColor = universalRed
  else 
    teamAutoPark[teamNumber][change].style.backgroundColor = universalGreen
}

for(let i=0; i < 4; i++)
{
  for(let j=0; j < 4; j++)
  {
      teamDroneZone[i][j].addEventListener("click", () => {
          droneZoneChange(i <= 1? redAlliance: blueAlliance, i, j)
          updatePoints(i <= 1? "red": "blue")
      })
  }

  for(let j=0; j < 2; j++)
  {
      teamProps[i][j].addEventListener("click", () => {
          propChange(i <= 1? redAlliance: blueAlliance, i, j)
          updatePoints(i <= 1? "red": "blue")
      })
      teamAutoSpike[i][j].addEventListener("click", () => {
          autoSpikeChange(i <= 1? redAlliance: blueAlliance, i, j)
          updatePoints(i <= 1? "red": "blue")
      })
      teamAutoPixel[i][j].addEventListener("click", () => {
          autoPixelChange(i <= 1? redAlliance: blueAlliance, i, j)
          updatePoints(i <= 1? "red": "blue")
      })
      teamAutoPark[i][j].addEventListener("click", () => {
          autoParkChange(i <= 1? redAlliance: blueAlliance, i, j)
          updatePoints(i <= 1? "red": "blue")
      })
  }

  for(let j=0; j < 3; j++)
  {
      teamEndgamePark[i][j].addEventListener("click", () => {
          endgameParkChange(i <= 1? redAlliance: blueAlliance, i, j)
          updatePoints(i <= 1? "red": "blue")
      })
  }
}

updateBackboardStats();
updateBackboardStats();
updatePoints("red");
updatePoints("blue");

const resetButtons = [
  document.getElementsByClassName("reset_red_backpanel_button")[0],
  document.getElementsByClassName("reset_blue_backpanel_button")[0]
]

resetButtons[0].addEventListener("click" , () => {
    const colorString = "red"
    redAlliance = [
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
    for(let i = 0; i < 71; i++) {
      redColorStates[i] = "black"
    } 
    let color = redAlliance;
    let colorStates = redColorStates;
    let hexagons = document.getElementsByClassName("hexagon_" + colorString);
    for(i = 0; i < hexagons.length; i++) {
      hexagons[i].classList.remove("black", "white", "green", "purple", "yellow")
      hexagons[i].classList.add("black");
    }
    redAlliancebackstagePixels[0].value="";
    redAllianceMinorPenalties[0].value="";
    redAllianceMajorPenalties[0].value="";
    let buttons = document.getElementsByClassName("red_button");
    for(let i = 0; i < buttons.length;i++) {
      buttons[i].style.backgroundColor="aliceblue";
      buttons[i].style.color="black";
    }
    updateSetLines(color,colorStates);
    scoreMosaics(colorStates,color);
    updateBackboardStats();
    updatePoints("red");
    updatePoints("blue");
    redReset.fill(true);
  });

  resetButtons[1].addEventListener("click" , () => {
    const colorString = "blue";
    blueAlliance = [
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
    for(let i = 0; i < 71; i++) {
      blueColorStates[i] = "black"
    }
    let color = blueAlliance;
    let colorStates = blueColorStates;
    let hexagons = document.getElementsByClassName("hexagon_" + colorString);
    for(i = 0; i < hexagons.length; i++) {
      hexagons[i].classList.remove("black", "white", "green", "purple", "yellow")
      hexagons[i].classList.add("black");
    }
    blueAlliancebackstagePixels[0].value="";
    blueAllianceMinorPenalties[0].value="";
    blueAllianceMajorPenalties[0].value="";
    let buttons = document.getElementsByClassName("blue_button");
    for(let i = 0; i < buttons.length;i++) {
      buttons[i].style.backgroundColor="aliceblue";
      buttons[i].style.color="black";
    }
    updateSetLines(color,colorStates);
    scoreMosaics(colorStates,color);
    updateBackboardStats();
    updatePoints("red");
    updatePoints("blue");
    blueReset.fill(true);
  });