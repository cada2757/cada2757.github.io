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

const morseToLetter = {
  ".-": "a", "-...": "b", "-.-.": "c", "-..": "d", ".": "e",
  "..-.": "f", "--.": "g", "....": "h", "..": "i", ".---": "j",
  "-.-": "k", ".-..": "l", "--": "m", "-.": "n", "---": "o",
  ".--.": "p", "--.-": "q", ".-.": "r", "...": "s", "-": "t",
  "..-": "u", "...-": "v", ".--": "w", "-..-": "x", "-.--": "y",
  "--..": "z"
};

const wordToDigit = {
  "zero": "0", "one": "1", "two": "2", "three": "3", "four": "4",
  "five": "5", "six": "6", "seven": "7", "eight": "8", "nine": "9"
};

morseBtn.addEventListener("mousedown", () => {
  pressStart = Date.now();
  morseBtn.classList.add("pressed");
  pressFeedbackEl.textContent = "Holding...";
});

morseBtn.addEventListener("mouseup", () => {
  const duration = Date.now() - pressStart;
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
});

function submitLetter() {
  if (!currentCode) return;

  const letter = morseToLetter[currentCode];
  if (letter) {
    wordBuffer.push(letter);
    updateWordBuffer();
  } else {
    alert("Invalid Morse code for letter.");
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
    phoneNumber += wordToDigit[word];
    phoneOutputEl.textContent = phoneNumber;
  } else {
    alert(`"${word}" is not a valid command or number word.`);
  }

  if (phoneNumber.length >= 10) {
    popupEl.classList.remove("hidden");
  }

  wordBuffer = [];
  updateWordBuffer();
}

function updateWordBuffer() {
  wordBufferEl.textContent = wordBuffer.join("");
}

function deleteLast() {
  phoneNumber = phoneNumber.slice(0, -1);
  phoneOutputEl.textContent = phoneNumber;
}

function deleteLastSymbol() {
  currentCode = currentCode.slice(0, -1);
  currentCodeEl.textContent = currentCodeEl.textContent.slice(0, -1);
}

function resetAll() {
  currentCode = "";
  wordBuffer = [];
  phoneNumber = "";
  currentCodeEl.textContent = "";
  phoneOutputEl.textContent = "";
  wordBufferEl.textContent = "";
  pressFeedbackEl.textContent = "";
  keyEl.classList.add("hidden");
  popupEl.classList.add("hidden");
}
