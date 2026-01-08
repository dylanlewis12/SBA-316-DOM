document.addEventListener("DOMContentLoaded", () => {
    let body = document.getElementById("documentBody");
    
    let bodyEl = document.querySelector("body#documentBody");

    // Game variables
    const min = 0;
    const max = 50;
    let attempts = 0;
    let remAttempts = 10;
    let secretNumber = Math.floor(Math.random() * (max + 1));

    console.log("Secret number:", secretNumber);

    // Create CSS styles
    const style = document.createElement("style");
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;700&display=swap');
        
        body {
            font-family: 'Pixelify Sans', monospace;
            background-color: #202121;
            color: white;
            margin: 0;
            text-align: center;
        }

        #header {
            display: flex;
            justify-content: space-around;
            padding: 20px;
            margin: 0;
            width: 100%;
            background-color: #202121;
            color: white;
            font-family: 'Pixelify Sans', monospace;
            font-size: 1.3rem;
        }

        #header-item1 {
            flex: 1;
            text-align: left;
            min-width: 200px;
        }

        #header-item2 {
            flex: 1;
            text-align: center;
            min-width: 200px;
        }

        #header-item3 {
            flex: 1;
            text-align: right;
            min-width: 200px;
        }

        .divider-line {
            background: white;
            height: 2px;
            width: 100vw;
            margin: 20px calc(-50vw + 50%);
            position: relative;
            left: calc(-50vw + 50%);
        }

        #numberGuess {
            color: white !important;
            caret-color: white !important;
            font-family: 'Pixelify Sans', monospace !important;
            font-size: 3.6rem !important;
            letter-spacing: 0.2em !important;
        }

        #numberGuess::placeholder {
            color: rgba(255, 255, 255, 0.5);
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
            font-size: 3.6rem;
            width: 200px;
            height: 200px;
            border: 4px solid white;
            margin: 40px auto 20px auto;
            box-sizing: border-box;
            background-color: white;
            font-family: 'Pixelify Sans', monospace;
            font-weight: normal;
            line-height: 1;
            text-align: center;
            color: black;
            letter-spacing: 0.2em;
        }

        button {
            font-family: 'Pixelify Sans', monospace;
            padding: 15px 30px;
            background-color: white;
            color: black;
            margin: 10px;
            border: 3px solid black;
            cursor: pointer;
        }

        button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(style);

    // Create header with attempts using DocumentFragment (meets DocumentFragment requirement)
    const header = document.createElement("div");
    header.id = "header";

    // Create header items using DocumentFragment for efficient DOM insertion
    const headerFragment = document.createDocumentFragment();
    
    const item1 = document.createElement("div");
    item1.id = "header-item1";
    item1.textContent = `Remaining Attempts: 10`;
    headerFragment.appendChild(item1);

    const item2 = document.createElement("div");
    item2.id = "header-item2";
    item2.textContent = "Between 0 and 50";
    headerFragment.appendChild(item2);

    const item3 = document.createElement("div");
    item3.id = "header-item3";
    item3.textContent = `Attempts: 0`;
    headerFragment.appendChild(item3);

    // Add all header items at once using the fragment
    header.appendChild(headerFragment);
    body.appendChild(header);

    // Create heading
    const numberHeading = document.createElement("h1");
    numberHeading.id = "numberHeading";
    numberHeading.textContent = "Guess the number!";
    numberHeading.style.margin = "60px 0";
    numberHeading.style.fontFamily = "'Pixelify Sans', monospace";
    numberHeading.style.color = "white";
    numberHeading.style.fontSize = "2.5rem";
    body.appendChild(numberHeading);

    // Create mystery box
    const mysteryBox = document.createElement("div");
    mysteryBox.className = "mystery-box";
    mysteryBox.textContent = "?";
    body.appendChild(mysteryBox);

    // Create horizontal divider line
    const dividerLine = document.createElement("div");
    dividerLine.className = "divider-line";
    body.appendChild(dividerLine);

    // Create input wrapper
    const inputWrapper = document.createElement("div");
    inputWrapper.style.display = "flex";
    inputWrapper.style.alignItems = "center";
    inputWrapper.style.justifyContent = "center";
    inputWrapper.style.width = "200px";
    inputWrapper.style.height = "200px";
    inputWrapper.style.border = "3px solid white";
    inputWrapper.style.boxSizing = "border-box";
    inputWrapper.style.margin = "0 auto 40px auto";
    inputWrapper.style.fontFamily = "'Pixelify Sans', monospace";
    inputWrapper.style.backgroundColor = "#202121";

    // numberGuess bpx
    const numberGuess = document.createElement("input");
    numberGuess.id = "numberGuess";
    numberGuess.type = "text";
    numberGuess.inputMode = "numeric";
    numberGuess.autoComplete = "off";
    numberGuess.required = true;
    numberGuess.pattern = "[0-9]{1,2}";
    numberGuess.placeholder = "0-50";
    numberGuess.setAttribute("data-min", "0");
    numberGuess.setAttribute("data-max", "50");

    numberGuess.style.width = "100%";
    numberGuess.style.height = "100%";
    numberGuess.style.textAlign = "center";
    numberGuess.style.fontFamily = "'Pixelify Sans', monospace";
    numberGuess.style.fontSize = "4xrem";
    numberGuess.style.border = "none";
    numberGuess.style.background = "transparent";
    numberGuess.style.color = "white";
    numberGuess.style.outline = "none";
    numberGuess.style.caretColor = "white";
    numberGuess.style.letterSpacing = "0.2em";

    inputWrapper.appendChild(numberGuess);
    body.appendChild(inputWrapper);

    // Create guesses list container positioned in TOP LEFT
    const guessesContainer = document.createElement("div");
    guessesContainer.style.position = "absolute";
    guessesContainer.style.top = "180px";
    guessesContainer.style.left = "20px";
    guessesContainer.style.width = "300px";
    guessesContainer.style.maxHeight = "400px";
    guessesContainer.style.overflowY = "auto";
    guessesContainer.style.padding = "20px";
    guessesContainer.style.backgroundColor = "#1a1a1a";
    guessesContainer.style.border = "2px solid white";
    guessesContainer.style.borderRadius = "5px";
    guessesContainer.style.zIndex = "100";

    const guessesLabel = document.createElement("h3");
    guessesLabel.textContent = "Your Guesses:";
    guessesLabel.style.color = "white";
    guessesLabel.style.margin = "0 0 15px 0";
    guessesLabel.style.fontFamily = "'Pixelify Sans', monospace";
    guessesLabel.style.fontSize = "1.3rem";
    guessesContainer.appendChild(guessesLabel);

    const guessesList = document.createElement("ol");
    guessesList.style.color = "white";
    guessesList.style.fontFamily = "'Pixelify Sans', monospace";
    guessesList.style.paddingLeft = "20px";
    guessesList.style.margin = "0";
    guessesList.style.fontSize = "1.1rem";
    guessesContainer.appendChild(guessesList);

    body.appendChild(guessesContainer);

    // Array of objects to track guesses with feedback
    let guessHistory = [];

    body.style.marginLeft = "0";

    // Input validation event handler
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

    // Prevent non-numeric values from being pasted
    numberGuess.addEventListener("paste", (e) => {
        const pastedText = (e.clipboardData || window.clipboardData).getData("text");
        if (!/^\d+$/.test(pastedText)) {
            e.preventDefault();
            alert("Only numeric values can be pasted!");
        }
    });

    // Create button container
    const buttonContainer = document.createElement("div");
    buttonContainer.style.margin = "40px 0";
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "center";
    buttonContainer.style.gap = "10px";
    buttonContainer.style.flexWrap = "wrap";

    // Create Check Guess button
    const checkButton = document.createElement("button");
    checkButton.id = "check";
    checkButton.textContent = "Check Guess";
    checkButton.fontSize = "20px";

    // Create Hint button
    const hintButton = document.createElement("button");
    hintButton.id = "hint";
    hintButton.textContent = "Hint";
    hintButton.fontSize = "20px";

    // Create Reset button
    const resetButton = document.createElement("button");
    resetButton.id = "reset";
    resetButton.textContent = "Reset";
    resetButton.fontSize = "20px";

    buttonContainer.appendChild(checkButton);
    buttonContainer.appendChild(hintButton);
    buttonContainer.appendChild(resetButton);
    body.appendChild(buttonContainer);

    // Create New Game button
    const newGameButton = document.createElement("button");
    newGameButton.textContent = "New Game";
    newGameButton.style.position = "fixed";
    newGameButton.style.bottom = "20px";
    newGameButton.style.right = "20px";
    newGameButton.style.fontSize = "20px";

    body.appendChild(newGameButton);

    // Applying for buttons using a loop
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach(button => {
        //button.style.fontFamily = "'Pixelify Sans', monospace";
        button.style.padding = "15px 30px";
        button.style.backgroundColor = "white";
        button.style.color = "black";
        button.style.margin = "10px";
        button.style.border = "3px solid black";
        button.style.cursor = "pointer";
        button.style.fontSize = "20px";
    });

    // Mystery box animation
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

    // Update attempts display function
    function updateAttemptsDisplay() {
        item1.textContent = `Remaining Attempts: ${remAttempts}`;
        item3.textContent = `Attempts: ${attempts}`;
    }

    // Track reset timeout for incorrect guesses
    let resetTimeout;

    // Check button event listener
    checkButton.addEventListener("click", () => {
        // Check if game is over
        if (checkButton.disabled) {
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

        // Clear any pending reset timeout
        if (resetTimeout) {
            clearTimeout(resetTimeout);
        }

        // Reset mystery box to "?" before spinning
        mysteryBox.textContent = "?";
        mysteryBox.style.color = "black";

        // Increment/decrement attempts
        attempts++;
        remAttempts--;

        // Update attempts display
        updateAttemptsDisplay();

        rotateMysteryBox();

        // Correct guess
        if (guess === secretNumber) {
            // Add correct guess to history
            guessHistory.push({ guess: guess, feedback: "✅ CORRECT!" });
            const listItem = document.createElement("li");
            listItem.textContent = `${guess} - ✅ CORRECT!`;
            listItem.style.marginBottom = "8px";
            listItem.style.color = "#00ff00";
            guessesList.appendChild(listItem);

            setTimeout(() => {
                mysteryBox.textContent = String(secretNumber);
                mysteryBox.style.color = "black";
                numberHeading.textContent = "🎉 You Win!";
                checkButton.disabled = true;
                hintButton.disabled = true;
                updateAttemptsDisplay();
            }, 800);
            return;
        }

        // Check if game over before showing X
        if (remAttempts === 0) {
            // Add final incorrect guess to history
            if (guess > secretNumber) {
                guessHistory.push({ guess: guess, feedback: "❌ TOO HIGH" });
                const listItem = document.createElement("li");
                listItem.textContent = `${guess} - ❌ TOO HIGH`;
                listItem.style.marginBottom = "8px";
                listItem.style.color = "#ff6b6b";
                guessesList.appendChild(listItem);
            } else if (guess < secretNumber) {
                guessHistory.push({ guess: guess, feedback: "❌ TOO LOW" });
                const listItem = document.createElement("li");
                listItem.textContent = `${attempts}. ${guess} - ❌ TOO LOW`;
                listItem.style.marginBottom = "8px";
                listItem.style.color = "#ff6b6b";
                guessesList.appendChild(listItem);
            }

            setTimeout(() => {
                mysteryBox.textContent = String(secretNumber);
                mysteryBox.style.color = "black";
                numberHeading.textContent = "💀 Game Over";
                checkButton.disabled = true;
                hintButton.disabled = true;
                updateAttemptsDisplay();
            }, 800);
        } else {
            // Incorrect guess but game continues
            // Add incorrect guess to history
            if (guess > secretNumber) {
                guessHistory.push({ guess: guess, feedback: "❌ TOO HIGH" });
                const listItem = document.createElement("li");
                listItem.textContent = `${guess} - ❌ TOO HIGH`;
                listItem.style.marginBottom = "8px";
                listItem.style.color = "#ff6b6b";
                guessesList.appendChild(listItem);
            } else if (guess < secretNumber) {
                guessHistory.push({ guess: guess, feedback: "❌ TOO LOW" });
                const listItem = document.createElement("li");
                listItem.textContent = `${guess} - ❌ TOO LOW`;
                listItem.style.marginBottom = "8px";
                listItem.style.color = "#ff6b6b";
                guessesList.appendChild(listItem);
            }
            setTimeout(() => {
                mysteryBox.textContent = "❌";
                mysteryBox.style.color = "red";
                updateAttemptsDisplay();

                // Reset to "?" after 2 seconds
                resetTimeout = setTimeout(() => {
                    mysteryBox.textContent = "?";
                    mysteryBox.style.color = "black";
                }, 2000);
            }, 800);
        }
    });

    // Reset button - clears input field only
    resetButton.addEventListener("click", () => {
        numberGuess.value = "";
        numberGuess.focus();
    });

    // Hint button - provides hint about the number
    hintButton.addEventListener("click", () => {
        console.log("Hint button clicked!");
        console.log("Secret number:", secretNumber);
        console.log("Input value:", numberGuess.value);
        
        // Check if game is over
        if (checkButton.disabled) {
            alert("Game Over! Start a New Game to get a hint.");
            return;
        }

        // Check if input is empty
        if (numberGuess.value === "") {
            alert("Please enter a number first to get a hint!");
            return;
        }

        const guess = Number(numberGuess.value);
        console.log("Guess:", guess);

        // Provide hint based on guess
        if (guess > secretNumber) {
            alert(`💡 Hint: Your guess is TOO HIGH. Try a lower number!`);
        } else if (guess < secretNumber) {
            alert(`💡 Hint: Your guess is TOO LOW. Try a higher number!`);
        } else {
            alert(`💡 Hint: Your guess is CORRECT! Click Check Guess to win!`);
        }
    });

    // New Game button - resets everything
    newGameButton.addEventListener("click", () => {
        attempts = 0;
        remAttempts = 10;
        secretNumber = Math.floor(Math.random() * (max + 1));

        updateAttemptsDisplay();

        numberGuess.value = "";
        mysteryBox.textContent = "?";
        mysteryBox.style.color = "black";
        numberHeading.textContent = "Guess the number!";
        checkButton.disabled = false;
        hintButton.disabled = false;

        // Clear guesses list
        guessHistory = [];
        guessesList.innerHTML = "";

        numberGuess.focus();

        console.log("New secret number:", secretNumber);
    });
});