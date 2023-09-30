const hexTop    = document.querySelector('.hexagon_top')
const hexCenter = document.querySelector('.hexagon_center')
const hexBottom = document.querySelector('.hexagon_bottom')
const hexDiag   = parseInt(getComputedStyle(hexTop).borderBottom) + 
                  parseInt(getComputedStyle(hexCenter).height)    + 
                  parseInt(getComputedStyle(hexBottom).borderTop)
const hex_x     = parseInt(getComputedStyle(hexCenter).width)
const padding_x = 5
const padding_y = 25
const rowCount  = 11
const hexInline = 6  // Lower

const container = document.querySelector('.blue_backdrop')
const hexagon   = document.querySelector('.hexagon')
let   newHex

for(let j=0; j < rowCount/2; j++) {
  for(let i=1; i < hexInline+2; i++) {
    if(!j && i === hexInline+1)
      continue;

    newHex = hexagon.cloneNode(true)                                                                                         // No clue about this term
    newHex.style.transform = `translate(${i * (hex_x + padding_x) - (j? hex_x + padding_x: 0)}px, ${-2*j*hexDiag*(hexInline-1) - (j>1?(j-1)*hexDiag:0) - i*hexDiag - j*2*padding_y}px)`
    container.appendChild(newHex)
  }
  for(let i=1; i < hexInline+1; i++) {
    newHex = hexagon.cloneNode(true)                                                                                                                     // No clue about this term
    newHex.style.transform = `translate(${i * (hex_x + padding_x) - 0.5 * (hex_x + padding_x)}px, ${(-2*j*hexDiag*(hexInline-1) - hexDiag*(hexInline-1 + i) - j*hexDiag - padding_y*(j*2 + 1))}px)`
    container.appendChild(newHex)
  }
}

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

function teamOnePoints () {
  
}

let teamOnebackstagePixels = [
  document.getElementById("teamOneBackstagePixelsNumber"),
  document.getElementById("teamOneBackstagePixelsPlus"),
  document.getElementById("teamOneBackstagePixelsMinus")
]

function teamOnebackstagePixelsChange(change) {
  if(!(change < 0 && teamOnebackstagePixels[0].value === 0)) {
    teamOne[2] = Number(teamOnebackstagePixels[0].value)
    teamOne[2] += change
    teamOnebackstagePixels[0].value = teamOne[2]
    if (teamOnebackstagePixels[0].value.length > 4) {
      teamOnebackstagePixels[0].value = teamOnebackstagePixels[0].value.slice(0, 4);
    }
  }
}

teamOnebackstagePixels[0].addEventListener('input', () => {
  teamOnebackstagePixelsChange(0)
})

teamOnebackstagePixels[1].addEventListener("click", () => {
  teamOnebackstagePixelsChange(1)
})

teamOnebackstagePixels[2].addEventListener("click", () => {
  teamOnebackstagePixelsChange(-1)
})

let teamOneMinorPenalties = [
  document.getElementById("teamOneMinorPenaltiesPixelsNumber"),
  document.getElementById("teamOneMinorPenaltiesPixelsPlus"),
  document.getElementById("teamOneMinorPenaltiesPixelsMinus")
]

function teamOneMinorPenaltiesChange(change) {
  if(!(change < 0 && teamOneMinorPenalties[0].value == 0)) {
    teamOne[10] = Number(teamOneMinorPenalties[0].value)
    teamOne[10] += change
    teamOneMinorPenalties[0].value = teamOne[10]
    if (teamOneMinorPenalties[0].value.length > 4) {
      teamOneMinorPenalties[0].value = teamOneMinorPenalties[0].value.slice(0, 4);
    }
  }
}

teamOneMinorPenalties[0].addEventListener('input', () => {
  teamOneMinorPenaltiesChange(0)
})

teamOneMinorPenalties[1].addEventListener("click", () => {
  teamOneMinorPenaltiesChange(1)
})

teamOneMinorPenalties[2].addEventListener("click", () => {
  teamOneMinorPenaltiesChange(-1)
})

let teamOneMajorPenalties = [
  document.getElementById("teamOneMajorPenaltiesPixelsNumber"),
  document.getElementById("teamOneMajorPenaltiesPixelsPlus"),
  document.getElementById("teamOneMajorPenaltiesPixelsMinus")
]
  
function teamOneMajorPenaltiesChange(change) {
  if(!(change < 0 && teamOneMajorPenalties[0].value == 0)) {
    teamOne[11] = Number(teamOneMajorPenalties[0].value)
    teamOne[11] += change
    teamOneMajorPenalties[0].value = teamOne[11]
    if (teamOneMajorPenalties[0].value.length > 4) {
      teamOneMajorPenalties[0].value = teamOneMajorPenalties[0].value.slice(0, 4);
    }
  }
}

