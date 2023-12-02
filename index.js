//landscape prefrence

const universalGreen = "#58b917";
const universalRed = "red"
const universalYellow = "#D5D817";
const universalOrange = "orange";

let alertElements = [
  document.getElementById("landscapeWarning"),
  document.getElementById("alertButton")
]

if(window.innerHeight > window.innerWidth){
  alertElements[0].style.display = "block"
  alertElements[1].addEventListener("click", () => {
    alertElements[0].style = ""
  });
}

createHexDivision("hex_container_blue", "hex_row_blue", "hexagon_blue")
createHexDivision("hex_container_red", "hex_row_red", "hexagon_red")
let redReset = new Array(71);
let blueReset = new Array(71)
redReset.fill(false);
blueReset.fill(false);
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

changeColor("red")
changeColor("blue")
let hexColorAvail = ["black", "white", "green", "purple", "yellow"]; 

function changeColor(hexColor) 
{
  let hexagons = hexColor == "red"? redHexagons : blueHexagons;
  let colorStates = (hexColor == "red")? redColorStates : blueColorStates;
  let currentColorIndex = 0;
  hexagons.forEach((hex, index) => {
    hex.addEventListener("click", () => {
    currentColorIndex = hexColorAvail.findIndex(x => x == colorStates[index]);
    console.log(index,currentColorIndex);
      hex.classList.remove("black", "white", "green", "purple", "yellow")
        currentColorIndex = (currentColorIndex + 1) % 5
        if (currentColorIndex === 0) {
          hex.classList.add("black");
          colorStates[index] = "black";
        } else if (currentColorIndex === 1) {
          hex.classList.add("white");
          colorStates[index] = "white";
        } else if (currentColorIndex === 2) {
          hex.classList.add("green");
          colorStates[index] = "green";
        } else if (currentColorIndex === 3) {
          hex.classList.add("purple");
          colorStates[index] = "purple";
        } else if (currentColorIndex === 4) {
          hex.classList.add("yellow");
          colorStates[index] = "yellow";
        }
        //Update points here
        updatePoints(hexColor)
        //pirate?
        //run scoreMosaics(mosaicsArr, team)
        
        updateBackboardStats();
        console.log(redColorStates);
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
  document.getElementById("totalMosaics"),
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
  backboard[0].innerHTML = blue[1] + " - Mosaics - " + red[1];
  backboard[1].innerHTML = blueColorStates.filter(color => color !== "black").length + "- Total Pixels - " + redColorStates.filter(color => color !== "black").length;
  backboard[6].innerHTML = blue[12] + " - Set Lines Crossed - " + red[12];
  for(let i=0; i < 4; i++) {
    backboard[i+2].innerHTML = blueColorStates.filter(color => color == colorArr[i].toLowerCase()).length
    + " - " + colorArr[i] + " Pixels - " 
    + redColorStates.filter(color => color == colorArr[i].toLowerCase()).length;
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
    timerCheck: 0,
    tooltipsCheck: 1,
    darkmodeToggleCheck: 0,
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
let teamNamesString = [
  "Team One",
  "Team Two",
  "Team Three",
  "Team Four"
]

function updateTeamNames(update){

  if(update == 1){
    teamNames[0].value = blueAlliance[15][0]
    teamNames[1].value = blueAlliance[15][1]
    teamNames[2].value = redAlliance[15][0]
    teamNames[3].value = redAlliance[15][1]
  }

  for (let i = 0; i < 4; i++) {
    teamNames[i].addEventListener("input", (function (index) {
      return function () {
        if (teamNames[index].value.length === 0) {
          teamNameHeader[index].innerHTML = teamNamesString[index];
          if (index > 1) {
            redAlliance[15][index - 2] = teamNamesString[index];
          } else {
            blueAlliance[15][index] = teamNamesString[index];
          }
        } else {
          teamNameHeader[index].innerHTML = teamNames[index].value;
          if (index > 1) {
            redAlliance[15][index - 2] = teamNames[index].value;
          } else {
            blueAlliance[15][index] = teamNames[index].value;
          }
        }
      };
    })(i));
  }
}

//toggle buttons
let toggleButtons = [
  document.getElementById("timerToggleButton"),
  document.getElementById("tooltipsToggleButton"),
  document.getElementById("darkmodeToggleButton")
]

let timerElements = [
  document.getElementById("timerContainer"),
  document.getElementById("timerTime"),
  document.getElementById("startButton"),
  document.getElementById("stopButton"),
  document.getElementById("restartButton")
]


let timer;
let running = false;
let totalSeconds = 180;

function updateTimer() {
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;
  timerElements[1].innerText = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  totalSeconds--;

  if (totalSeconds < 0) {
    clearInterval(timer);
    running = false;
    // put anything here to execute after the time runs out
    timerElements[1].innerText = "0:00";
  }
}

function startTimer() {
  if (!running) {
    running = true;
    timer = setInterval(updateTimer, 1000);
  }
}

function stopTimer() {
  running = false;
  clearInterval(timer);
}

function restartTimer() {
  stopTimer();
  totalSeconds = 180; // Reset to 3 minutes
  updateTimer();
}

/*goofy*/

timerElements[2].addEventListener('click', startTimer);
timerElements[3].addEventListener('click', stopTimer);
timerElements[4].addEventListener('click', restartTimer);

const timerContainer = document.getElementById("timerContainer");

const root = document.documentElement;

var jsonItems = ["timerCheck", "tooltipsCheck", "darkmodeToggleCheck"]

initializeButtonAppearances()
updateTimmer()
updateTooltips()
updateDarkmode()

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
      updateTimmer()
      updateDarkmode()
    } else {
      toggleButtons[i].style.backgroundColor = "white"
      updateTooltips()
      updateTimmer()
      updateDarkmode()
    }
    updateCookie()
  });
}

function updateTooltips(){
  var elements = document.querySelectorAll('.toolbox_info');
  var elements2 = document.querySelectorAll('.toolbox_info_image');
  if(userData[jsonItems[1]] == 0){
    for(let i = 0; i <elements.length; i++){
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

let isDragging = false;
let initialX;
let initialY;

timerContainer.addEventListener('mousedown', function(e) {
  isDragging = true;
  initialX = e.clientX - timerContainer.getBoundingClientRect().left;
  initialY = e.clientY - timerContainer.getBoundingClientRect().top;
});

document.addEventListener('mousemove', function(e) {
  if (isDragging) {
    e.preventDefault();
    const offsetX = e.clientX - initialX;
    const offsetY = e.clientY - initialY;
    timerContainer.style.left = offsetX + 'px';
    timerContainer.style.top = offsetY + 'px';
  }
});

document.addEventListener('mouseup', function() {
  isDragging = false;
});

function updateTimmer(){
  if(userData[jsonItems[0]] == 0){
    timerElements[0].style.display = "none"
    restartTimer()
    timerContainer.style.left = 0 + 'px';
    timerContainer.style.top = 0 + 'px';
  }else{
    timerElements[0].style.display = "block"
  }
}

function updateDarkmode(){
  let tooltips_color = document.querySelectorAll('.toolbox_info_image');
  if(userData[jsonItems[2]] == 1){
    for(let i = 0; i <tooltips_color.length; i++){
      tooltips_color[i].src = 'images/questionMarkWhite.svg';
    }
    root.style.setProperty("--mainbackground", "#242528");
    root.style.setProperty("--buttonbackground", "#242528");
    root.style.setProperty("--border", "#d2daff");
    root.style.setProperty("--textcolor", "#f0f0f0");
    root.style.setProperty("--userinputboxcolor", "#313135");
    root.style.setProperty("--gradientreddark", "#8c0404");
    root.style.setProperty("--gradientredlight", "#c40000");
    root.style.setProperty("--gradientbluedark", "#001b99");
    root.style.setProperty("--gradientbluelight", "#0025c9");
    root.style.setProperty("--hoverbackground", "#8c8f98");
  }else{
    for(let i = 0; i <tooltips_color.length; i++){
      tooltips_color[i].src = 'images/questionMark.svg';
    }
    root.style.setProperty("--mainbackground", "#d2daff");
    root.style.setProperty("--buttonbackground", "#f0f0f0");
    root.style.setProperty("--border", "#000000");
    root.style.setProperty("--textcolor", "#000000");
    root.style.setProperty("--userinputboxcolor", "#f0f0f0");
    root.style.setProperty("--gradientreddark", "#f82b2b");
    root.style.setProperty("--gradientredlight", "#ff8b8b");
    root.style.setProperty("--gradientbluedark", "#3358ff");
    root.style.setProperty("--gradientbluelight", "#93a7ff");
    root.style.setProperty("--hoverbackground", "#93a7ff");
  }
}

let importExportButtons = [
  document.getElementById("export_button"),
  document.getElementById("import_button")
];

importExportButtons[0].addEventListener("click", () => {
  exportScoreGame();
});

/*goofy*/

function exportScoreGame() {
  const data = {
    redAlliance: redAlliance,
    blueAlliance: blueAlliance,
    redBackpanel: redColorStates,
    blueBackpanel: blueColorStates,
  };

  const jsonString = JSON.stringify(data, null, 2); // The third parameter (2) is for indentation spaces
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'data.json';
  link.click();
  URL.revokeObjectURL(url);
}
//input input needs to be reworked
function importScoreGame (file){
  
  const reader = new FileReader()
  //reader.onload is async
  reader.onload = function(event) {
    
    const jsonData = JSON.parse(event.target.result);

    redAlliance = jsonData.redAlliance;
    blueAlliance = jsonData.blueAlliance;
    redColorStates = jsonData.redBackpanel;
    blueColorStates = jsonData.blueBackpanel;

    updateInputValues()
  }
  reader.readAsText(file);
}

function updateInputValues(){
  updateTeamNames(1)

  //console.log(redColorStates);
  let colorString = "red";
  let color = "redAlliance";
  let colorStates = redColorStates;
  let hexagons = document.getElementsByClassName("hexagon_" + colorString);

  for(i = 0; i < hexagons.length; i++) {
    currentColorIndex = hexColorAvail.findIndex(x => x == colorStates[i]);
    hexagons[i].classList.remove("black", "white", "green", "purple", "yellow")
    switch(currentColorIndex)
        {
          case 0:
            hexagons[i].classList.add("black");
            break;
          case 1:
            hexagons[i].classList.add("white");
            break;
          case 2:
            hexagons[i].classList.add("green");
            break;
          case 3:
            hexagons[i].classList.add("purple")
            break
          case 4:
            hexagons[i].classList.add("yellow")
            break
        }
  }
  redAllianceBackstagePixels[0].value = redAlliance[2];
  redAllianceAutoBackpanelPixels[0].value = redAlliance[14];
  redAllianceAutoBackstagePixels[0].value = redAlliance[13];
  redAllianceMinorPenalties[0].value = redAlliance[10];
  redAllianceMajorPenalties[0].value = redAlliance[11];

  let arrPos = [3, 0, 4, 0, 5, 0, 6, 0, 7, 0, 8]
  let arrElementsRed = [
    playerThreeProp,
    playerFourProp,
    playerThreeAutoSpike,
    playerFourAutoSpike,
    playerThreeAutoPixel,
    playerFourAutoPixel,
    playerThreeAutoPark,
    playerFourAutoPark,
    playerThreeEndgamePark,
    playerFourEndgamePark,
    playerThreeEndgameSuspend,
    playerFourEndgameSuspend
  ]

  /*goofy*/
  for(i = 0; i < arrPos.length; i += 2){
    if(redAlliance[arrPos[i]][0] == 1){
      arrElementsRed[i][1].style.background = universalGreen
      arrElementsRed[i][0].style="";
      arrElementsRed[i][1].style.color = "white"
    }else{
      arrElementsRed[i][0].style.background = universalRed
      arrElementsRed[i][1].style="";
      arrElementsRed[i][0].style.color = "white"
    }
    if(redAlliance[arrPos[i]][1] == 1){
      arrElementsRed[i+1][1].style.background = universalGreen
      arrElementsRed[i+1][0].style="";
      arrElementsRed[i+1][1].style.color = "white"
    }else{
      arrElementsRed[i+1][0].style.background = universalRed
      arrElementsRed[i+1][1].style="";
      arrElementsRed[i+1][0].style.color = "white"
    }
  }

  for (i = 0; i < 2; i++) {
    droneZoneChange(redAlliance,i+2,redAlliance[9][i]);
  }

  updateSetLines(color, colorStates);
  scoreMosaics(colorStates, color);
  updatePoints("red");
  updatePoints("blue");

  colorString = "blue";
  color = "blueAlliance";
  colorStates = blueColorStates;
  hexagons = document.getElementsByClassName("hexagon_" + colorString);

  for(i = 0; i < hexagons.length; i++) {
    currentColorIndex = hexColorAvail.findIndex(x => x == colorStates[i]);
    hexagons[i].classList.remove("black", "white", "green", "purple", "yellow")
    switch(currentColorIndex)
        {
          case 0:
            hexagons[i].classList.add("black");
            break;
          case 1:
            hexagons[i].classList.add("white");
            break;
          case 2:
            hexagons[i].classList.add("green");
            break;
          case 3:
            hexagons[i].classList.add("purple");
            break;
          case 4:
            hexagons[i].classList.add("yellow");
            break;
        }
  }
  blueAllianceBackstagePixels[0].value = blueAlliance[2];
  blueAllianceAutoBackpanelPixels[0].value = blueAlliance[14];
  blueAllianceAutoBackstagePixels[0].value = blueAlliance[13];
  blueAllianceMinorPenalties[0].value = blueAlliance[10];
  blueAllianceMajorPenalties[0].value = blueAlliance[11];

  let arrElementsBlue = [
    playerOneProp,
    playerTwoProp,
    playerOneAutoSpike,
    playerTwoAutoSpike,
    playerOneAutoPixel,
    playerTwoAutoPixel,
    playerOneAutoPark,
    playerTwoAutoPark,
    playerOneEndgamePark,
    playerTwoEndgamePark,
    playerOneEndgameSuspend,
    playerTwoEndgameSuspend
  ]

  for(i = 0; i < arrPos.length; i += 2){
    if(blueAlliance[arrPos[i]][0] == 1){
      arrElementsBlue[i][1].style.background = universalGreen
      arrElementsBlue[i][0].style="";
      arrElementsBlue[i][1].style.color = "white"
    }else{
      arrElementsBlue[i][0].style.background = universalRed
      arrElementsBlue[i][1].style="";
      arrElementsBlue[i][0].style.color = "white"
    }
    if(blueAlliance[arrPos[i]][1] == 1){
      arrElementsBlue[i+1][1].style.background = universalGreen
      arrElementsBlue[i+1][0].style="";
      arrElementsBlue[i+1][1].style.color = "white"
    }else{
      arrElementsBlue[i+1][0].style.background = universalRed
      arrElementsBlue[i+1][1].style="";
      arrElementsBlue[i+1][0].style.color = "white"
    }
  }

  for (i = 0; i < 2; i++) {
    droneZoneChange(blueAlliance,i+2,blueAlliance[9][i]);
  }

  updateSetLines(color, colorStates);
  scoreMosaics(colorStates, color);
  updatePoints("red");
  updatePoints("blue");
  updateBackboardStats();

}
let redAlliance = [
  0,//(0) pixels on backboard
  0,//(1) mosaics
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
  0,//(11) major penalties
  0,//(12) set lines crossed
  0,//(13) auto backstage pixel
  0,//(14) auto backpanel pixel
  [null,null]//(15) team name 
]
let blueAlliance = [
  0,//(0) pixels on backboard
  0,//(1) mosaics
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
  0,//(11) major penalties
  0,//(12) set lines crossed
  0,//(13) auto backstage pixel
  0,//(14) auto backpanel pixel
  [null,null]//(15) team name 
]

let scoreElements = [
  document.getElementById("redAllianceScore"),
  document.getElementById("blueAllianceScore")
]

updateTeamNames(0)

/*goofy*/

//Function to calculate points
function updatePoints(color) {
  let alliance = [];
  alliance = (color == "red")? redAlliance: blueAlliance;
  let colorStates = (color == "red")? redColorStates : blueColorStates;
  let filteredColorStates = colorStates.filter(color => color !== "black");
  alliance[0] = filteredColorStates.length;
  updateSetLines(alliance,colorStates);
  scoreMosaics(colorStates, alliance);

  //Auto
  let parkPts = (alliance[6][0]*5)+(alliance[6][1]*5);
  let spikePts = (alliance[4][0] * (alliance[3][0]+1)*10) + (alliance[4][1] * (alliance[3][1]+1)*10);
  let autoPixelPts = (alliance[5][0] * (alliance[3][0]+1)*10) + (alliance[5][1] * (alliance[3][1]+1)*10);
  let autoBackstagePts = (alliance[13] * 3);
  let autoBackpanelPts = (alliance[14] * 5);
  //Driver control period
  let pixelPts = (alliance[0] * 3) + (alliance[1] * 10) + (alliance[2]) + (alliance[12]*10);
  //Endgame
  let endgamePts = (alliance[8][0]*5) + (alliance[8][1]*5) + (alliance[7][0]*20) + (alliance[7][1]*20);
  let dronePts = ((alliance[9][0] == 0 ? 0 : 30 - (alliance[9][0]-1)*10)) + ((alliance[9][1] == 0 ? 0 : 30 - (alliance[9][1]-1)*10));

  //Penalties
  let penaltyPts = 0;
  if(color == "red") {
    penaltyPts = (blueAlliance[10] * 10) + (blueAlliance[11]*30);
    let total = parkPts + spikePts + autoPixelPts + pixelPts + autoBackstagePts + autoBackpanelPts + endgamePts + dronePts + penaltyPts;
    scoreElements[0].innerHTML = total;

  } else {
    penaltyPts = (redAlliance[10] * 10) + (redAlliance[11]*30);
    let total = parkPts + spikePts + autoPixelPts + pixelPts + autoBackstagePts + autoBackpanelPts + endgamePts + dronePts + penaltyPts;
    scoreElements[1].innerHTML = total;
  }
}

/**
 *  Team 1
 */
let redAllianceBackstagePixels = [
  document.getElementById("redAllianceBackstagePixelsNumber"),
  document.getElementById("redAllianceBackstagePixelsPlus"),
  document.getElementById("redAllianceBackstagePixelsMinus")
]

let redAllianceAutoBackstagePixels = [
  document.getElementById("redAllianceAutoBackstagePixelsNumber"),
  document.getElementById("redAllianceAutoBackstagePixelsPlus"),
  document.getElementById("redAllianceAutoBackstagePixelsMinus")
];

let redAllianceAutoBackpanelPixels = [
  document.getElementById("redAllianceAutoBackpanelPixelsNumber"),
  document.getElementById("redAllianceAutoBackpanelPixelsPlus"),
  document.getElementById("redAllianceAutoBackpanelPixelsMinus")
];

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
let blueAllianceBackstagePixels = [
  document.getElementById("blueAllianceBackstagePixelsNumber"),
  document.getElementById("blueAllianceBackstagePixelsPlus"),
  document.getElementById("blueAllianceBackstagePixelsMinus")
]

let blueAllianceAutoBackstagePixels = [
  document.getElementById("blueAllianceAutoBackstagePixelsNumber"),
  document.getElementById("blueAllianceAutoBackstagePixelsPlus"),
  document.getElementById("blueAllianceAutoBackstagePixelsMinus")
]

let blueAllianceAutoBackpanelPixels = [
  document.getElementById("blueAllianceAutoBackpanelPixelsNumber"),
  document.getElementById("blueAllianceAutoBackpanelPixelsPlus"),
  document.getElementById("blueAllianceAutoBackpanelPixelsMinus")
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

let redAlliancePoints  = [redAllianceBackstagePixels, redAllianceAutoBackstagePixels, redAllianceAutoBackpanelPixels, redAllianceMinorPenalties, redAllianceMajorPenalties]
let blueAlliancePoints = [blueAllianceBackstagePixels, blueAllianceAutoBackstagePixels, blueAllianceAutoBackpanelPixels, blueAllianceMinorPenalties, blueAllianceMajorPenalties]

function penaltyScoreUpdate(change, team, teamPoints, arrayPos, pointType) {
  if(change > 0 || team[arrayPos] > 0 || Number(teamPoints[pointType][0].value) > 0) 
  {
    team[arrayPos] = Number(teamPoints[pointType][0].value)
    team[arrayPos] += change
    teamPoints[pointType][0].value = team[arrayPos]


    if(pointType == 1 && (team[2] != 0 || change > 0)) {
      team[2] += change;
      teamPoints[0][0].value = team[arrayPos];
    }

    if (teamPoints[pointType][0].value.length > 4)
      teamPoints[pointType][0].value = teamPoints[pointType][0].value.slice(0, 4)
  }
  updatePoints("blue")
  updatePoints("red")
}
// doing commas like 1 ,2 ,3 is a war crime
const teamIndices = [2, 13, 14, 10, 11]

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
    teamDroneZone[teamNumber][change].style.backgroundColor = universalYellow
  else
    teamDroneZone[teamNumber][change].style.backgroundColor = universalOrange
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
  document.getElementById("playerOneEndgameParkNo"),
  document.getElementById("playerOneEndgameParkYes")
];

let playerTwoEndgamePark = [
  document.getElementById("playerTwoEndgameParkNo"),
  document.getElementById("playerTwoEndgameParkYes")
];

let playerThreeEndgamePark = [
  document.getElementById("playerThreeEndgameParkNo"),
  document.getElementById("playerThreeEndgameParkYes")
];

let playerFourEndgamePark = [
  document.getElementById("playerFourEndgameParkNo"),
  document.getElementById("playerFourEndgameParkYes")
];


let teamEndgamePark = [playerOneEndgamePark, playerTwoEndgamePark, playerThreeEndgamePark, playerFourEndgamePark]

function endgameParkChange(alliance, teamNumber, change)
{
  alliance[8][teamNumber%2] = change;
  for(let i=0; i < 2; i++) {
      teamEndgamePark[teamNumber][i].style = ""
  }

  teamEndgamePark[teamNumber][change].style.color = "white"
  if(change == 0)
    teamEndgamePark[teamNumber][change].style.backgroundColor = universalRed
  else if(change == 1)
    teamEndgamePark[teamNumber][change].style.backgroundColor = universalGreen
}


/*
 *
 *      Endgame Suspend
 *
 */

let playerOneEndgameSuspend = [
  document.getElementById("playerOneEndgameSuspendNo"),
  document.getElementById("playerOneEndgameSuspendYes")
];

let playerTwoEndgameSuspend = [
  document.getElementById("playerTwoEndgameSuspendNo"),
  document.getElementById("playerTwoEndgameSuspendYes")
];

let playerThreeEndgameSuspend = [
  document.getElementById("playerThreeEndgameSuspendNo"),
  document.getElementById("playerThreeEndgameSuspendYes")
];

let playerFourEndgameSuspend = [
  document.getElementById("playerFourEndgameSuspendNo"),
  document.getElementById("playerFourEndgameSuspendYes")
];

let teamEndgameSuspend = [
  playerOneEndgameSuspend,
  playerTwoEndgameSuspend,
  playerThreeEndgameSuspend,
  playerFourEndgameSuspend
];

function endgameSuspendChange(alliance, teamNumber, change)
{
  alliance[7][teamNumber%2] = change;
  for(let i=0; i < 2; i++) {
      teamEndgameSuspend[teamNumber][i].style = ""
  }
  teamEndgameSuspend[teamNumber][change].style.color = "white"
  if(change == 0)
    teamEndgameSuspend[teamNumber][change].style.backgroundColor = universalRed
  else if(change == 1)
    teamEndgameSuspend[teamNumber][change].style.backgroundColor = universalGreen
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
          droneZoneChange(i <= 1? blueAlliance: redAlliance, i, j)
          updatePoints(i <= 1? "blue": "red")
      })
  }

  for(let j=0; j < 2; j++)
  {
      teamProps[i][j].addEventListener("click", () => {
          propChange(i <= 1? blueAlliance: redAlliance, i, j)
          updatePoints(i <= 1? "blue": "red")
      })
      teamAutoSpike[i][j].addEventListener("click", () => {
          autoSpikeChange(i <= 1? blueAlliance: redAlliance, i, j)
          updatePoints(i <= 1? "blue": "red")
      })
      teamAutoPixel[i][j].addEventListener("click", () => {
          autoPixelChange(i <= 1? blueAlliance: redAlliance, i, j)
          updatePoints(i <= 1? "blue": "red")
      })
      teamAutoPark[i][j].addEventListener("click", () => {
          autoParkChange(i <= 1? blueAlliance: redAlliance, i, j)
          updatePoints(i <= 1? "blue": "red")
      })
      teamEndgamePark[i][j].addEventListener("click", () => {
        endgameParkChange(i <= 1? blueAlliance: redAlliance, i, j)
        updatePoints(i <= 1? "blue": "red")
    })
    teamEndgameSuspend[i][j].addEventListener("click", () => {
      endgameSuspendChange(i <= 1? blueAlliance: redAlliance, i, j)
      updatePoints(i <= 1? "blue": "red")
  })
  }

}

updateBackboardStats();
updatePoints("red");
updatePoints("blue");

const resetButtons = [
  document.getElementsByClassName("reset_red_backpanel_button")[0],
  document.getElementsByClassName("reset_blue_backpanel_button")[0]
]

resetButtons[0].addEventListener("click" , () => {
    let colorString = "red"
    redAlliance = [
        0,//(0) pixels on backboard
        0,//(1) mosaics
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
        0,//(11) major penalties
        0,//(12) set lines crossed
        0,//(13) auto backstage pixel
        0//(14) auto backpanel pixel
    ]
    redColorStates.fill("black")
    let color = redAlliance;
    let colorStates = redColorStates;
    let hexagons = document.getElementsByClassName("hexagon_" + colorString);
    for(i = 0; i < hexagons.length; i++) {
      hexagons[i].classList.remove("black", "white", "green", "purple", "yellow")
      hexagons[i].classList.add("black");
    }
    redAllianceBackstagePixels[0].value=0;
    redAllianceAutoBackpanelPixels[0].value=0;
    redAllianceAutoBackstagePixels[0].value=0;
    redAllianceMinorPenalties[0].value=0;
    redAllianceMajorPenalties[0].value=0;
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
    colorString = "blue";
    blueAlliance = [
      0,//(0) pixels on backboard
      0,//(1) mosaics
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
      0,//(11) major penalties
      0,//(12) set lines crossed
      0,//(13) auto backstage pixel
      0//(14) auto backpanel pixel
    ]
    blueColorStates.fill("black")
    let color = blueAlliance;
    let colorStates = blueColorStates;
    let hexagons = document.getElementsByClassName("hexagon_" + colorString);
    for(i = 0; i < hexagons.length; i++) {
      hexagons[i].classList.remove("black", "white", "green", "purple", "yellow")
      hexagons[i].classList.add("black");
    }
    blueAllianceBackstagePixels[0].value=0;
    blueAllianceAutoBackpanelPixels[0].value=0;
    blueAllianceAutoBackstagePixels[0].value=0;
    blueAllianceMinorPenalties[0].value=0;
    blueAllianceMajorPenalties[0].value=0;
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
  /*goofy*/