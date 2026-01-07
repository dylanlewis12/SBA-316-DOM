document.addEventListener("DOMContentLoaded", () => {
// Cache elements
    let body = document.getElementById("documentBody");
    //let header = document.getElementById("header");
    let numberHeading = document.getElementById("numberHeading");
    let numberGuess = document.getElementById("numberGuess");
    let revealButton = document.getElementById("reveal");
    let resetButton = document.getElementById("reset");
    let checkButton = document.getElementById("check");
    let buttons = document.querySelectorAll("button");

// Cache header elements
    let remainingAttemptsEl = document.getElementById("item1");
    let attemptsEl = document.getElementById("item3");

// Game variables
    const min = 0;
    const max = 50;
    let attempts = 0;
    let remAttempts = 10;
    let secretNumber = Math.floor(Math.random() * (max + 1));

    console.log(secretNumber);

// Page styling
    body.style.fontFamily = "SuperPixel, sans-serif";
    body.style.backgroundColor = "#202121";
    body.style.color = "white";
    body.style.margin = "0";
    body.style.textAlign = "center";

    numberHeading.style.margin = "60px 0";

    buttons.forEach(button => {
        button.style.fontFamily = "SuperPixel, sans-serif";
        button.style.padding = "15px 30px";
        button.style.backgroundColor = "white";
        button.style.color = "black";
        button.style.margin = "10px";
        button.style.border = "3px solid black";
    });

// Hide reveal button
    if (revealButton) {
        revealButton.style.display = "none";
    }

// Create input wrapper for proper centering
    const inputWrapper = document.createElement("div");
    inputWrapper.style.display = "flex";
    inputWrapper.style.alignItems = "center";
    inputWrapper.style.justifyContent = "center";
    inputWrapper.style.width = "200px";
    inputWrapper.style.height = "200px";
    inputWrapper.style.border = "3px solid white";
    inputWrapper.style.boxSizing = "border-box";
    inputWrapper.style.margin = "0 auto 40px auto";
    inputWrapper.style.fontFamily = "SuperPixel, sans-serif";

//styling number guess input field
    numberGuess.style.width = "100%";
    numberGuess.style.height = "100%";
    numberGuess.style.textAlign = "center";
    numberGuess.style.fontFamily = "SuperPixel, sans-serif";
    numberGuess.style.boxSizing = "border-box";
    numberGuess.style.padding = "0";
    numberGuess.style.fontSize = "5rem";
    numberGuess.style.lineHeight = "1";
    numberGuess.style.border = "none";
    numberGuess.style.background = "transparent";
    numberGuess.style.color = "white";
    numberGuess.style.appearance = "none";
    numberGuess.style.webkitAppearance = "none";
    numberGuess.style.mozAppearance = "none";
    numberGuess.style.outline = "none";

// Add numberGues into the inputWrapper
    numberGuess.parentNode.insertBefore(inputWrapper, numberGuess);
    inputWrapper.appendChild(numberGuess);

//input validation event handler
    numberGuess.addEventListener("input", (e) => {
        let value = e.target.value;

        // Remove any non-digit characters
        value = value.replace(/[^0-9]/g, "");

        // If non-digit was removed, alert user
        if (value !== e.target.value) {
            alert("Only digits (0-9) are allowed!");
        }

        // Limit to 2 digits (0-50 is max)
        if (value.length > 2) {
            value = value.slice(0, 2);
            alert("Maximum 2 digits allowed!");
        }

        e.target.value = value;
    });

 //prevent non-numeric values from being inputted
    numberGuess.addEventListener("paste", (e) => {
        const pastedText = (e.clipboardData || window.clipboardData).getData("text");
        if (!/^\d+$/.test(pastedText)) {
            e.preventDefault();
            alert("Only numeric values can be pasted!");
        }
    });

//creating css styles
    const style = document.createElement("style");
    style.textContent = `
        .divider-line {
            background: white;
            height: 2px;
            width: 100vw;
            margin: 20px 0;
            margin-left: calc(-50vw + 50%);
        }

        #numberGuess {
            color: white !important;
        }

        #numberGuess:-webkit-autofill,
        #numberGuess:-webkit-autofill:hover,
        #numberGuess:-webkit-autofill:focus,
        #numberGuess:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px transparent inset !important;
            -webkit-text-fill-color: white !important;
        }

        .mystery-box {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 5rem;
            width: 200px;
            height: 200px;
            border: 4px solid white;
            margin: 40px auto 20px auto;
            box-sizing: border-box;
            color: black !important;
            background-color: white;
            font-family: SuperPixel, sans-serif;
            font-weight: normal;
            line-height: 1;
            text-align: center;
        }
    `;
    document.head.appendChild(style);

//number mystery box
    const mysteryBox = document.createElement("div");
    mysteryBox.innerHTML = "?";
    mysteryBox.className = "mystery-box";

    const fragment = document.createDocumentFragment();
    fragment.appendChild(mysteryBox);
    body.insertBefore(fragment, inputWrapper);

//horizontal divider line
    const dividerLine = document.createElement("div");
    dividerLine.className = "divider-line";

    body.insertBefore(dividerLine, inputWrapper);


    const buttonContainer = document.createElement("div");
    buttonContainer.style.margin = "40px 0";
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "center";
    buttonContainer.style.gap = "10px";
    buttonContainer.style.flexWrap = "wrap";

//move buttons into button container
    checkButton.parentNode.insertBefore(buttonContainer, checkButton);
    buttonContainer.appendChild(checkButton);
    if (revealButton) {
        buttonContainer.appendChild(revealButton);
    }
    buttonContainer.appendChild(resetButton);


    const newGameButton = document.createElement("button");
    newGameButton.textContent = "New Game";
    newGameButton.style.fontFamily = "SuperPixel, sans-serif";
    newGameButton.style.padding = "15px 30px";
    newGameButton.style.backgroundColor = "white";
    newGameButton.style.color = "black";
    newGameButton.style.margin = "10px";
    newGameButton.style.border = "3px solid black";
    newGameButton.style.position = "fixed";
    newGameButton.style.bottom = "20px";
    newGameButton.style.right = "20px";

    body.appendChild(newGameButton);

//mystery box animation
    function rotateMysteryBox() {
        mysteryBox.animate(
            [
                { transform: "rotate(0deg)" },
                { transform: "rotate(180deg)" },
                { transform: "rotate(360deg)" }
            ],
            { duration: 800, easing: "ease-in-out" }
        );
    }

//attempts display function
    function updateAttemptsDisplay() {
        if (attemptsEl) {
            attemptsEl.innerHTML = `Attempts: ${attempts}`;
            attemptsEl.style.display = "block";
            attemptsEl.style.visibility = "visible";
            attemptsEl.style.opacity = "1";
        }
        if (remainingAttemptsEl) {
            remainingAttemptsEl.innerHTML = `Remaining Attempts: ${remAttempts}`;
            remainingAttemptsEl.style.display = "block";
            remainingAttemptsEl.style.visibility = "visible";
            remainingAttemptsEl.style.opacity = "1";
        }
    }

    // Initialize attempts display on page load
    updateAttemptsDisplay();
    
//check button event listener
    checkButton.addEventListener("click", () => {
        // Check if game is over
        if (remAttempts <= 0 || checkButton.disabled) {
            alert("Game Over! Start a New Game");
            return;
        }

        const guess = Number(numberGuess.value);

        // Validation
        if (numberGuess.value === "") {
            alert("Please enter a number.");
            return;
        }

        if (guess < min || guess > max) {
            alert(`Number must be between ${min} and ${max}`);
            return;
        }

        // Valid attempt
        attempts++;
        remAttempts--;

        // Update attempts display with safeguards
        updateAttemptsDisplay();

        rotateMysteryBox();

        // Correct guess
        if (guess === secretNumber) {
            setTimeout(() => {
                mysteryBox.innerHTML = String(secretNumber);
                numberHeading.textContent = "🎉 You Win!";
                checkButton.disabled = true;
                updateAttemptsDisplay();
            }, 800);
            return;
        }

        // Check if game over before showing X
        if (remAttempts === 0) {
            setTimeout(() => {
                mysteryBox.innerHTML = String(secretNumber);
                numberHeading.textContent = "💀 Game Over";
                checkButton.disabled = true;
                updateAttemptsDisplay();
            }, 800);
        } else {
            // Incorrect guess but game continues
            setTimeout(() => {
                mysteryBox.innerHTML = "❌";
                updateAttemptsDisplay();
            }, 800);
        }
    });

    // =========================
    // Reset button - clears input field only
    // =========================
    resetButton.addEventListener("click", () => {
        numberGuess.value = "";
        numberGuess.focus();
    });

    // =========================
    // New Game button - resets everything
    // =========================
    newGameButton.addEventListener("click", () => {
        attempts = 0;
        remAttempts = 10;
        secretNumber = Math.floor(Math.random() * (max + 1));

        updateAttemptsDisplay();

        numberGuess.value = "";
        mysteryBox.innerHTML = "?";
        numberHeading.textContent = "Guess the number!";
        checkButton.disabled = false;

        numberGuess.focus();

        console.log(secretNumber);
    });
});