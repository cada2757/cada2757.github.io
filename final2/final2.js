const morseBtn = document.getElementById("morse-btn");
const currentCodeEl = document.getElementById("current-code");
const phoneOutputEl = document.getElementById("phone-output");
const pressFeedbackEl = document.getElementById("press-feedback");

let pressStart = 0;
let currentCode = "";
let phoneNumber = "";

const morseToNumber = {
  "-----": "0",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9"
};

morseBtn.addEventListener("mousedown", () => {
  pressStart = Date.now();
  morseBtn.classList.add("pressed");
  pressFeedbackEl.textContent = "Holding...";
});

morseBtn.addEventListener("mouseup", () => {
  const duration = Date.now() - pressStart;
  morseBtn.classList.remove("pressed");

  if (duration < 1000) {
    currentCode += ".";
    currentCodeEl.textContent += "·";
    pressFeedbackEl.textContent = "Dot (·)";
  } else {
    currentCode += "-";
    currentCodeEl.textContent += "−";
    pressFeedbackEl.textContent = "Dash (−)";
  }
});

function addNumber() {
  if (morseToNumber[currentCode]) {
    phoneNumber += morseToNumber[currentCode];
    phoneOutputEl.textContent = phoneNumber;
    currentCode = "";
    currentCodeEl.textContent = "";
    pressFeedbackEl.textContent = "";
  } else {
    alert("Invalid Morse code. Please try again.");
  }
}

function deleteLast() {
  phoneNumber = phoneNumber.slice(0, -1);
  phoneOutputEl.textContent = phoneNumber;
}

function resetAll() {
  currentCode = "";
  phoneNumber = "";
  currentCodeEl.textContent = "";
  phoneOutputEl.textContent = "";
  pressFeedbackEl.textContent = "";
}
