/* DISCLAIMER: this game is in super duper early beta alpha gamma
bugs are expected and the code is messy */

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
var oneDisplay = 5;
var oneCount = 0;
var oneFirst = 5;
var oneCost = oneFirst + Math.floor(oneCount * Math.pow(1.1,oneCount));

//oven values
var ovenUnlocked = false;
var ovenDisplay = 50;
var ovenCount = 0;
var ovenFirst = 100;
var ovenCost = ovenFirst + Math.floor(ovenCount * ovenFirst * Math.pow(3,ovenCount));

//bakery values
var bakeryUnlocked = false;
var bakeryDisplay = 2000;
var bakeryBought = false;
var bakeryFirst = 5000;
var bakeryCost = 5000;
var buttonLit = false;
var randomLight = 0;
var lightDelayRunning = false;
var bakeryMulti = 1;

//bakery speed upgrade values
var bakerySpeedUnlocked = false;
var bakerySpeedDisplay = 70000;
var bakerySpeed = 5000;
var bakerySpeedComplete = false;
var bakerySpeedCount = 0;
var bakerySpeedFirst = 100000;
var bakerySpeedCost = bakerySpeedFirst + Math.floor(bakerySpeedFirst * (2 * bakerySpeedCount))

//settings menu
function showMenu() {
	var settingsDisplay = document.getElementById("settingsMenu");
	if (settingsDisplay.style.display == "none") {
		settingsDisplay.style.display = "block";
	} else {
		settingsDisplay.style.display = "none";
	}
}

