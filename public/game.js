const url = "https://api.wheretheiss.at/v1/coordinates/";
const url2 = "https://restcountries.eu/rest/v2/alpha/";

let isRunning = false;
let isRandom = false;
let countryCode = "??";

async function LocateMe() {
  if ("geolocation" in navigator) {

    if (isRunning === false) {
      isRunning = true;
      await navigator.geolocation.getCurrentPosition(res => {
        document.getElementById("latBox").value = res.coords.latitude.toFixed(2);
        document.getElementById("longBox").value = res.coords.longitude.toFixed(2);
        submitted();
      });
    } else {
      console.log("The function was already running!");
    }
  } else {
    /* geolocation IS NOT available */
    console.log("Geolocation not available in your browser!");
  }

}

async function submitted() {
  let Lat = 0;
  let Long = 0;
  countryCode = "??";
  document.getElementById("clue1").innerText = "The Capital is ";
  document.getElementById("clue2").innerText = "The region is ";
  document.getElementById("clue3").innerText = "The flag is ";
  document.getElementById("clue4").src = "https://res.cloudinary.com/dfxgrxdeo/image/upload/v1562262976/white_gqqzxz.bmp";
  document.getElementById("answer").innerText = " ";
  document.getElementById("comment").innerText = " ";
  document.getElementById("countryComment").value="";
  getLatLong();
  await getData();
  isRandom = false;
  isRunning = false;
}

async function getData() {
  const req = url + Lat + "," + Long;
  //console.log(req);
  const raw = await fetch(req);
  const data = await raw.json();
  //console.log(data);

  if (data.error === undefined && data.country_code != "??") {

    const raw2 = await fetch(url2 + data.country_code);
    const data2 = await raw2.json();
    //	console.log(data2);
    document.getElementById("clue1").innerText = "The Capital is " + data2.capital;
    document.getElementById("clue2").innerText = "The region is " + data2.region;
    document.getElementById("clue4").src = data2.flag;
    document.getElementById("answer").innerText = "The country is " + data2.name;
    countryCode = data.country_code;

    const apiPost = {
      'countryCode': data.country_code,
      'countryName': data2.name
    };

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(apiPost)
    };

    fetch('/api', options).then(async res => document.getElementById("comment").innerText = await res.text());
    


  } else if(isRandom) {
    document.getElementById("clue1").innerText = "That isn't on land ";
    document.getElementById("clue2").innerText = "We'll try again automatically";
    document.getElementById("clue3").innerText = " ";
    document.getElementById("clue4").src ="https://res.cloudinary.com/dfxgrxdeo/image/upload/v1563282682/ocean_pvb8zu.jpg";
    isRunning = false;
    isRandom = false;
    setTimeout(randomm, 2500);
  }
  else {
    document.getElementById("clue1").innerText = "That isn't on land ";
    document.getElementById("clue2").innerText = "Pick again or try Random";
    document.getElementById("clue3").innerText = " ";
    document.getElementById("clue4").src ="https://res.cloudinary.com/dfxgrxdeo/image/upload/v1563282682/ocean_pvb8zu.jpg";
    isRunning = false;
  }
}

function getLatLong() {
  Lat = document.getElementById("latBox").value;
  Long = document.getElementById("longBox").value;
  //	console.log(Lat , Long);
}

function randomm() {
  if (isRunning === false) {
    isRunning = true;
    isRandom = true;
    document.getElementById("latBox").value = ((Math.random() * 60) - 30).toFixed(2);
    document.getElementById("longBox").value = ((Math.random() * 300) - 150).toFixed(2);
    submitted();
  } else {
    console.log("The function was already running!")
  }
}

function leaveComment() {
  
  const data = {
    "countryCode": countryCode,
    "comment": document.getElementById("countryComment").value
  };
  console.log(countryCode);
  if(countryCode!="??"){
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  fetch('/comment', options);
}
  document.getElementById("comment").innerText = data.comment;
}