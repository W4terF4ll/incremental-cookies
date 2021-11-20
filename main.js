var cookies = 0;
var upgrade = 0;
var oneCost = 10;
var oneCount = 0;
var oneBought = false;
var oneCostNext = 11;
var timeElapsed = 0;
var timerID = -1;

function tick() {
    timeElapsed++
    document.getElementById("time").innerHTML = timeElapsed;
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


start();

function cookieUpdate(number, upgradeCalc) {
	if (upgradeCalc == true) {
		cookies = cookies + number + upgrade;
	} else {
		cookies = cookies + number
	}
	document.getElementById("cookies").innerHTML = cookies;
	if (cookies == 10 && oneBought == false) {
		document.getElementById("one").innerHTML = "<button id=\"oneButton\" onclick=\"cookieAdd()\">Bake More! (<span id=\"oneCost\">10</span> Cookies)</button>";
		oneBought = true;
	} else if (oneBought == true) {
		if (cookies >= oneCostNext) {
			oneButton.removeAttribute("disabled");
		} else {
			oneButton.setAttribute("disabled", "disabled");
		}
	}
	if (cookies >= 10000) {
		stop();
		document.getElementById("timer").innerHTML = "Congratulations! Your Time: <span id=\"time\">0</span>s";
		document.getElementById("time").innerHTML = timeElapsed;
	}
}

function cookieAdd() {
	oneCost = Math.floor(10 * Math.pow(1.1,oneCount));
	if (cookies >= oneCost) {
		upgrade += 1;
		cookieUpdate(-(oneCost), false);
		oneCount += 1;
		oneCostNext = Math.floor(10 * Math.pow(1.1,oneCount));
		document.getElementById("oneCost").innerHTML = oneCostNext;
	}
}
