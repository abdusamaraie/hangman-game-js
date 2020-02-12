const wordElm = document.getElementById("word");
const wrongLettersElm = document.getElementById("wrong-letters");
const popupContainerElm = document.getElementById("popup-container");
const finalmsg = document.getElementById("final-msg");
const notificationContainerElm = document.getElementById(
  "notification-container"
);
const playAgainBtn = document.getElementById("play-btn");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizard"];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = ["w", "i", "z", "a", "r", "d"];
const wrongLetters = [];

function displayWord() {
  wordElm.innerHTML = `
  ${selectedWord
    .split("")
    .map(
      letter =>
        `
    <span class="letter"> 
    ${correctLetters.includes(letter) ? letter : ""} </span>`
    )
    .join("")}`;

  const innerWord = wordElm.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalmsg.innerText = "Congratulations! You won";
    popupContainerElm.style.display = "flex";
  }
}

//show wrong lettersp
function updateWrongLettersElm() {
  wrongLettersElm.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong:</p>" : ""}
  ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  //check if we lost
  if (wrongLetters.length === figureParts.length) {
    finalmsg.innerText = "Unfortunately, you lost!";
    popupContainerElm.style.display = "flex";
  }
}

// show notificaiton
function showNotification() {
  notificationContainerElm.classList.add("show");

  setTimeout(() => notificationContainerElm.classList.remove("show"), 2000);
}

playAgainBtn.addEventListener("click", () => {
  // clear wrong words and selected words
  wrongLetters.splice(0);
  correctLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();
  updateWrongLettersElm();

  popupContainerElm.style.display = "none";
});

// keydown listner
window.addEventListener("keydown", e => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersElm();
      } else {
        showNotification();
      }
    }
  }
});

displayWord();
