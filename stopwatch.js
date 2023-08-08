function PageIndex(page) {
  localStorage.setItem("pageindex", page);
}
document.addEventListener("DOMContentLoaded", function () {
  var link0 = document.getElementById("home");
  // onClick's logic below:
  link0.addEventListener("click", function () {
    PageIndex("-1");
  });
});
// Convert time to a format of hours, minutes, seconds, and milliseconds

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(2, "0");

  return `${formattedMM} : ${formattedSS} : ${formattedMS}`;
}

let playButton = document.getElementById("playButton");
let pauseButton = document.getElementById("pauseButton");
let resetButton = document.getElementById("resetButton");

// Create function to modify innerHTML

function print(txt) {
  document.getElementById("display").innerHTML = txt;
}
print(timeToString(localStorage.getItem("pausedtime")));
// Create "start", "pause" and "reset" functions
if (localStorage.getItem("flag") == 1) {
  start();
}

function start() {
  chrome.runtime.sendMessage("START");
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    var msg = request.data;
    print(timeToString(msg));
  });
  showButton("PAUSE");
}

function pause() {
  chrome.runtime.sendMessage("PAUSE");
  showButton("PLAY");
}

function reset() {
  chrome.runtime.sendMessage("RESET");
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    var x = request.data1;
    print(timeToString(x));
  });
  localStorage.setItem("pausedtime", 0000);
  showButton("PLAY");
}

// Create event listeners

playButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
resetButton.addEventListener("click", reset);

// Create function to display buttons

function showButton(buttonKey) {
  const buttonToShow = buttonKey === "PLAY" ? playButton : pauseButton;
  const buttonToHide = buttonKey === "PLAY" ? pauseButton : playButton;
  buttonToShow.style.display = "block";
  buttonToHide.style.display = "none";
}