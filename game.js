

const url="https://api.wheretheiss.at/v1/coordinates/";
const url2="https://restcountries.eu/rest/v2/alpha/";

async function submitted(){
	const Lat = 0;
	const Long = 0;
	document.getElementById("clue1").innerText = "The Capital is ";
	document.getElementById("clue2").innerText = "The region is ";
	document.getElementById("clue3").innerText = "The flag is ";
		document.getElementById("clue4").src = "https://res.cloudinary.com/dfxgrxdeo/image/upload/v1562262976/white_gqqzxz.bmp" ;
		document.getElementById("answer").innerText = " ";
	getLatLong();
    getData();
}

async function getData(){
	const req = url+Lat+","+Long;
	console.log(req);
	const raw = await fetch(req);
	const data = await raw.json();
	console.log(data);

	if(data.error=== undefined){

	const raw2= await fetch(url2+data.country_code);
	const data2 = await raw2.json();
	console.log(data2);
	document.getElementById("clue1").innerText = "The Capital is " + data2.capital;
	document.getElementById("clue2").innerText = "The region is " + data2.region;
	document.getElementById("clue4").src = data2.flag ;
	document.getElementById("answer").innerText = "The country is "+ data2.name ;
}
else{
	document.getElementById("clue1").innerText = "That isn't on land ";
	document.getElementById("clue2").innerText = " Trying again with random";
	document.getElementById("clue3").innerText = " ";
	setTimeout(randomm, 1500);
}
}

function getLatLong(){
	 Lat = document.getElementById("latBox").value;
	 Long = document.getElementById("longBox").value;
	console.log(Lat , Long);
}

function randomm(){
	document.getElementById("latBox").value = (Math.random()*60)-30;
	document.getElementById("longBox").value= (Math.random()*300)-150
	submitted();
}
