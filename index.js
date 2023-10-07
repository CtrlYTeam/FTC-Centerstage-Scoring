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
  console.log(finalString)
  return finalString
}
const blueHexagons = document.querySelectorAll(".hexagon_blue")
const redHexagons = document.querySelectorAll(".hexagon_red")
const blueColorStates = new Array(71)
const redColorStates = new Array(71)
for(let i = 0; i < 71; i++) {
 blueColorStates[i] = "black"
 redColorStates[i] = "black"
}

redHexagons.forEach((redHexagon, index) => {
  let currentColorIndex = 0;
  redHexagon.addEventListener("click", () => {
      redHexagon.classList.remove("black","white", "green", "purple", "yellow")
      currentColorIndex = (currentColorIndex + 1) % 5
      switch(currentColorIndex)
      {
        case 0:
          redHexagon.classList.add("black")
          redColorStates[index] = "black"
          break
        case 1:
          redHexagon.classList.add("white")
          redColorStates[index] = "white"
          break
        case 2:
          redHexagon.classList.add("green")
          redColorStates[index] = "green"
          break
        case 3:
          redHexagon.classList.add("purple")
          redColorStates[index] = "purple"
          break
        case 4:
          redHexagon.classList.add("yellow")
          redColorStates[index] = "yellow"
          break
      }
  });
});

blueHexagons.forEach((blueHexagon, index) => {
  let currentColorIndex = 0;
  blueHexagon.addEventListener("click", () => {
      blueHexagon.classList.remove("black","white", "green", "purple", "yellow")
      currentColorIndex = (currentColorIndex + 1) % 5
      switch(currentColorIndex)
      {
        case 0:
          blueHexagon.classList.add("black")
          blueColorStates[index] = "black"
          break
        case 1:
          blueHexagon.classList.add("white")
          blueColorStates[index] = "white"
          break
        case 2:
          blueHexagon.classList.add("green")
          blueColorStates[index] = "green"
          break
        case 3:
          blueHexagon.classList.add("purple")
          blueColorStates[index] = "purple"
          break
        case 4:
          blueHexagon.classList.add("yellow")
          blueColorStates[index] = "yellow"
          break
      }
  })
})

//dropdwon panel
let buttonDropdown = document.getElementById("buttonDropdown")
let dropdownPanel = document.getElementById("dropdownPanel")
let dropdownImg = document.getElementById("infoPanelImg")

