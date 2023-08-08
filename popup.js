setInterval(showTime, 1000); // takes time as 1 s and execute the function for every second.

function showTime() {
  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  let period = "AM";

  // Set the clock in 12 hr format
  // If hours is equal to 0 at midnight, we set to 12, and if greater than 12, we will
  //subtract it from 12.
  if (hours == "0") {
    hours = 12;
  }
  if (hours == '12') {
    period = "PM";
  }
  if (hours > 12) {
    hours -= 12;
    period = "PM";
  }

  // when the hrs is less than 10, we are concantenate with 0, otherwise leave it hrs.
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  // displayin to UI
  const time = `${hours} : ${minutes} : ${seconds}  ${period} `;
  document.getElementById("clock").innerHTML = time;
}
showTime();
function PageIndex(page) {
  localStorage.setItem("pageindex", page);
}
function redirect() {
  if (localStorage.getItem("pageindex") == "0") {
    window.location.href = "alarm.html";
  }
  if (localStorage.getItem("pageindex") == "1") {
    window.location.href = "stopwatch.html";
  }
  if (localStorage.getItem("pageindex") == "2") {
    window.location.href = "timer.html";
  }
  if (localStorage.getItem("pageindex") == "3") {
    window.location.href = "tasks.html";
  }
}
document.addEventListener("DOMContentLoaded", function () {
  redirect();
  var link0 = document.getElementById("alarm");
  // onClick's logic below:
  link0.addEventListener("click", function () {
    PageIndex("0");
  });
  var link1 = document.getElementById("stopwatch");
  // onClick's logic below:
  link1.addEventListener("click", function () {
    PageIndex("1");
  });
  var link2 = document.getElementById("timer");
  // onClick's logic below:
  link2.addEventListener("click", function () {
    PageIndex("2");
  });
  var link3 = document.getElementById("tasks");
  // onClick's logic below:
  link3.addEventListener("click", function () {
    PageIndex("3");
  });
});