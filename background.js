//STOPWATCH STARTS HERE

// Declare variables to use in our functions below
localStorage.setItem("soundflag", 1);
let startTime;
let elapsedTime = localStorage.getItem("pausedtime");
let timerInterval;
var counter = 0;
// Create "start", "pause" and "reset" functions
function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    if (localStorage.getItem("flag") == 1) {
      elapsedTime = Date.now() - startTime;
      chrome.runtime.sendMessage({ data: elapsedTime });
      localStorage.setItem("pausedtime", elapsedTime);
    }
  }, 10);
}

function pause() {
  clearInterval(timerInterval);
  localStorage.setItem("flag", 2);
}

function reset() {
  localStorage.setItem("flag", 3);
  localStorage.setItem("pausedtime", 0);
  chrome.runtime.sendMessage({ data1: 0 });
  elapsedTime = 0;
}
//TIMER STARTS HERE

function timer() {
  if (hh == 0 && mm == 0 && ss == 0) {
    //showButton("PLAY");
    var timerNotification = "timer-notification";
    chrome.notifications.create(timerNotification, {
      type: "basic",
      iconUrl: chrome.runtime.getURL("images/logo.png"),
      title: "TIMER",
      message: "TIME UP!",
    });
    stopInterval();
  } else if (ss != 0) {
    if (ss <= 10) {
      sdis = "0" + (ss - 1);
      ss = sdis;
    } else {
      ss--;
    }
  } else if (mm != 0 && ss == 0) {
    ss = 59;
    if (mm <= 10) {
      mdis = "0" + (mm - 1);
      mm = mdis;
    } else {
      mm--;
    }
  } else if (hh != 0 && mm == 0) {
    mm = 59;
    ss = 59;
    if (hh <= 10) {
      hdis = "0" + (h.value - 1);
      hh = hdis;
    } else {
      hh--;
    }
  }
  localStorage.setItem("hh", hh);
  localStorage.setItem("mm", mm);
  localStorage.setItem("ss", ss);
}
function startt() {
  hh = localStorage.getItem("hh");
  mm = localStorage.getItem("mm");
  ss = localStorage.getItem("ss");
  startTimer = setInterval(function () {
    timer();
  }, 1000);
}

function stopInterval() {
  clearInterval(startTimer);
}

function pauset() {
  stopInterval();
}

function resett() {
  stopInterval();
  localStorage.setItem("hh", "00");
  localStorage.setItem("mm", "00");
  localStorage.setItem("ss", "00");
}
//ALARM STARTS HERE

sound = new Audio(
  "images/alarm.mp3"
);
sound.loop = true;
function pausesound() {
  sound.pause();
}

function CheckAlarm() {
  var alarmNotification = "alarm-notification";
  var now = new Date();
  time = now.toLocaleTimeString();
  if (time === localStorage.getItem("alarm")) {
    chrome.notifications.create(alarmNotification, {
      type: "basic",
      iconUrl: chrome.runtime.getURL("images/logo.png"),
      title: "ALARM",
      message: "WAKE UP!",
    });
    if (localStorage.getItem("soundflag") == 1) {
      sound.play();
    }
    setTimeout(pausesound, 5000);
  }
  setTimeout(CheckAlarm, 1000);
}
CheckAlarm();
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request === "START") {
    localStorage.setItem("flag", 1);
    start();
  }
  if (request === "PAUSE") {
    pause();
  }
  if (request === "RESET") {
    reset();
  }
  if (request === "STARTT") {
    startt();
  }
  if (request === "PAUSET") {
    pauset();
  }
  if (request === "RESETT") {
    resett();
  }
});