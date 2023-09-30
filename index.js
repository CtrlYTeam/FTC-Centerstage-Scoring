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

let playerOneDroneZone = [
  document.getElementById("playerOneDroneZoneNone"),
  document.getElementById("playerOneDroneZoneOne"),
  document.getElementById("playerOneDroneZoneTwo"),
  document.getElementById("playerOneDroneZoneThree")
]

function playerOneDroneZoneChange(change){
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
  teamOne[3][0] = change
  switch(change) {
    case 1:
      teamOne[8][0] = 1
      break;
    case 2:
      teamOne[7][0] = 1
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
teamOne[4][0] = change
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