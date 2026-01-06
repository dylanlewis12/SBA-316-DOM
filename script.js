//caching h3 heading to variable
let numberHeading = document.getElementById("numberHeading");

let body = document.getElementById("documentBody");

//setting font color

//setting font style
body.style.fontFamily = "SuperPixel, sans-serif";
body.style.color = "white";
body.style.backgroundColor = "#202121";

//You win alert

numberHeading.style.textAlign = "center";
numberHeading.style.marginTop = "80px";
numberHeading.style.marginBottom = "80px";

let resetButton = document.getElementById("reset");

let revealButton = document.getElementById("reveal");

//setting reveal button font
revealButton.style.fontFamily = "SuperPixel, sans-serif";
revealButton.style.padding = "15px 30px";

//setting reset button font
resetButton.style.fontFamily = "SuperPixel, sans-serif";
resetButton.style.padding = "15px 30px";

resetButton.style.backgroundColor = "white";
resetButton.style.color = "black";
revealButton.style.backgroundColor = "white";
revealButton.style.color = "black";

//navbar styling
let header = document.getElementById("header");
header.style.listStyleType = "none"; 
header.style.display = "flex";
header.style.justifyContent = "space-around";
header.style.margin = 0;
header.style.padding = 0;

//number guess box styling
let numberGuess = document.getElementById("numberGuess");
numberGuess.style.width = "250px";
numberGuess.style.height = "250px";
numberGuess.style.alignItems = "center";
numberGuess.style.fontFamily = "SuperPixel, sans-serif";
numberGuess.style.textAlign = "center";
numberGuess.style.color = "black";
numberGuess.style.fontSize = "10rem";

numberGuess.addEventListener("click", function() {
    // Example: Place the cursor at the start of the input field
    numberGuess.setSelectionRange(0, 0); // Place the cursor at the start

    // Example: Place the cursor at the end of the input field
    // numberGuess.setSelectionRange(numberGuess.value.length, numberGuess.value.length); // Uncomment to place cursor at the end
});