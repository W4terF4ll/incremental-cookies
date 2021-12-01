//core values
var cookies = 0;
var upgrade = 0;
var multi = 1;
var bestCookies = 0;

//time values
var timeElapsed = 0;
var timerID = -1;

//one more values
var oneUnlocked = false;
var oneCount = 0;
var oneFirst = 5;
var oneCost = oneFirst + Math.floor(oneCount * Math.pow(1.1,oneCount));

//oven values
var ovenUnlocked = false;
var ovenCount = 0;
var ovenFirst = 100;
var ovenCost = ovenFirst + Math.floor(ovenCount * ovenFirst * Math.pow(3,ovenCount));

//bakery values
var bakeryUnlocked = false;
var bakeryFirst = 2000
var bakeryCost = 5000

//time functions
function tick() {
	timeElapsed++
	document.getElementById("time").innerHTML = timeElapsed;
	cookieUpdate(1, true);

}

function start() {
	if(timerID == -1){
		timerID = setInterval(tick, 1000);
	}
}

function stop() {
	if(timerID != -1){
		clearInterval(timerID)
		timerID = -1
	}
}

//starting the timer
start();

//changing the cookie amount
function cookieUpdate(number, upgradeCalc) {

	//calculating the new cookies and updating the text
	if (upgradeCalc == true) {
		cookies = cookies + ((number + upgrade) * multi);
	} else {
		cookies = cookies + number;
	}
	if (cookies > bestCookies) {
		bestCookies = cookies;
	}
	
	//detecting if the new cookie amount unlocks anything or allows anything to be purchased
	if (bestCookies >= oneFirst && oneUnlocked == false) {
		document.getElementById("one").innerHTML = "<button id=\"oneButton\" onclick=\"oneAdd()\">Bake an extra cookie! (<span id=\"oneCost\"></span> Cookies)</button>";
		oneUnlocked = true;
	} else if (cookies >= oneCost && oneUnlocked == true) {
		oneButton.removeAttribute("disabled");
	} else if (oneUnlocked == true) {
		oneButton.setAttribute("disabled", "disabled");
	}
	if (bestCookies >= ovenFirst && ovenUnlocked == false) {
		document.getElementById("oven").innerHTML = "<button id=\"ovenButton\" onclick=\"ovenAdd()\">Buy new ovens! (<span id=\"ovenCost\"></span> Cookies)</button>";
		ovenUnlocked = true;
	} else if (cookies >= ovenCost && ovenUnlocked == true) {
		ovenButton.removeAttribute("disabled");
	} else if (ovenUnlocked == true) {
		ovenButton.setAttribute("disabled", "disabled");
	}
	if (bestCookies >= bakeryFirst && bakeryUnlocked == false) {
		document.getElementById("bakery").innerHTML = "<button id=\"bakeryButton\" onclick=\"bakeryAdd()\">Construct a bakery! (<span id=\"bakeryCost\"></span> Cookies)</button>";
		bakeryUnlocked = true;
	} else if (cookies >= bakeryCost && bakeryUnlocked == true) {
		bakeryButton.removeAttribute("disabled");
	} else if (bakeryUnlocked == true){
		bakeryButton.setAttribute("disabled", "disabled");
	}
	if (cookies >= 100000) {
		stop();
		document.getElementById("timer").innerHTML = "Congratulations! Your Time: <span class=\"time\" id=\"time\">0</span><span class=\"time\">s</span>";
		document.getElementById("time").innerHTML = timeElapsed;
	}
	textUpdater();
}

//extra cookie upgrade
function oneAdd() {
	upgrade += 1;
	textUpdater();
	var oneTemp = oneCost;
	document.getElementById("bakeCount").innerHTML = (upgrade + 1) * multi;
	oneCount += 1;
	oneCost = oneFirst + Math.floor(oneCount * Math.pow(1.1,oneCount));
	document.getElementById("oneCost").innerHTML = oneCost;
	cookieUpdate(-(oneTemp), false);
}

//extra ovens upgrade
function ovenAdd() {
	multi *= 2;
	textUpdater();
	var ovenTemp = ovenCost
	document.getElementById("bakeCount").innerHTML = (upgrade + 1) * multi;
	ovenCount += 1;
	ovenCost = ovenFirst + Math.floor(ovenCount * ovenFirst * Math.pow(3,ovenCount));
	document.getElementById("ovenCost").innerHTML = ovenCost;
	cookieUpdate(-(ovenTemp), false);
}

//bakery feature unlock
function bakeryAdd() {
	cookieUpdate(-(bakeryCost), false);
	bakeryButton.remove();
	
}

//display text updater
function textUpdater() {
	document.getElementById("cookies").innerHTML = cookies;
	document.getElementById("bakeCount").innerHTML = (upgrade + 1) * multi;
	switch (true) {
		case (bestCookies < oneFirst):
			document.getElementById("nextUpgrade").innerHTML = oneCost;
			break;
		case (bestCookies < ovenFirst):
			document.getElementById("nextUpgrade").innerHTML = ovenCost;
			break;
		case (bestCookies < bakeryFirst):
			document.getElementById("nextUpgrade").innerHTML = 10000;
			break;
		case (bestCookies < 100000):
			document.getElementById("nextUpgrade").innerHTML = 100000;
			break;
		default:
			document.getElementById("nextText").innerHTML = "Game Complete! (for now...)";
	}
	if ((upgrade + 1) * multi > 1) {
		document.getElementById("cookieText").innerHTML = "Cookies per Second!";
	} else {
		document.getElementById("cookieText").innerHTML = "Cookie per Second!";
	}
}
