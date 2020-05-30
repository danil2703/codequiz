var timeEl = document.querySelector(".time");
var introEl = document.getElementById("introPanel");
var gameoverEl = document.getElementById("gameoverPanel");
var highscoreEl = document.getElementById("highscorePanel");
var startBtn = document.getElementById("start");
const quizEl = document.getElementById("quizPanel");
var finalScore = 0;
var scoreEl = document.getElementById("finalscore");
var userInitialsEl = document.querySelector("#userInitials");
var highscorelink = document.getElementById("highscoreLink");
var userSubmitBtn = document.getElementById("userSubmit");
var goBackBtn = document.getElementById("goBack");
var clearHighScoresBtn = document.getElementById("clearHighScores");
let highscoreList = localStorage.highscoreList ? JSON.parse(localStorage.highscoreList) : [];
var storedScoresGlobal = JSON.parse(localStorage.getItem("highscoreList"));
let nohighscoreLinkEL = document.querySelector("#nohighscoreLink");
const questionDivEl = document.querySelector("#questionDiv");
const answerDivEl = document.querySelector("#answerDiv");
const responseDivEl = document.querySelector("#responseDiv");

// for high scores
var scoreForm = document.querySelector("#score-form");
var highscoreListHTML = document.querySelector("#highscore-list");


var highscores = [];
var questionIndex = 0;
var question;
var choice, answer1, answer2, answer3, answer4;
var correctCount = 0;
var isGameOver = false;
let timeleft = 60; // 60 seconds

var quizQuestions = [
  {
    // Question 1
    question: "The condition in an 'if / else statement is enclosed within _____.",
    answers: {
      1: 'quotes',
      2: 'curly brackets',
      3: 'parentheses',
      4: 'square brackets'
    },
    correctAnswer: '3'
  },
  {
    // Question 2
    question: "Commonly used data types DO NOT include: ",
    answers: {
      1: 'strings',
      2: 'booleans',
      3: 'alerts',
      4: 'numbers'
    },
    correctAnswer: '3'
  },
  {
    // Question 3
    question: "A very useful tool during development and debugging for printing content to the debugger is _____.",
    answers: {
      1: 'JavaScript',
      2: 'terminal/bash',
      3: 'for loops',
      4: 'console.log'
    },
    correctAnswer: '4'
  },
  {
    // Question 4
    question: "Arrays in JavaScript can be used to store ______.",
    answers: {
      1: 'numbers and strings',
      2: 'other arrays',
      3: 'booleans',
      4: 'all of the above'
    },
    correctAnswer: '4'
  },
  {
    // Question 5
    question: "String values must be enclosed within _____ when being assigned to variables",
    answers: {
      1: 'commas',
      2: 'curly brackets',
      3: 'quotes',
      4: 'parentheses'
    },
    correctAnswer: '3'
  }
];


function initializePanels() {
  quizEl.style.display = "none";
  gameoverEl.style.display = "none";
  highscoreEl.style.display = "none";
  introEl.style.display = "block";
  highscorelink.style.display = "block";
  startBtn.addEventListener("click", buildQuiz);
  finalScore = 0;
  questionIndex = 0;
  isGameOver = false;
  timeleft = 60;
}

function checkAnswer(event) {
  event.preventDefault();
  choice = event.target.value;
  console.log(`[checkAnswer] choice: ${choice}`);
  if (choice == quizQuestions[questionIndex]["correctAnswer"]) {
    console.log(`[checkAnswer] Answer is correct!`);
    finalScore++;
    responseDivEl.innerHTML = "<hr>Correct!"
  } else {
    responseDivEl.innerHTML = "<hr>Wrong!"
    timeleft = timeleft - 10;
    if (timeleft >= 0) {
      timeEl.textContent = `Time: ${timeleft}`;
    }
  }
  questionIndex++;
  buildQuiz();
}

function buildQuiz() {
  console.log(`[buildQuiz] - questionIndex: ${questionIndex}`);
  if (questionIndex >= quizQuestions.length) {
    console.log(`[buildQuiz] - Questions done. Game Over`);
    questionIndex = 0;
    isGameOver = true;
  }
  if (questionIndex == 0) {
    introEl.style.display = "none";
    quizEl.style.display = "block";
    setTime();
  }
  question = quizQuestions[questionIndex]["question"];
  answer1 = quizQuestions[questionIndex]["answers"][1];
  answer2 = quizQuestions[questionIndex]["answers"][2];
  answer3 = quizQuestions[questionIndex]["answers"][3];
  answer4 = quizQuestions[questionIndex]["answers"][4];
  questionDivEl.innerHTML = `<h3>${question}</h3>`;
  answerDivEl.innerHTML = `
      <div id='answerDiv' class="row">
        <button name='answer1' value='1' class='btn btn-primary brand-bgcolor btn-answers text-left' onclick='checkAnswer(event)';>1 - ${answer1}</button>
      </div>
      <div id='answerDiv' class="row">
        <button name='answer2' value='2' class='btn btn-primary brand-bgcolor btn-answers text-left' onclick='checkAnswer(event)';>2 - ${answer2}</button>
      </div>
      <div id='answerDiv' class="row">
        <button name='answer3' value='3' class='btn btn-primary brand-bgcolor btn-answers text-left' onclick='checkAnswer(event)';>3 - ${answer3}</button>
      </div>
      <div id='answerDiv' class="row">
        <button name='answer4' value='4' class='btn btn-primary brand-bgcolor btn-answers text-left' onclick='checkAnswer(event)';>4 - ${answer4}</button>
      </div>
    `
}