//time functions
function tick() {
	timeElapsed += 1
	document.getElementById("time").innerHTML = timeConvert(timeElapsed);
	cookieUpdate(1, true);
	if (timeElapsed % 5 == 0) {
		saveProgress();
	}
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

//time converter
function timeConvert(time) {
	var days = Math.floor(time / 86400);
	var hours = Math.floor((time % 86400) / 3600);
	var minutes = Math.floor((time % 3600) / 60);
	var seconds = Math.floor(time % 60);
	switch(true) {
		case (time < 60):
			return(seconds + "s");
		case (time < 3600):
			return(minutes + "m" + seconds + "s");
		case (time < 86400):
			return(hours + "h" + minutes + "m" + seconds + "s");
		case (time >= 86400):
			return(days + "d" + hours + "h" + minutes + "m" + seconds + "s");
	}
}

//starting the timer
start();

//changing the cookie amount
function cookieUpdate(number, upgradeCalc) {

	//calculating the new cookies and updating the text
	if (upgradeCalc == true) {
		cookies = cookies + ((number + upgrade) * (multi) * (bakeryMulti));
	} else {
		cookies = cookies + number;
	}
	if (cookies > bestCookies) {
		bestCookies = cookies;
	}
	
	//detecting if the new cookie amount unlocks anything or allows anything to be purchased
	if (bestCookies >= oneDisplay && oneUnlocked == false) {
		document.getElementById("one").innerHTML = "<button id=\"oneButton\" class=\"upgradeButton\" onclick=\"oneAdd()\">Bake an extra cookie! (<span id=\"oneCost\">" + numConvert(oneCost, false) + "</span> Cookies)</button>";
		oneUnlocked = true;
	}
	if (cookies >= oneCost && oneUnlocked == true) {
		oneButton.removeAttribute("disabled");
	} else if (oneUnlocked == true) {
		oneButton.setAttribute("disabled", "disabled");
	}

	if (bestCookies >= ovenDisplay && ovenUnlocked == false) {
		document.getElementById("oven").innerHTML = "<button id=\"ovenButton\" class=\"upgradeButton\" onclick=\"ovenAdd()\">Buy new ovens! (<span id=\"ovenCost\">" + numConvert(ovenCost, false) + "</span> Cookies)</button>";
		ovenUnlocked = true;
	}
	if (cookies >= ovenCost && ovenUnlocked == true) {
		ovenButton.removeAttribute("disabled");
	} else if (ovenUnlocked == true) {
		ovenButton.setAttribute("disabled", "disabled");
	}

	if (bestCookies >= bakeryDisplay && bakeryUnlocked == false) {
		document.getElementById("bakery").innerHTML = "<button id=\"bakeryButton\" class=\"upgradeButton\" onclick=\"bakeryAdd()\">Construct a bakery! (<span id=\"bakeryCost\">" + numConvert(bakeryCost, false) + "</span> Cookies)</button>";
		bakeryUnlocked = true;
	}
	if (cookies >= bakeryCost && bakeryUnlocked == true && bakeryBought == false) {
		bakeryButton.removeAttribute("disabled");
	} else if (bakeryUnlocked == true && bakeryBought == false) {
		bakeryButton.setAttribute("disabled", "disabled");
	}
	
	if (bestCookies >= bakerySpeedDisplay && bakeryBought == true && bakerySpeedUnlocked == false && bakerySpeedComplete == false) {
		document.getElementById("bakerySpeed").innerHTML = "<button id=\"bakerySpeedButton\" class=\"upgradeButton\" onclick=\"bakerySpeedAdd()\">Overclock your bakery! (<span id=\"bakerySpeedCost\">" + numConvert(bakerySpeedCost, false) + "</span> Cookies)</button>";
		bakerySpeedUnlocked = true;
	}
	if (cookies >= bakerySpeedCost && bakerySpeedUnlocked == true && bakeryBought == true && bakerySpeedComplete == false) {
		bakerySpeedButton.removeAttribute("disabled");
	} else if (bakerySpeedUnlocked == true && bakeryBought == true && bakerySpeedComplete == false) {
		bakerySpeedButton.setAttribute("disabled", "disabled");
	}
	
	//update text
	textUpdater();
}

//extra cookie upgrade
function oneAdd() {
	upgrade += 1;
	var oneTemp = oneCost;
	oneCount += 1;
	oneCost = oneFirst + Math.floor(oneCount * Math.pow(1.1,oneCount));
	document.getElementById("oneCost").innerHTML = numConvert(oneCost, false);
	cookieUpdate(-(oneTemp), false);
	textUpdater();
}

//extra ovens upgrade
function ovenAdd() {
	multi *= 2;
	var ovenTemp = ovenCost
	ovenCount += 1;
	ovenCost = ovenFirst + Math.floor(ovenCount * ovenFirst * Math.pow(3,ovenCount));
	document.getElementById("ovenCost").innerHTML = numConvert(ovenCost, false);
	cookieUpdate(-(ovenTemp), false);
	textUpdater();
}

//bakery feature unlock
function bakeryAdd() {
	bakeryBought = true;
	document.getElementById("bakeryText").innerHTML = "<p class=\"bakeryText\">-- BAKERY --</p>"
	document.getElementById("bakeryInfo").innerHTML = "<p class=\"bakeryInfo\">Click lit up ovens for a bonus multiplier!</p>"
	document.getElementById("bakeryMultiDisplay").innerHTML = "<p class=\"bakeryMultiText\">Current Bonus Multiplier: <span class=\"bakeryMultiTextStyle\" id=\"bakeryMultiText\">1.00</span><span class=\"bakeryMultiTextStyle\">x</span></p>"
	document.getElementById("bakeryTopLeft").innerHTML = "<button id=\"bakeryManager1\" class=\"bakeryStyle\" onclick=\"bakeryUnlight(1)\"></button>";
	document.getElementById("bakeryTopMid").innerHTML = "<button id=\"bakeryManager2\" class=\"bakeryStyle\" onclick=\"bakeryUnlight(2)\"></button>";
	document.getElementById("bakeryTopRight").innerHTML = "<button id=\"bakeryManager3\" class=\"bakeryStyle\" onclick=\"bakeryUnlight(3)\"></button>";
	document.getElementById("bakeryMidLeft").innerHTML = "<button id=\"bakeryManager4\" class=\"bakeryStyle\" onclick=\"bakeryUnlight(4)\"></button>";
	document.getElementById("bakeryMidMid").innerHTML = "<button id=\"bakeryManager5\" class=\"bakeryStyle\" onclick=\"bakeryUnlight(5)\"></button>";
	document.getElementById("bakeryMidRight").innerHTML = "<button id=\"bakeryManager6\" class=\"bakeryStyle\" onclick=\"bakeryUnlight(6)\"></button>";
	document.getElementById("bakeryBotLeft").innerHTML = "<button id=\"bakeryManager7\" class=\"bakeryStyle\" onclick=\"bakeryUnlight(7)\"></button>";
	document.getElementById("bakeryBotMid").innerHTML = "<button id=\"bakeryManager8\" class=\"bakeryStyle\" onclick=\"bakeryUnlight(8)\"></button>";
	document.getElementById("bakeryBotRight").innerHTML = "<button id=\"bakeryManager9\" class=\"bakeryStyle\" onclick=\"bakeryUnlight(9)\"></button>";
	if (localStorage.getItem("bakeryBought") == false) {
		cookieUpdate(-(bakeryCost), false);
	} else {
		cookieUpdate(0, false);
	}
	bakeryButton.remove();
	removeBR.remove();
	bakeryLightDelay();
}

//bakery button lighter and unlighter
function bakeryLightDelay() {
	lightDelayRunning = true;
	setTimeout(bakeryLight, bakerySpeed);
}

function bakeryLight() {
	lightDelayRunning = false;
	randomLight = Math.round(1 + (Math.random() * 8))
	document.getElementById("bakeryManager" + randomLight).setAttribute("class", "bakeryLit");
	buttonLit = true;
}

function bakeryUnlight(num) {
	if (buttonLit == true && num == randomLight) {
		document.getElementById("bakeryManager" + randomLight).setAttribute("class", "bakeryStyle");
		bakeryMulti *= 1.1;
		buttonLit = false;
		bakeryLightDelay();
	} else if (lightDelayRunning == false) {
		document.getElementById("bakeryManager" + randomLight).setAttribute("class", "bakeryStyle");
		bakeryMulti = 1;
		buttonLit = false;
		bakeryLightDelay();
	} else {
		bakeryMulti = 1;
	}
	textUpdater();
}

//bakery speed upgrade
function bakerySpeedAdd() {
	bakerySpeed /= 2;
	var bakerySpeedTemp = bakerySpeedFirst + Math.floor(bakerySpeedFirst * (2 * bakerySpeedCount));
	bakerySpeedCount += 1;
	bakerySpeedCost = bakerySpeedFirst + Math.floor(bakerySpeedFirst * (2 * bakerySpeedCount));
	document.getElementById("bakerySpeedCost").innerHTML = numConvert(bakerySpeedCost, false);
	cookieUpdate(-(bakerySpeedTemp), false);
	if (bakerySpeedCount >= 6) {
		bakerySpeedComplete = true;
		bakerySpeedButton.remove();
	}
}

//number converter
function numConvert(num, extra) {
	if (num == 0) {
		return (0);
	} else if (num < 1000 && extra == false) {
		return (Math.floor(num));
	} else if (num < 1000 && extra == true) {
		return (num.toFixed(2));
	}
	var power10 = (Math.round(Math.log(num) / Math.LN10 * 1000000) / 1000000);
	var power10ceiling = Math.floor(power10) + 1;
	var suffixes = ["", "k", "m", "b", "t", "qt", "qi", "sx", "sp", "oc", "no", "dc", "udc", "ddc", "tdc", "qtdc", "qidc", "sxdc", "spdc", "ocdc", "nodc", "vg", "uvg", "dvg", "tvg", "qtvg", "qivg", "sxvg", "spvg", "ocvg", "novg", "verybignumbers", "thelastnumber"];
	var suffixNum = Math.floor(power10 / 3);
	var suffix = suffixes[suffixNum];
	var suffixPower10 = Math.pow(10, suffixNum * 3);
	var base = num / suffixPower10;
	var baseRound = base.toFixed(2);
	return (baseRound + suffix);
}

//display text updater
function textUpdater() {
	document.getElementById("time").innerHTML = timeConvert(timeElapsed);
	document.getElementById("cookies").innerHTML = numConvert(cookies, false);
	if (bakeryBought == true) {
		document.getElementById("bakeryMultiText").innerHTML = numConvert(bakeryMulti, true);
	}
	document.getElementById("bakeCount").innerHTML = numConvert((upgrade + 1) * (multi) * (bakeryMulti), false);
	switch (true) {
		case (bestCookies < oneDisplay):
			document.getElementById("nextUpgrade").innerHTML = numConvert(oneDisplay, false);
			break;
		case (bestCookies < ovenDisplay):
			document.getElementById("nextUpgrade").innerHTML = numConvert(ovenDisplay, false);
			break;
		case (bestCookies < bakeryDisplay):
			document.getElementById("nextUpgrade").innerHTML = numConvert(bakeryDisplay, false);
			break;
		case (bestCookies < bakerySpeedDisplay):
		case (bakeryBought == false):
			document.getElementById("nextUpgrade").innerHTML = numConvert(bakerySpeedDisplay, false);
			document.getElementById("nextUpgradeExtra").innerHTML = "and bakery purchased";
			break;
		default:
			document.getElementById("nextText").innerHTML = "Game Complete! (for now...)";
	}
	if ((upgrade + 1) * (multi) * (bakeryMulti) > 1.9) {
		document.getElementById("cookieText").innerHTML = "Cookies per Second!";
	} else {
		document.getElementById("cookieText").innerHTML = "Cookie per Second!";
	}
}

//data handling
var variableList = ["cookies", "upgrade", "multi", "bestCookies", "timeElapsed", "timerID", "oneCount", "oneCost", "ovenCount", "ovenCost", "bakeryBought", "bakeryMulti", "bakerySpeed", "bakerySpeedComplete", "bakerySpeedCount", "bakerySpeedCost"];

//save function
function saveProgress() {
	for (var i = 0; i < variableList.length; i++) {
		localStorage.setItem(variableList[i], JSON.stringify(window[variableList[i]]));
	}
}

//load function
function loadProgress() {
	for (var i = 0; i < variableList.length; i++) {
		window[variableList[i]] = JSON.parse(localStorage.getItem(variableList[i]));
 	}
	if (bakeryBought == true) {
		bakeryAdd();
	}
	if (bakerySpeedCount >= 6 && bakerySpeedComplete == false) {
		bakerySpeedComplete = true;
		bakerySpeedButton.remove();
	}
	textUpdater();
}

//reset function
function resetProgress() {
	localStorage.clear();
	window.location.reload();
}

//loading progress if needed
function onOpen() {
	if (JSON.parse(localStorage.getItem(variableList[0])) > 1) {
		loadProgress();
	}
}

onOpen();