teamOneMajorPenalties[0].addEventListener('input', () => {
  teamOneMajorPenaltiesChange(0)
})

teamOneMajorPenalties[1].addEventListener("click", () => {
  teamOneMajorPenaltiesChange(1)
})

teamOneMajorPenalties[2].addEventListener("click", () => {
  teamOneMajorPenaltiesChange(-1)
})

let teamTwobackstagePixels = [
  document.getElementById("teamTwoBackstagePixelsNumber"),
  document.getElementById("teamTwoBackstagePixelsPlus"),
  document.getElementById("teamTwoBackstagePixelsMinus")
]

function teamTwobackstagePixelsChange(change) {
  if (!(change < 0 && teamTwobackstagePixels[0].value === 0)) {
    teamTwo[2] = Number(teamTwobackstagePixels[0].value)
    teamTwo[2] += change
    teamTwobackstagePixels[0].value = teamTwo[2]
    if (teamTwobackstagePixels[0].value.length > 4) {
      teamTwobackstagePixels[0].value = teamTwobackstagePixels[0].value.slice(0, 4);
    }
  }
}

teamTwobackstagePixels[0].addEventListener('input', () => {
  teamTwobackstagePixelsChange(0)
})

teamTwobackstagePixels[1].addEventListener("click", () => {
  teamTwobackstagePixelsChange(1)
})

teamTwobackstagePixels[2].addEventListener("click", () => {
  teamTwobackstagePixelsChange(-1)
})

let teamTwoMinorPenalties = [
  document.getElementById("teamTwoMinorPenaltiesPixelsNumber"),
  document.getElementById("teamTwoMinorPenaltiesPixelsPlus"),
  document.getElementById("teamTwoMinorPenaltiesPixelsMinus")
]

function teamTwoMinorPenaltiesChange(change) {
  if (!(change < 0 && teamTwoMinorPenalties[0].value == 0)) {
    teamTwo[10] = Number(teamTwoMinorPenalties[0].value)
    teamTwo[10] += change
    teamTwoMinorPenalties[0].value = teamTwo[10]
    if (teamTwoMinorPenalties[0].value.length > 4) {
      teamTwoMinorPenalties[0].value = teamTwoMinorPenalties[0].value.slice(0, 4);
    }
  }
}

teamTwoMinorPenalties[0].addEventListener('input', () => {
  teamTwoMinorPenaltiesChange(0)
})

teamTwoMinorPenalties[1].addEventListener("click", () => {
  teamTwoMinorPenaltiesChange(1)
})

teamTwoMinorPenalties[2].addEventListener("click", () => {
  teamTwoMinorPenaltiesChange(-1)
})

let teamTwoMajorPenalties = [
  document.getElementById("teamTwoMajorPenaltiesPixelsNumber"),
  document.getElementById("teamTwoMajorPenaltiesPixelsPlus"),
  document.getElementById("teamTwoMajorPenaltiesPixelsMinus")
]

function teamTwoMajorPenaltiesChange(change) {
  if (!(change < 0 && teamTwoMajorPenalties[0].value == 0)) {
    teamTwo[11] = Number(teamTwoMajorPenalties[0].value)
    teamTwo[11] += change
    teamTwoMajorPenalties[0].value = teamTwo[11]
    if (teamTwoMajorPenalties[0].value.length > 4) {
      teamTwoMajorPenalties[0].value = teamTwoMajorPenalties[0].value.slice(0, 4);
    }
  }
}

teamTwoMajorPenalties[0].addEventListener('input', () => {
  teamTwoMajorPenaltiesChange(0)
})

teamTwoMajorPenalties[1].addEventListener("click", () => {
  teamTwoMajorPenaltiesChange(1)
})

teamTwoMajorPenalties[2].addEventListener("click", () => {
  teamTwoMajorPenaltiesChange(-1)
})

//player One Team One

let playerOneDroneZone = [
  document.getElementById("playerOneDroneZoneNone"),
  document.getElementById("playerOneDroneZoneOne"),
  document.getElementById("playerOneDroneZoneTwo"),
  document.getElementById("playerOneDroneZoneThree")
]

function playerOneDroneZoneChange(change){
  console.log(teamOne);
  teamOne[9][0] = change
  for(let i = 0; i < 4 ;i++){
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
for(let i = 0; i < 2 ;i++){
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
  console.log(teamTwo);
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