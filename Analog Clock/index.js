let date;
let hour;
let minute;
let second;
let clockTimer;
let day;
let month;
let year;


var clockFunction = () => {

    date = new Date()

    var mili = date.getMilliseconds();
    second = date.getSeconds()
    minute = date.getMinutes()
    hour =  date.getHours()

    let sec = second  + mili / 1000;
    let mnt = minute + sec / 60  
    let hr = hour + mnt / 60

    document.querySelector(".second").style =
        `transform: rotate(${sec*6 - 90 + "deg"})`;
    document.querySelector(".minute").style =
        `transform: rotate(${mnt*6 - 90 + "deg"})`;
    document.querySelector(".hour").style =
        `transform: rotate(${hr*30 - 90 + "deg"})`;
    day = date.getDate().toString()
    month = (date.getMonth()+1).toString()
    year = date.getFullYear().toString()
    


    let calender = day.padStart(2, "0")+" / "+month.padStart(2, "0")+" / "+year.padStart(2, "0")
        document.querySelector(".date").textContent = calender
}

function startInterval(mili) {
    clearInterval(clockTimer);
    clockTimer = setInterval(clockFunction, mili);
}

clockFunction();
startInterval(1000);


function design1Add() {
    var element = document.getElementById("myclock");
    element.classList.add("design1");
    element.classList.remove("design2");
}

function design2Add() {
    var element = document.getElementById("myclock");
    element.classList.add("design1");
    element.classList.add("design2");
}

function firstDesign() {
    var element = document.getElementById("myclock");
    element.classList.remove("design1");
    element.classList.remove("design2");
}

function dateClick() {
    var calDate = document.querySelector(".date")
    var calBtn = document.querySelector(".click-btn")
    var calaero = document.querySelector(".move")
    if(calDate.style.display === "none"){ 
        calDate.style.display = "block";
        calBtn.textContent = "Hide";
        calaero.style.display = "block";

    }
    else{
        calDate.style.display = "none";
        calBtn.textContent = "Show";
        calaero.style.display = "none";
    }
}

let x = 38;
let y = 20;

function dateUp(){
    if (y>19 && y<75) {
        var v = ++y +"%"
    }
  calDate = document.querySelector(".date");
  calDate.style.bottom = v
    console.log("bottom / y : " + v);
}

function dateDown(){
    if (y>20 && y<76) {
        var v = --y +"%"
    }
   calDate = document.querySelector(".date");
   calDate.style.bottom = v
   console.log("bottom / y : " + v);
 }

 function dateLeft(){
    if (x>20 && x<55) {
        var v = --x +"%"
    }
   calDate = document.querySelector(".date");
   calDate.style.left = v
   console.log("left / x : " + v);
 }

 function dateRight(){
    if (x>19 && x<54) {
        var v = ++x +"%"
    }
   calDate = document.querySelector(".date");
   calDate.style.left = v
   console.log("left / x : " + v)
 }