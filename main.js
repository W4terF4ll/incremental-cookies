var cookies = 0;
var upgrade = 0;
var oneCost = 10;
var oneCount = 0;
var oneBought = false;
var oneCostNext = 0;

function cookieClick(number){
    cookies = cookies + number + upgrade;
	document.getElementById("cookies").innerHTML = cookies;
	if (cookies == 10 && oneBought == false) {
		document.getElementById("one").innerHTML = "<button onclick=\"cookieAdd()\">Bake More! (<span id=\"oneCost\">10</span> Cookies)</button>";
		oneBought = true;
	}
}

function cookieAdd(){
	oneCost = Math.floor(10 * Math.pow(1.1,oneCount));
	if (cookies >= oneCost){
		upgrade += 1;
		cookies -= oneCost;
		document.getElementById("cookies").innerHTML = cookies;
		oneCount += 1;
		oneCostNext = Math.floor(10 * Math.pow(1.1,oneCount));
		document.getElementById("oneCost").innerHTML = oneCostNext;
	}
}