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
  0,//(2) pixel in backstage
  //player one left player 2 right
  [0,0],//(3) player prop
  [0,0],//(4) auto spike
  [0,0],//(5) auto pixel
  [0,0],//(6) auto park
  [0,0],//(7) suspension
  [0,0],//(8) park
  [0,0],//(9) drone
  0,//(10) minor penalties
  0//(11) major penalties
]

function teamOnePoints () {
  
}
let teamOneMinorPenalties = [
document.getElementById("teamOneMinorPenaltiesPixelsNumber"),
document.getElementById("teamOneMinorPenaltiesPixelsPlus"),
document.getElementById("teamOneMinorPenaltiesPixelsMinus")
]

function teamOneMinorPenaltiesChange(change) {
  if(!(change < 0 && teamOneMinorPenalties[0].value == 0)) {
    teamOne[2] = Number(teamOneMinorPenalties[0].value)
    teamOne[2] += change
    teamOneMinorPenalties[0].value = teamOne[2]
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

//player prop
//auto spike
//auto pixel
//auto park
//suspension
//park
//drone done


