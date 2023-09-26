const hexTop    = document.querySelector('.hexagon_top')
const hexCenter = document.querySelector('.hexagon_center')
const hexBottom = document.querySelector('.hexagon_bottom')
const hexDiag   = parseInt(getComputedStyle(hexTop).borderBottom) + 
                  parseInt(getComputedStyle(hexCenter).height)    + 
                  parseInt(getComputedStyle(hexBottom).borderTop)
const hex_x     = parseInt(getComputedStyle(hexCenter).width)
const padding_x = 5
const padding_y = 25
const rowCount  = 12
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

//pixels on backboard, mozaiacs, pixels in backstage, team prop, auto spike, auto pixel, auto park, suspension, park, drone, minor penalties, major pentalites
const teamOne = [0,0,0,0,0,0,0,0,0,0,0,0]

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