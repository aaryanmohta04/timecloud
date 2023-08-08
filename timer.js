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
var start = document.getElementById("playButton");
var pause = document.getElementById("pauseButton");
var reset = document.getElementById("resetButton");
var h = document.getElementById("hh");
var m = document.getElementById("mm");
var s = document.getElementById("ss");
function starttimer() {
  showButton("PAUSE");
  startInterval = setInterval(function printTime() {
    h.value = localStorage.getItem("hh");
    m.value = localStorage.getItem("mm");
    s.value = localStorage.getItem("ss");
    if (isNaN(h.value) || isNaN(m.value) || isNaN(s.value)) {
      resettimer();
    }
    if (h.value == 0 && m.value == 0 && s.value == 0) {
      clearInterval(startInterval);
      localStorage.setItem("flagtimer", 3);
      showButton("PLAY");
    }
  }, 1000);
}
if (localStorage.getItem("flagtimer") == 1) {
  h.value = localStorage.getItem("hh");
  m.value = localStorage.getItem("mm");
  s.value = localStorage.getItem("ss");
  starttimer();
}
if (localStorage.getItem("flagtimer") == 2) {
  h.value = localStorage.getItem("hh");
  m.value = localStorage.getItem("mm");
  s.value = localStorage.getItem("ss");
  showButton("PLAY");
}

function showButton(buttonKey) {
  const buttonToShow = buttonKey === "PLAY" ? start : pause;
  const buttonToHide = buttonKey === "PLAY" ? pause : start;
  buttonToShow.style.display = "block";
  buttonToHide.style.display = "none";
}

//store a reference to the startTimer variable
var startTimer = null;

start.addEventListener("click", function () {
  localStorage.setItem("hh", h.value);
  localStorage.setItem("mm", m.value);
  localStorage.setItem("ss", s.value);
  localStorage.setItem("flagtimer", 1);
  if (h.value == 0 && m.value == 0 && s.value == 0) {
    showButton("PLAY");
    return;
  }
  starttimer();
  chrome.runtime.sendMessage("STARTT");
});

reset.addEventListener("click", function () {
  resettimer();
});

pause.addEventListener("click", function () {
  showButton("PLAY");
  localStorage.setItem("flagtimer", 2);
  chrome.runtime.sendMessage("PAUSET");
});
function resettimer() {
  if (h.value == 0 && m.value == 0 && s.value == 0) {
    return;
  }
  chrome.runtime.sendMessage("RESETT");
  h.value = "00";
  m.value = "00";
  s.value = "00";
  clearInterval(startInterval);
  showButton("PLAY");
  localStorage.setItem("flagtimer", 3);
}