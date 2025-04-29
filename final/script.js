const gameContainer = document.getElementById("game-container");
const bird = document.getElementById("bird");
const phoneDisplay = document.getElementById("phone-display");

let birdTop = 250;
let birdLeft = 50;
let gravity = 3;
let gameSpeed = 2;
let isGameOver = false;
const gapHeight = 150;
const pipeWidth = 60;
const pipeFrequency = 1500;
let pipeCount = 0;
let phoneDigits = [];
let pipeIntervalId = null;

bird.style.top = birdTop + "px";
bird.style.left = birdLeft + "px";

function updatePhoneDisplay() {
    const formattedNumber = formatPhoneNumber(phoneDigits.join(""));
    phoneDisplay.textContent = "Phone: " + formattedNumber;
}

function formatPhoneNumber(number) {
    const part1 = number.slice(0, 3);
    const part2 = number.slice(3, 6);
    const part3 = number.slice(6, 10);
    if (number.length <= 3) {
        return `(${part1}`;
    } else if (number.length <= 6) {
        return `(${part1}) ${part2}`;
    } else {
        return `(${part1}) ${part2}-${part3}`;
    }
}

function jump() {
    if (!isGameOver) {
        birdTop -= 50;
        if (birdTop < 0) birdTop = 0;
        bird.style.top = birdTop + "px";
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === " " || e.keyCode === 32 || e.code === "ArrowUp") {
        jump();
    }
});
document.addEventListener("click", jump);

function createPipePair() {
    const maxPipeHeight = 350;
    const minPipeHeight = 100;
    const topHeight = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight)) + minPipeHeight;
    const bottomHeight = 600 - topHeight - gapHeight;

    const pipePair = document.createElement("div");
    pipePair.classList.add("pipe-pair");
    pipePair.style.position = "absolute";
    pipePair.style.left = "400px";
    pipePair.dataset.passed = "false";

    const topPipe = document.createElement("div");
    topPipe.classList.add("pipe");
    topPipe.style.height = topHeight + "px";
    topPipe.style.top = "0px";

    const bottomPipe = document.createElement("div");
    bottomPipe.classList.add("pipe");
    bottomPipe.style.height = bottomHeight + "px";
    bottomPipe.style.top = (topHeight + gapHeight) + "px";

    pipePair.appendChild(topPipe);
    pipePair.appendChild(bottomPipe);
    gameContainer.appendChild(pipePair);
}

function movePipes() {
    const pipePairs = document.querySelectorAll(".pipe-pair");
    pipePairs.forEach(pair => {
        const pairLeft = parseInt(pair.style.left);
        if (pairLeft + pipeWidth <= 0) {
            pair.remove();
            return;
        }
        pair.style.left = (pairLeft - gameSpeed) + "px";

        const pipes = pair.querySelectorAll(".pipe");
        const birdRect = bird.getBoundingClientRect();

        pipes.forEach(pipe => {
            const pipeRect = pipe.getBoundingClientRect();
            if (
                birdRect.right > pipeRect.left &&
                birdRect.left < pipeRect.right &&
                birdRect.bottom > pipeRect.top &&
                birdRect.top < pipeRect.bottom
            ) {
                handleDigitEnd();
            }
        });

        if (pair.dataset.passed === "false" && pairLeft + pipeWidth < birdLeft) {
            pair.dataset.passed = "true";
            pipeCount++;
        }
    });
}

function handleDigitEnd() {
    isGameOver = true;
    const digit = pipeCount;
    const confirmDigit = confirm(`You passed ${digit} pipes. Is that the correct digit?`);

    if (confirmDigit) {
        phoneDigits.push(digit);
        updatePhoneDisplay();
        pipeCount = 0;

        if (phoneDigits.length === 10) {
            confirmPhoneNumber();
        } else {
            startNextDigit();
        }
    } else {
        pipeCount = 0;
        startNextDigit();
    }
}

function confirmPhoneNumber() {
    const formatted = formatPhoneNumber(phoneDigits.join(""));
    const confirmNumber = confirm(`Is this your phone number?\n${formatted}`);
    if (confirmNumber) {
        phoneDisplay.textContent = "Great!";
        clearInterval(pipeIntervalId);
    } else {
        restartGame();
    }
}

function restartGame() {
    phoneDigits = [];
    updatePhoneDisplay();
    birdTop = 250;
    bird.style.top = birdTop + "px";
    isGameOver = false;
    clearPipes();
    pipeCount = 0;

    if (pipeIntervalId) clearInterval(pipeIntervalId);

    startNextDigit();
}

function startNextDigit() {
    birdTop = 250;
    bird.style.top = birdTop + "px";
    isGameOver = false;
    clearPipes();
    pipeCount = 0;

    if (pipeIntervalId) clearInterval(pipeIntervalId);

    setTimeout(() => {
        createPipePair();
        startPipeSpawning();
    }, 500);
}

function clearPipes() {
    const pipes = document.querySelectorAll(".pipe-pair");
    pipes.forEach(pipe => pipe.remove());
}

function startPipeSpawning() {
    if (pipeIntervalId) clearInterval(pipeIntervalId);
    pipeIntervalId = setInterval(() => {
        if (!isGameOver) {
            createPipePair();
        }
    }, pipeFrequency);
}

function gameLoop() {
    if (!isGameOver) {
        birdTop += gravity;
        bird.style.top = birdTop + "px";

        if (birdTop <= 0 || birdTop + 40 >= 600) {
            handleDigitEnd();
        }

        movePipes();
        requestAnimationFrame(gameLoop);
    }
}

startPipeSpawning();
updatePhoneDisplay();
gameLoop();
