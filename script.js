document.addEventListener("DOMContentLoaded", () => {
//cache elements
    const body = document.getElementById("documentBody");
    const header = document.getElementById("header");
    const numberHeading = document.getElementById("numberHeading");
    const numberGuessInput = document.getElementById("numberGuess");
    const revealButton = document.getElementById("reveal");
    const resetButton = document.getElementById("reset");
    const buttons = document.querySelectorAll("button");

    /* =========================
       GAME STATE
    ========================== */
    const MIN = 0;
    const MAX = 50;
    let attempts = 0;
    let availableAttempts = 0;
    let secretNumber = Math.floor(Math.random() * (MAX + 1));

    /* =========================
       PAGE STYLING (JS ONLY)
    ========================== */
    body.style.fontFamily = "SuperPixel, sans-serif";
    body.style.backgroundColor = "#202121";
    body.style.color = "white";
    body.style.margin = "0";
    body.style.textAlign = "center";

    header.style.listStyle = "none";
    header.style.display = "flex";
    header.style.justifyContent = "space-around";
    header.style.padding = "20px";

    numberHeading.style.margin = "60px 0";

//edit button styling
    buttons.forEach(button => {
        button.style.fontFamily = "SuperPixel, sans-serif";
        button.style.padding = "15px 30px";
        button.style.backgroundColor = "white";
        button.style.color = "black";
        button.style.margin = "10px";
        button.style.border = "3px solid black";
    });

 //number input field styling
    numberGuessInput.style.width = "160px";
    numberGuessInput.style.height = "160px";
    numberGuessInput.style.fontSize = "8rem";
    numberGuessInput.style.textAlign = "center";
    numberGuessInput.style.fontFamily = "SuperPixel, sans-serif";
    numberGuessInput.style.marginBottom = "40px";

//creating mystery box element
    const mysteryBox = document.createElement("p");
    mysteryBox.textContent = "?";
    mysteryBox.style.fontSize = "6rem";
    mysteryBox.style.border = "4px solid white";
    mysteryBox.style.width = "120px";
    mysteryBox.style.margin = "40px auto";
    mysteryBox.style.padding = "20px";

    /* =========================
       DocumentFragment ✅
    ========================== */
    const fragment = document.createDocumentFragment();
    fragment.appendChild(mysteryBox);
    body.insertBefore(fragment, numberGuessInput);

    /* =========================
       DOM NAVIGATION (parent/child) ✅
    ========================== */
    let firstHeaderItem = header.firstElementChild;
    firstHeaderItem.style.color = "white";

   
//mystery box animation
    function rotateMysteryBox() {
        mysteryBox.animate(
            [
                { transform: "rotate(0deg)" },
                { transform: "rotate(180deg)" },
                { transform: "rotate(360deg)" }
            ],
            {
                duration: 800,
                easing: "ease-in-out"
            }
        );
    }

//input cursor control
    numberGuessInput.addEventListener("focus", () => {
        numberGuessInput.setSelectionRange(0, 0);
    });

//reveal button event
    revealButton.addEventListener("click", () => {
        const guess = Number(numberGuessInput.value);

        // DOM-based validation ✅
        if (numberGuessInput.value === "") {
            alert("Please enter a number.");
            return;
        }

        if (guess < MIN || guess > MAX) {
            alert(`Number must be between ${MIN} and ${MAX}`);
            return;
        }

        rotateMysteryBox();

        setTimeout(() => {
            mysteryBox.textContent = secretNumber;
        }, 800);
    });

//reset button event
    resetButton.addEventListener("click", () => {
        numberGuessInput.value = "";
        mysteryBox.textContent = "?";
        secretNumber = Math.floor(Math.random() * (MAX + 1));
    });

});
