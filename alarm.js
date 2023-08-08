chrome.runtime.getBackgroundPage(function (backgroundPage) {
  console = backgroundPage.console;
});
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
let setButton = document.getElementById("setButton");
let removeButton = document.getElementById("removeButton");
// set our variables
var alarm, time;
localStorage.setItem("activeAlarm", 0);

// define a function to display the current time
function displayTime() {
  var now = new Date();
  time = now.toLocaleTimeString();
  clock.textContent = time;
  // time = "1:00:00 AM";
  setTimeout(displayTime, 1000);
}
displayTime();

// add option values relative towards time
function addMinSecVals(id) {
  var select = id;
  var min = 59;

  for (i = 0; i <= min; i++) {
    // defined as new Option(text, value)
    select.options[select.options.length] = new Option(
      i < 10 ? "0" + i : i,
      i < 10 ? "0" + i : i
    );
  }
}
function addHours(id) {
  var select = id;
  var hour = 12;

  for (i = 1; i <= hour; i++) {
    // defined as new Option(text, value)
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
  }
}

addMinSecVals(minutes);
addMinSecVals(seconds);
addHours(hours);

if (localStorage.getItem("flagAlarm") == 1) {
  hours.selectedIndex = localStorage.getItem("alarmh");
  minutes.selectedIndex = localStorage.getItem("alarmm");
  seconds.selectedIndex = localStorage.getItem("alarms");
  ampm.selectedIndex = localStorage.getItem("alarmampm");
  alarmset();
}
// set and clear alarm
var startstop = document.getElementById("startstop");
startstop.addEventListener("click", function () {
  // set the alarm
  if (localStorage.getItem("activeAlarm") == 0) {
    localStorage.setItem("alarmh", hours.selectedIndex);
    localStorage.setItem("alarmm", minutes.selectedIndex);
    localStorage.setItem("alarms", seconds.selectedIndex);
    localStorage.setItem("alarmampm", ampm.selectedIndex);
    alarmset();
  } else {
    alarmnotset();
  }
});
function showButton(buttonKey) {
  const buttonToShow = buttonKey === "SET" ? setButton : removeButton;
  const buttonToHide = buttonKey === "SET" ? removeButton : setButton;
  buttonToShow.style.display = "block";
  buttonToHide.style.display = "none";
}
function alarmset() {
  hours.disabled = true;
  minutes.disabled = true;
  seconds.disabled = true;
  ampm.disabled = true;
  showButton("REMOVE");
  alarm =
    hours.value + ":" + minutes.value + ":" + seconds.value + " " + ampm.value;
  localStorage.setItem("alarm", alarm);
  localStorage.setItem("activeAlarm", 1);
  localStorage.setItem("flagAlarm", 1);
}
function alarmnotset() {
  // clear the alarm
  hours.disabled = false;
  minutes.disabled = false;
  seconds.disabled = false;
  ampm.disabled = false;
  showButton("SET");
  hours.selectedIndex = 0;
  minutes.selectedIndex = 0;
  seconds.selectedIndex = 0;
  ampm.selectedIndex = 0;
  alarm = "00:00:00 AM";
  localStorage.setItem("alarm", alarm);
  localStorage.setItem("activeAlarm", 0);
  localStorage.setItem("flagAlarm", 0);
}
let soundon = document.getElementById("soundon");
let soundoff = document.getElementById("soundoff");
var soundonoff = document.getElementById("soundonoff");
function showsound(buttonKey) {
  const buttonToShow = buttonKey === "ON" ? soundon : soundoff;
  const buttonToHide = buttonKey === "ON" ? soundoff : soundon;
  buttonToShow.style.display = "block";
  buttonToHide.style.display = "none";
}
if (localStorage.getItem("soundflag") == 0) {
  showsound("OFF");
} else {
  showsound("ON");
}
soundonoff.addEventListener("click", function () {
  if (localStorage.getItem("soundflag") == 0) {
    localStorage.setItem("soundflag", 1);
    showsound("ON");
  } else {
    localStorage.setItem("soundflag", 0);
    showsound("OFF");
  }
});