buttonDropdown.addEventListener("click", () => {
  if (dropdownPanel.classList.contains("dropdown_panel")) {
    dropdownPanel.classList.remove("dropdown_panel")
    dropdownPanel.classList.add("panel_opened")
    dropdownImg.classList.remove("info_panel_img")
    dropdownImg.classList.add("info_panel_img_opened")
  } else {
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
    hexRow.setAttribute("id", 'r'+hexColor+i)
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

let teamNames = [
  document.getElementById("playerOne"),
  document.getElementById("playerTwo"),
  document.getElementById("playerThree"),
  document.getElementById("playerFour")

]

 let teamNamer = [
  document.getElementById("playerOneHeader"),
  document.getElementById("playerTwoHeader"),
  document.getElementById("playerThreeHeader"),
  document.getElementById("playerFourHeader")
 ]

teamNames[0].addEventListener("input", ()=> {
  teamNamer[0].innerHTML=(teamNames[0].value)
  
})

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

// !!NEED TO ADD LINE POINTS!!
const teamOne = [
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
  0//(11) major penalties    done
]
const teamTwo = [
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
  0//(11) major penalties    done
]

function teamOnePointsCalc () {
  
}

/**
 *  Team 1
 */
let teamOnebackstagePixels = [
  document.getElementById("teamOneBackstagePixelsNumber"),
  document.getElementById("teamOneBackstagePixelsPlus"),
  document.getElementById("teamOneBackstagePixelsMinus")
]

let teamOneMinorPenalties = [
  document.getElementById("teamOneMinorPenaltiesPixelsNumber"),
  document.getElementById("teamOneMinorPenaltiesPixelsPlus"),
  document.getElementById("teamOneMinorPenaltiesPixelsMinus")
]

let teamOneMajorPenalties = [
  document.getElementById("teamOneMajorPenaltiesPixelsNumber"),
  document.getElementById("teamOneMajorPenaltiesPixelsPlus"),
  document.getElementById("teamOneMajorPenaltiesPixelsMinus")
]

/**
 * Team 2
 */
let teamTwobackstagePixels = [
  document.getElementById("teamTwoBackstagePixelsNumber"),
  document.getElementById("teamTwoBackstagePixelsPlus"),
  document.getElementById("teamTwoBackstagePixelsMinus")
]

let teamTwoMinorPenalties = [
  document.getElementById("teamTwoMinorPenaltiesPixelsNumber"),
  document.getElementById("teamTwoMinorPenaltiesPixelsPlus"),
  document.getElementById("teamTwoMinorPenaltiesPixelsMinus")
]

let teamTwoMajorPenalties = [
  document.getElementById("teamTwoMajorPenaltiesPixelsNumber"),
  document.getElementById("teamTwoMajorPenaltiesPixelsPlus"),
  document.getElementById("teamTwoMajorPenaltiesPixelsMinus")
]


let teamOnePoints = [teamOnebackstagePixels, teamOneMinorPenalties, teamOneMajorPenalties]
let teamTwoPoints = [teamTwobackstagePixels, teamTwoMinorPenalties, teamTwoMajorPenalties]

function teamChange(change, team, teamPoints, arrayPos, counter_idx) {
  if(change > 0 || teamPoints[counter_idx][0].value != 0) 
  {
    team[arrayPos] = Number(teamPoints[counter_idx][0].value)
    team[arrayPos] += change
    teamPoints[counter_idx][0].value = team[arrayPos]

    if (teamPoints[counter_idx][0].value.length > 4)
      teamPoints[counter_idx][0].value = teamPoints[counter_idx][0].value.slice(0, 4)
  }
}

/**
 *  Change team 1 data
 */
for(let i=0; i < teamOnePoints.length; i++) 
{
  teamOnePoints[i][0].addEventListener('input', () => {
    teamChange(0, teamOne, teamOnePoints, 2, i)
  })
  
  teamOnePoints[i][1].addEventListener("click", () => {
    teamChange(1, teamOne, teamOnePoints, 10, i)
  })
  
  teamOnePoints[i][2].addEventListener("click", () => {
    teamChange(-1, teamOne, teamOnePoints, 11, i)
  })
}

/**
 *  Change team 2 data
 */
for(let i=0; i < teamTwoPoints.length; i++) 
{
  teamTwoPoints[i][0].addEventListener('input', () => {
    teamChange(0, teamTwo, teamTwoPoints, 2, i)
  })
  
  teamTwoPoints[i][1].addEventListener("click", () => {
    teamChange(1, teamTwo, teamTwoPoints, 10, i)
  })
  
  teamTwoPoints[i][2].addEventListener("click", () => {
    teamChange(-1, teamTwo, teamTwoPoints, 11, i)
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
  teamOne[9][0] = change
  for(let i = 0; i < 4; i++){
    playerOneDroneZone[i].style.backgroundColor = "aliceblue"
  }
  playerOneDroneZone[change].style.backgroundColor = "red"
}

playerOneDroneZone[0].addEventListener("click", () => {
  playerOneDroneZoneChange(0)
})

playerOneDroneZone[1].addEventListener("click", () => {
  playerOneDroneZoneChange(1)
})

playerOneDroneZone[2].addEventListener("click", () => {
  playerOneDroneZoneChange(2)
})

playerOneDroneZone[3].addEventListener("click", () => {
  playerOneDroneZoneChange(3)
})

playerOneProp = [
  document.getElementById("playerOnePropNo"),
  document.getElementById("playerOnePropYes")
]

function playerOnePropChange(change) {
  teamOne[3][0] = change
  playerOneProp[0].style.backgroundColor = "aliceblue"
  playerOneProp[1].style.backgroundColor = "aliceblue"
  playerOneProp[change].style.backgroundColor = "red"
}
playerOneProp[0].addEventListener("click", () => {
  playerOnePropChange(0)
})
playerOneProp[1].addEventListener("click", () => {
  playerOnePropChange(1)
})

let playerOneEndgamePark = [
  document.getElementById("playerOneParkNone"),
  document.getElementById("playerOneParkPark"),
  document.getElementById("playerOneParkSuspend")
]

function playerOneEndgameParkChange(change){  
  switch(change) {
    case 1:
      teamOne[8][0] = 1
      teamOne[7][0] = 0
      break;
    case 2:
      teamOne[7][0] = 1
      teamOne[8][0] = 0
      break;
    default:
      teamOne[7][0] = 0
      teamOne[8][0] = 0
  }
  for(let i = 0; i < 3 ;i++){
    playerOneEndgamePark[i].style.backgroundColor = "aliceblue"
  }
  playerOneEndgamePark[change].style.backgroundColor = "red"
}

playerOneEndgamePark[0].addEventListener("click", () => {
  playerOneEndgameParkChange(0)
})

playerOneEndgamePark[1].addEventListener("click", () => {
  playerOneEndgameParkChange(1)
})

playerOneEndgamePark[2].addEventListener("click", () => {
  playerOneEndgameParkChange(2)
})

let playerOneAutoSpike = [
  document.getElementById("playerOneAutoSpikeNo"),
  document.getElementById("playerOneAutoSpikeYes")
]

function playerOneAutoSpikeChange(change){
  teamOne[4][0] = change
  for(let i = 0; i < 2 ;i++){
    playerOneAutoSpike[i].style.backgroundColor = "aliceblue"
  }
  playerOneAutoSpike[change].style.backgroundColor = "red"
}

playerOneAutoSpike[0].addEventListener("click", () => {
  playerOneAutoSpikeChange(0)
})

playerOneAutoSpike[1].addEventListener("click", () => {
  playerOneAutoSpikeChange(1)
})

let playerOneAutoPixel = [
  document.getElementById("playerOneAutoPixelNo"),
  document.getElementById("playerOneAutoPixelYes")
]

function playerOneAutoPixelChange(change){
teamOne[5][0] = change
for(let i = 0; i < 2 ;i++){
playerOneAutoPixel[i].style.backgroundColor = "aliceblue"
}
playerOneAutoPixel[change].style.backgroundColor = "red"
}

playerOneAutoPixel[0].addEventListener("click", () => {
playerOneAutoPixelChange(0)
})

playerOneAutoPixel[1].addEventListener("click", () => {
playerOneAutoPixelChange(1)
})

let playerOneAutoPark = [
  document.getElementById("playerOneAutoParkNo"),
  document.getElementById("playerOneAutoParkYes")
]

function playerOneAutoParkChange(change){
  teamOne[6][0] = change
  for(let i = 0; i < 2; i++){
    playerOneAutoPark[i].style.backgroundColor = "aliceblue"
  }
  playerOneAutoPark[change].style.backgroundColor = "red"
}

playerOneAutoPark[0].addEventListener("click", () => {
  playerOneAutoParkChange(0)
})

playerOneAutoPark[1].addEventListener("click", () => {
  playerOneAutoParkChange(1)
})

//player Two Team One

let playerTwoDroneZone = [
  document.getElementById("playerTwoDroneZoneNone"),
  document.getElementById("playerTwoDroneZoneOne"),
  document.getElementById("playerTwoDroneZoneTwo"),
  document.getElementById("playerTwoDroneZoneThree")
]

function playerTwoDroneZoneChange(change){
  teamOne[9][1] = change
  for(let i = 0; i < 4 ;i++){
    playerTwoDroneZone[i].style.backgroundColor = "aliceblue"
  }
  playerTwoDroneZone[change].style.backgroundColor = "red"
}

playerTwoDroneZone[0].addEventListener("click", () => {
  playerTwoDroneZoneChange(0)
})

playerTwoDroneZone[1].addEventListener("click", () => {
  playerTwoDroneZoneChange(1)
})

playerTwoDroneZone[2].addEventListener("click", () => {
  playerTwoDroneZoneChange(2)
})

playerTwoDroneZone[3].addEventListener("click", () => {
  playerTwoDroneZoneChange(3)
})

let playerTwoProp = [
  document.getElementById("playerTwoPropNo"),
  document.getElementById("playerTwoPropYes")
]

function playerTwoPropChange(change) {
  teamOne[3][1] = change
  playerTwoProp[0].style.backgroundColor = "aliceblue"
  playerTwoProp[1].style.backgroundColor = "aliceblue"
  playerTwoProp[change].style.backgroundColor = "red"
}
playerTwoProp[0].addEventListener("click", () => {
  playerTwoPropChange(0)
})
playerTwoProp[1].addEventListener("click", () => {
  playerTwoPropChange(1)
})

let playerTwoEndgamePark = [
  document.getElementById("playerTwoParkNone"),
  document.getElementById("playerTwoParkPark"),
  document.getElementById("playerTwoParkSuspend")
]

function playerTwoEndgameParkChange(change){  
  switch(change) {
    case 1:
      teamOne[8][1] = 1
      teamOne[7][1] = 0
      break;
    case 2:
      teamOne[7][1] = 1
      teamOne[8][1] = 0
      break;
    default:
      teamOne[7][1] = 0
      teamOne[8][1] = 0
  }
  for(let i = 0; i < 3 ;i++){
    playerTwoEndgamePark[i].style.backgroundColor = "aliceblue"
  }
  playerTwoEndgamePark[change].style.backgroundColor = "red"
}

playerTwoEndgamePark[0].addEventListener("click", () => {
  playerTwoEndgameParkChange(0)
})

playerTwoEndgamePark[1].addEventListener("click", () => {
  playerTwoEndgameParkChange(1)
})

playerTwoEndgamePark[2].addEventListener("click", () => {
  playerTwoEndgameParkChange(2)
})

let playerTwoAutoSpike = [
  document.getElementById("playerTwoAutoSpikeNo"),
  document.getElementById("playerTwoAutoSpikeYes")
]

function playerTwoAutoSpikeChange(change){
  teamOne[4][1] = change
  for(let i = 0; i < 2 ;i++){
    playerTwoAutoSpike[i].style.backgroundColor = "aliceblue"
  }
  playerTwoAutoSpike[change].style.backgroundColor = "red"
}

playerTwoAutoSpike[0].addEventListener("click", () => {
  playerTwoAutoSpikeChange(0)
})

playerTwoAutoSpike[1].addEventListener("click", () => {
  playerTwoAutoSpikeChange(1)
})

let playerTwoAutoPixel = [
  document.getElementById("playerTwoAutoPixelNo"),
  document.getElementById("playerTwoAutoPixelYes")
]

function playerTwoAutoPixelChange(change){
teamOne[5][1] = change
for(let i = 0; i < 2 ;i++){
playerTwoAutoPixel[i].style.backgroundColor = "aliceblue"
}
playerTwoAutoPixel[change].style.backgroundColor = "red"
}

playerTwoAutoPixel[0].addEventListener("click", () => {
playerTwoAutoPixelChange(0)
})

playerTwoAutoPixel[1].addEventListener("click", () => {
playerTwoAutoPixelChange(1)
})

let playerTwoAutoPark = [
  document.getElementById("playerTwoAutoParkNo"),
  document.getElementById("playerTwoAutoParkYes")
]

function playerTwoAutoParkChange(change){
teamOne[6][1] = change
for(let i = 0; i < 2 ;i++){
playerTwoAutoPark[i].style.backgroundColor = "aliceblue"
}
playerTwoAutoPark[change].style.backgroundColor = "red"
}

playerTwoAutoPark[0].addEventListener("click", () => {
playerTwoAutoParkChange(0)
})

playerTwoAutoPark[1].addEventListener("click", () => {
playerTwoAutoParkChange(1)
})

//player Three Team Two

let playerThreeDroneZone = [
  document.getElementById("playerThreeDroneZoneNone"),
  document.getElementById("playerThreeDroneZoneOne"),
  document.getElementById("playerThreeDroneZoneTwo"),
  document.getElementById("playerThreeDroneZoneThree")
]

function playerThreeDroneZoneChange(change){
  teamTwo[9][0] = change
  for(let i = 0; i < 4 ;i++){
    playerThreeDroneZone[i].style.backgroundColor = "aliceblue"
  }
  playerThreeDroneZone[change].style.backgroundColor = "red"
}

playerThreeDroneZone[0].addEventListener("click", () => {
  playerThreeDroneZoneChange(0)
})

playerThreeDroneZone[1].addEventListener("click", () => {
  playerThreeDroneZoneChange(1)
})

playerThreeDroneZone[2].addEventListener("click", () => {
  playerThreeDroneZoneChange(2)
})

playerThreeDroneZone[3].addEventListener("click", () => {
  playerThreeDroneZoneChange(3)
})

let playerThreeProp = [
  document.getElementById("playerThreePropNo"),
  document.getElementById("playerThreePropYes")
]

function playerThreePropChange(change) {
  teamTwo[3][0] = change
  playerThreeProp[0].style.backgroundColor = "aliceblue"
  playerThreeProp[1].style.backgroundColor = "aliceblue"
  playerThreeProp[change].style.backgroundColor = "red"
}
playerThreeProp[0].addEventListener("click", () => {
  playerThreePropChange(0)
})
playerThreeProp[1].addEventListener("click", () => {
  playerThreePropChange(1)
})

let playerThreeEndgamePark = [
  document.getElementById("playerThreeParkNone"),
  document.getElementById("playerThreeParkPark"),
  document.getElementById("playerThreeParkSuspend")
]

function playerThreeEndgameParkChange(change){  
  switch(change) {
    case 1:
      teamTwo[8][0] = 1
      teamTwo[7][0] = 0
      break;
    case 2:
      teamTwo[7][0] = 1
      teamTwo[8][0] = 0
      break;
    default:
      teamTwo[7][0] = 0
      teamTwo[8][0] = 0
  }
  for(let i = 0; i < 3 ;i++){
    playerThreeEndgamePark[i].style.backgroundColor = "aliceblue"
  }
  playerThreeEndgamePark[change].style.backgroundColor = "red"
}

playerThreeEndgamePark[0].addEventListener("click", () => {
  playerThreeEndgameParkChange(0)
})

playerThreeEndgamePark[1].addEventListener("click", () => {
  playerThreeEndgameParkChange(1)
})

playerThreeEndgamePark[2].addEventListener("click", () => {
  playerThreeEndgameParkChange(2)
})

let playerThreeAutoSpike = [
  document.getElementById("playerThreeAutoSpikeNo"),
  document.getElementById("playerThreeAutoSpikeYes")
]

function playerThreeAutoSpikeChange(change){
  teamTwo[4][0] = change
  for(let i = 0; i < 2 ;i++){
    playerThreeAutoSpike[i].style.backgroundColor = "aliceblue"
  }
  playerThreeAutoSpike[change].style.backgroundColor = "red"
}

playerThreeAutoSpike[0].addEventListener("click", () => {
  playerThreeAutoSpikeChange(0)
})

playerThreeAutoSpike[1].addEventListener("click", () => {
  playerThreeAutoSpikeChange(1)
})

let playerThreeAutoPixel = [
  document.getElementById("playerThreeAutoPixelNo"),
  document.getElementById("playerThreeAutoPixelYes")
]

function playerThreeAutoPixelChange(change){
  teamTwo[5][0] = change
  for(let i = 0; i < 2 ;i++){
    playerThreeAutoPixel[i].style.backgroundColor = "aliceblue"
  }
  playerThreeAutoPixel[change].style.backgroundColor = "red"
}

playerThreeAutoPixel[0].addEventListener("click", () => {
  playerThreeAutoPixelChange(0)
})

playerThreeAutoPixel[1].addEventListener("click", () => {
  playerThreeAutoPixelChange(1)
})

let playerThreeAutoPark = [
  document.getElementById("playerThreeAutoParkNo"),
  document.getElementById("playerThreeAutoParkYes")
]

function playerThreeAutoParkChange(change){
  teamTwo[6][0] = change
  for(let i = 0; i < 2 ;i++){
    playerThreeAutoPark[i].style.backgroundColor = "aliceblue"
  }
  playerThreeAutoPark[change].style.backgroundColor = "red"
}

playerThreeAutoPark[0].addEventListener("click", () => {
  playerThreeAutoParkChange(0)
})

playerThreeAutoPark[1].addEventListener("click", () => {
  playerThreeAutoParkChange(1)
})

//player four team two

let playerFourDroneZone = [
  document.getElementById("playerFourDroneZoneNone"),
  document.getElementById("playerFourDroneZoneOne"),
  document.getElementById("playerFourDroneZoneTwo"),
  document.getElementById("playerFourDroneZoneThree")
]

function playerFourDroneZoneChange(change){
  teamTwo[9][1] = change
  for(let i = 0; i < 4 ;i++){
    playerFourDroneZone[i].style.backgroundColor = "aliceblue"
  }
  playerFourDroneZone[change].style.backgroundColor = "red"
}

playerFourDroneZone[0].addEventListener("click", () => {
  playerFourDroneZoneChange(0)
})

playerFourDroneZone[1].addEventListener("click", () => {
  playerFourDroneZoneChange(1)
})

playerFourDroneZone[2].addEventListener("click", () => {
  playerFourDroneZoneChange(2)
})

playerFourDroneZone[3].addEventListener("click", () => {
  playerFourDroneZoneChange(3)
})

let playerFourProp = [
  document.getElementById("playerFourPropNo"),
  document.getElementById("playerFourPropYes")
]

function playerFourPropChange(change) {
  teamTwo[3][1] = change
  playerFourProp[0].style.backgroundColor = "aliceblue"
  playerFourProp[1].style.backgroundColor = "aliceblue"
  playerFourProp[change].style.backgroundColor = "red"
}
playerFourProp[0].addEventListener("click", () => {
  playerFourPropChange(0)
})
playerFourProp[1].addEventListener("click", () => {
  playerFourPropChange(1)
})

let playerFourEndgamePark = [
  document.getElementById("playerFourParkNone"),
  document.getElementById("playerFourParkPark"),
  document.getElementById("playerFourParkSuspend")
]

function playerFourEndgameParkChange(change){  
  switch(change) {
    case 1:
      teamTwo[8][1] = 1
      teamTwo[7][1] = 0
      break;
    case 2:
      teamTwo[7][1] = 1
      teamTwo[8][1] = 0
      break;
    default:
      teamTwo[7][1] = 0
      teamTwo[8][1] = 0
  }
  for(let i = 0; i < 3 ;i++){
    playerFourEndgamePark[i].style.backgroundColor = "aliceblue"
  }
  playerFourEndgamePark[change].style.backgroundColor = "red"
}

playerFourEndgamePark[0].addEventListener("click", () => {
  playerFourEndgameParkChange(0)
})

playerFourEndgamePark[1].addEventListener("click", () => {
  playerFourEndgameParkChange(1)
})

playerFourEndgamePark[2].addEventListener("click", () => {
  playerFourEndgameParkChange(2)
})

let playerFourAutoSpike = [
  document.getElementById("playerFourAutoSpikeNo"),
  document.getElementById("playerFourAutoSpikeYes")
]

function playerFourAutoSpikeChange(change){
  teamTwo[4][1] = change
  for(let i = 0; i < 2 ;i++){
    playerFourAutoSpike[i].style.backgroundColor = "aliceblue"
  }
  playerFourAutoSpike[change].style.backgroundColor = "red"
}

playerFourAutoSpike[0].addEventListener("click", () => {
  playerFourAutoSpikeChange(0)
})

playerFourAutoSpike[1].addEventListener("click", () => {
  playerFourAutoSpikeChange(1)
})

let playerFourAutoPixel = [
  document.getElementById("playerFourAutoPixelNo"),
  document.getElementById("playerFourAutoPixelYes")
]

function playerFourAutoPixelChange(change){
teamTwo[5][1] = change
for(let i = 0; i < 2 ;i++){
playerFourAutoPixel[i].style.backgroundColor = "aliceblue"
}
playerFourAutoPixel[change].style.backgroundColor = "red"
}

playerFourAutoPixel[0].addEventListener("click", () => {
playerFourAutoPixelChange(0)
})

playerFourAutoPixel[1].addEventListener("click", () => {
playerFourAutoPixelChange(1)
})

let playerFourAutoPark = [
  document.getElementById("playerFourAutoParkNo"),
  document.getElementById("playerFourAutoParkYes")
]

function playerFourAutoParkChange(change){
teamTwo[6][1] = change
for(let i = 0; i < 2 ;i++){
playerFourAutoPark[i].style.backgroundColor = "aliceblue"
}
playerFourAutoPark[change].style.backgroundColor = "red"
}

playerFourAutoPark[0].addEventListener("click", () => {
playerFourAutoParkChange(0)
})

playerFourAutoPark[1].addEventListener("click", () => {
playerFourAutoParkChange(1)
})