// This is used to set the timer
function setTime() {
  // var secondsLeft = 10;
  introEl.style.display = "none";
  var timerInterval = setInterval(function () {
    timeleft--;
    timeEl.textContent = `Time: ${timeleft}`;

    if (timeleft === 0 || (isGameOver)) {
      clearInterval(timerInterval);
      gameOver();
    }

  }, 1000);
}


function gameOver() {
  console.log("[gameOver]");
  timeEl.textContent = " ";

  quizEl.style.display = "none";
  gameoverEl.style.display = "block";
  scoreEl.innerHTML = finalScore;
  choice = "";
}

function getStoredScores() {
  if (localStorage.highscores) {
    let highscoreList = JSON.parse(localStorage.highscoresList);
    console.log(`[getStoredScores] got highscoreList: ${highscoreList}`);
    return highscoreList;
  } else {
    console.log(`[getStoredScores] got highscoreList: empty`);
    return [];
  }
}



function saveUser() {
  event.preventDefault();
  console.log("[saveUser]");
  let storedScores = getStoredScores();
  // console.log(`[saveUser] - initials: ${userInitialsEl.value}, finalScore: ${finalScore}`);
  // highscoreList.push( userInitialsEl.value, finalScore);
  // save to local storage
  storedScores.push(userInitialsEl.value, finalScore);
  console.log(`[saveUser] added user`);
  console.log(`[saveUser] storedScores: ${storedScores}`);
  localStorage.highscoreList = JSON.stringify(storedScores);
  // console.log(`[saveUser] ${localStorage.highscoreList}`);
  gethighscores();
}

function gethighscores() {
  introEl.style.display = "none";
  quizEl.style.display = "none";
  gameoverEl.style.display = "none";
  highscorelink.style.display = "none";
  highscoreEl.style.display = "block";
  nohighscoreLinkEL.style.display = "block";
  // Get stored scores from localStorage
  // Parsing the JSON string to an object
  var storedScores = JSON.parse(localStorage.getItem("highscoreList"));

  // If scores were retrieved from localStorage, update the highscores array to it
  if (storedScores !== null) {
    highscoresList = storedScores;
  }
  console.log(`[gethighscores] highscoresList: ${highscoresList}`);

  // Render scores to the DOM
  renderHighScore();
  // highscoreInit();
  goBackBtn.addEventListener("click", initializePanels);
  clearHighScoresBtn.addEventListener("click", clearHighScores);
}


initializePanels();


// highscoreInit();

function renderHighScore() {
  // Clear todoList element and update todoCountSpan
  var renderhighscoreList = JSON.parse(localStorage.getItem("highscoreList"));
  if (renderhighscoreList === null) {
    renderhighscoreList = ["User: empty", ];
  }
  console.log(`[renderHighScore] highscores: ${renderhighscoreList}`);
  console.log(`[renderHighScore] highscores length: ${renderhighscoreList.length}`);
  highscoreListHTML.innerHTML = "";

  // Render a new li for each score
  // for (var i = 0; i < highscores.length; i++) {
  //   var highscore = highscores[i];

  //   var li = document.createElement("li");
  //   li.textContent = highscore;
  //   li.setAttribute("data-index", i);

  //   // li.appendChild(button);
  //   highscoreListHTML.appendChild(li);
  // }

  // highscoreList.forEach(
  //   function (item, index) {
  //     highscoreListHTML.innerHTML +=
  //       `<li id='${index}'>${item}`;
  //   }
  // )
  highscoreListHTML.innerHTML += `<li class='list-group-item list-group-item-primary list-color'>${renderhighscoreList}`;
  console.log(`[renderHighScore] highscoreListHTML: ${highscoreListHTML.innerHTML}`);
}

function highscoreInit() {
  // event.preventDefault();
  // console.log("inside highscoreInit");

}

// function storeHighScore() {
//   console.log("inside storeHighScore");
//   // Stringify and set "highscores" key in localStorage to highscores array
//   localStorage.setItem("highscores", JSON.stringify(highscores));
// }

/*
// When form is submitted...
scoreForm.addEventListener("submit", function (event) {
  event.preventDefault();

  var userInitials = userInitials.value.trim();

  // Return from function early if submitted userinitials is blank
  if (userInitials === "") {
    return;
  }

  // Add new initials to highscores array, clear the input
  highscores.push(userInitials);
  userInitials.value = "";

  // Store updated scores in localStorage, re-render the list
  storeHighScore();
  renderHighScore();
});

// When a element inside of the highscoreList is clicked...
highscoreListHTML.addEventListener("click", function (event) {
  var element = event.target;

});
*/

// This is used to clear the stored high scores after confirming
function clearHighScores() {
  event.preventDefault();
  confirm('Are you sure you want to clear the scores?')
  delete localStorage.highscoreList;
  console.log(`[clearHighScores] - deleted highscoreList`);
  renderHighScore();
}