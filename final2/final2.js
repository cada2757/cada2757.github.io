const morseBtn = document.getElementById("morse-btn");
const currentCodeEl = document.getElementById("current-code");
const phoneOutputEl = document.getElementById("phone-output");
const pressFeedbackEl = document.getElementById("press-feedback");
const wordBufferEl = document.getElementById("word-buffer");
const keyEl = document.getElementById("key");
const popupEl = document.getElementById("congrats-popup");

let pressStart = 0;
let currentCode = "";
let wordBuffer = [];
let phoneNumber = "";
let popupShown = false;

// Morse mappings (for letters)
const morseToLetter = {
  ".-": "a", "-...": "b", "-.-.": "c", "-..": "d", ".": "e",
  "..-.": "f", "--.": "g", "....": "h", "..": "i", ".---": "j",
  "-.-": "k", ".-..": "l", "--": "m", "-.": "n", "---": "o",
  ".--.": "p", "--.-": "q", ".-.": "r", "...": "s", "-": "t",
  "..-": "u", "...-": "v", ".--": "w", "-..-": "x", "-.--": "y",
  "--..": "z"
};

// Morse mapping (#)
const morseToNumber = {
  "-----": "0", ".----": "1", "..---": "2", "...--": "3", "....-": "4",
  ".....": "5", "-....": "6", "--...": "7", "---..": "8", "----.": "9"
};

const wordToDigit = {
  "zero": "0", "one": "1", "two": "2", "three": "3", "four": "4",
  "five": "5", "six": "6", "seven": "7", "eight": "8", "nine": "9"
};

function handlePressEnd(duration) {
  morseBtn.classList.remove("pressed");

  if (duration < 300) {
    currentCode += ".";
    currentCodeEl.textContent += "·";
    pressFeedbackEl.textContent = "Dot (·)";
  } else {
    currentCode += "-";
    currentCodeEl.textContent += "−";
    pressFeedbackEl.textContent = "Dash (−)";
  }
}

// Mousey
morseBtn.addEventListener("mousedown", () => {
  pressStart = Date.now();
  morseBtn.classList.add("pressed");
  pressFeedbackEl.textContent = "Holding...";
});
morseBtn.addEventListener("mouseup", () => {
  handlePressEnd(Date.now() - pressStart);
});

// Updates for mobile
morseBtn.addEventListener("touchstart", e => {
  e.preventDefault();
  pressStart = Date.now();
  morseBtn.classList.add("pressed");
  pressFeedbackEl.textContent = "Holding...";
});
morseBtn.addEventListener("touchend", e => {
  e.preventDefault();
  handlePressEnd(Date.now() - pressStart);
});

function submitLetter() {
  if (!currentCode) return;

  let letter = morseToLetter[currentCode];
  let number = morseToNumber[currentCode];

  if (letter) {
    wordBuffer.push(letter);
    updateWordBuffer();
  } else if (number) {
    if (phoneNumber.length < 10) {
      phoneNumber += number;
      phoneOutputEl.textContent = phoneNumber;
    }
  } else {
    alert("Invalid Morse code for letter or number.");
  }

  currentCode = "";
  currentCodeEl.textContent = "";
  pressFeedbackEl.textContent = "";
}

function submitWord() {
  const word = wordBuffer.join("").toLowerCase();

  if (word === "help") {
    keyEl.classList.remove("hidden");
  } else if (word === "subtract") {
    phoneNumber = phoneNumber.slice(0, -1);
    phoneOutputEl.textContent = phoneNumber;
  } else if (wordToDigit[word]) {
    if (phoneNumber.length < 10) {
      phoneNumber += wordToDigit[word];
      phoneOutputEl.textContent = phoneNumber;
    }
  } else {
    alert(`"${word}" is not a valid command or number word.`);
  }

  if (phoneNumber.length >= 10 && !popupShown) {
    popupEl.classList.remove("hidden");
    popupShown = true;
  }

  wordBuffer = [];
  updateWordBuffer();
}

function updateWordBuffer() {
  wordBufferEl.textContent = wordBuffer.join("");
  const deleteBtn = document.getElementById("delete-buffer-btn");
  deleteBtn.disabled = wordBuffer.length === 0;
}

function deleteLast() {
  phoneNumber = phoneNumber.slice(0, -1);
  phoneOutputEl.textContent = phoneNumber;
}

function deleteLastSymbol() {
  currentCode = currentCode.slice(0, -1);
  currentCodeEl.textContent = currentCodeEl.textContent.slice(0, -1);
}

function deleteLastLetterInBuffer() {
  if (wordBuffer.length > 0) {
    wordBuffer.pop();
    updateWordBuffer();
  }
}

function resetAll() {
  if (confirm("Clicking this button will get rid of all your numbers, are you sure?")) {
    const cheatSheetWasOpen = !keyEl.classList.contains("hidden");

    currentCode = "";
    wordBuffer = [];
    phoneNumber = "";
    currentCodeEl.textContent = "";
    phoneOutputEl.textContent = "";
    wordBufferEl.textContent = "";
    pressFeedbackEl.textContent = "";
    popupEl.classList.add("hidden");
    popupShown = false;

    if (!cheatSheetWasOpen) {
      keyEl.classList.add("hidden");
    }
  }
}
