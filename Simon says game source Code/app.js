let sequenceArray = []; // Array to store the sequence of the pattern muahaha
let playerSequence = []; // Array to store player's input shtuff
let score = 0; // Current score
let highScore = 0; // Highest score for goats like me 
let timeoutHandle; // Variable to store the timeout handle

function startGame() {
    const startLight = document.getElementById("startLight"); 
    startLight.style.backgroundColor = "rgb(67, 227, 67)"; // Change start light to green
    setTimeout(sequence, 3000); // Start sequence func after 3 seconds
}

function sequence() {
    const circles = document.querySelectorAll('.circles');
    const randomIndex = Math.floor(Math.random() * circles.length);
    const randomCircle = circles[randomIndex];
    sequenceArray.push(randomCircle.id); 
    

    sequenceArray.forEach((circleId, index) => {
        setTimeout(() => {
            const circle = document.getElementById(circleId);
            circle.classList.add('active');
            setTimeout(() => {
                circle.classList.remove('active');
            }, 800);
        }, index * 1500); 
    });
}

function userInput(circleId) {
    clearTimeout(timeoutHandle); 
    playerSequence.push(circleId); 
    checkInput(); 
}

function checkInput() {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== sequenceArray[i]) {
            endGame(); 
            return;
        }
    }

    if (playerSequence.length === sequenceArray.length) {
        score++; 
        document.getElementById("scoreDisplay").innerText = `Score: ${score}`;
        if (score > highScore) {
            highScore = score; 
            document.getElementById("highScoreDisplay").innerText = `High Score: ${highScore}`;
        }
        playerSequence = []; 
        setTimeout(sequence, 1000); 
    } else {

        timeoutHandle = setTimeout(() => {
            endGame();
        }, 5000); 
    }
}

function endGame() {
    const startLight = document.getElementById("startLight"); 
    startLight.style.backgroundColor = "red"; 
    sequenceArray = []; 
    playerSequence = []; 
    score = 0; 
    document.getElementById("scoreDisplay").innerText = `Score: ${score}`;

    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            flashAllButtons();
        }, i * 1000); 
    }
}

function flashAllButtons() {
    const circles = document.querySelectorAll('.circles');
    circles.forEach(circle => {
        circle.classList.add('active');
    });
    setTimeout(() => {
        circles.forEach(circle => {
            circle.classList.remove('active');
        });
    }, 200); 
}