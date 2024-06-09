let section1 = document.getElementsByClassName("section1");
let section2 = document.getElementsByClassName("section2");
let section3 = document.getElementsByClassName("section3");
let section4 = document.getElementsByClassName("section4");
let section5 = document.getElementsByClassName("section5");

let wordlebox = document.getElementsByClassName("wordlebox");
gameStart();

const words = [
  "time",
  "work",
  "life",
  "give",
  "take",
  "keep",
  "hope",
  "open",
  "mind",
  "talk",
  "hear",
  "read",
  "rich",
  "poor",
  "true",
  "kind",
  "dark",
  "lost",
  "find",
  "fall",
];

currentSection = section1;
nextSection = section2;
function gameStart() {
  sectionEnable(section1);
}

function next() {
  switch (true) {
    case currentSection == section1:
      currentSection = section2;
      nextSection = section3;
      sectionEnable(section2);
      break;
    case currentSection == section2:
      currentSection = section3;
      nextSection = section4;
      sectionEnable(section3);
      break;
    case currentSection == section3:
      currentSection = section4;
      nextSection = section5;
      sectionEnable(section4);
      break;
    case currentSection == section4:
      currentSection = section5;
      nextSection = null;
      sectionEnable(section5);
        break;
    case currentSection == section5:
      endGame();
      break;
    default:
      break;
  }
}

function endGame() {
  looseMessage();
}

function checkinput(section) {
  let row = true;
  let rowvalue = "";

  for (let i = 0; i <= 3; i++) {
    if (!section[i].value) {
      row = false;
      rowvalue += section[i].value;
    }
    {
      rowvalue += section[i].value;
    }
  }

  if (row) {
    return {
      row,
      rowvalue,
    };
  } else {
    return false;
  }
}

function sectionEnable(section) {
  for (let i = 0; i <= 19; i++) {
    wordlebox[i].readOnly = true;
  }

  if (section) {
    for (let i = 0; i <= 3; i++) {
      section[i].readOnly = false;
    }
  }
}

function moveCursor() {}

let answer = words[Math.floor(Math.random() * 20) + 1];
let guess = "";

//focus input
window.addEventListener("input", (e) => {
  if (e.data) {
    for (let i = 0; i <= 3; i++) {
      if (currentSection[i] == e.target && i != 3) {
        currentSection[i + 1].focus();
      } else if (currentSection[i] == e.target && i == 3 && nextSection) {
        nextSection[0].focus();
      }
    }

    let userRow = checkinput(currentSection);
    if (userRow.row) {
      guess = userRow.rowvalue;
      processGuess(guess);
    }
  } else {
    for (let i = 0; i <= 3; i++) {
      if (currentSection[i] == e.target && i != 0) {
        currentSection[i - 1].focus();
      }
    }
  }
});

function processGuess(guess) {
  if (answer == guess) {
    for (let i = 0; i <= 3; i++) {
      colorGreen(i);
      winMessage();
      sectionEnable(false);
    }
    return;
  }

  for (let i = 0; i <= 3; i++) {
    if (answer[i] == guess[i]) {
      colorGreen(i);
    } else if (answer.includes(guess[i])) {
      colorOrange(i);
    } else {
      colorGray(i);
    }
  }

  
  next();
}

function colorGreen(i) {
  currentSection[i].classList.add("green");
}
function colorOrange(i) {
  currentSection[i].classList.add("orange");
}
function colorGray(i) {
  currentSection[i].classList.add("bg-gray-500");
}

function winMessage() {
  let parent = document.getElementsByTagName("body")[0];

  let div = document.createElement("div");

  div.innerHTML = `
    <div class="p-5 bg-white rounded-lg shadow-lg flex flex-col text-center items-center justify-center">
    <h1>You won</h1>
    <p class="text-lg text-green-700">${answer.toUpperCase()}</p>
    <button onclick="playagain()" class="p-2 px-4 bg-green-200 border-2 border-green-800 text-green-800 text-center">Play Again</button>
    </div>
    `;
  div.classList.add("resultsbox");

  parent.appendChild(div);
}

function looseMessage() {
  let parent = document.getElementsByTagName("body")[0];

  let div = document.createElement("div");

  div.innerHTML = `
    <div class="p-10 bg-white rounded-lg shadow-lg flex flex-col gap-5 text-center items-center justify-center">
    <h1>You lost</h1>
    <p>the correct word was</p>
    <p class="text-lg text-green-700">${answer.toUpperCase()}</p>
    <button onclick="playagain()" class="p-2 px-4 bg-green-200 border-2 border-green-800 text-green-800 text-center">Play Again</button>
    </div>
    `;
  div.classList.add("resultsbox");

  parent.appendChild(div);
}

function playagain() {
  window.location.reload();
}
