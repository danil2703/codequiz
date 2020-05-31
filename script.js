// main elements
const timeEl = document.querySelector(".time");
const introEl = document.getElementById("introPanel");
const gameoverEl = document.getElementById("gameoverPanel");
const highscoreEl = document.getElementById("highscorePanel");
const startBtn = document.getElementById("start");
const quizEl = document.getElementById("quizPanel");
const scoreEl = document.getElementById("finalscore");
const userInitialsEl = document.querySelector("#userInitials");
const highscorelink = document.getElementById("highscoreLink");
const userSubmitBtn = document.getElementById("userSubmit");
const goBackBtn = document.getElementById("goBack");
const clearHighScoresBtn = document.getElementById("clearHighScores");
const nohighscoreLinkEL = document.querySelector("#nohighscoreLink");
const questionDivEl = document.querySelector("#questionDiv");
const answerDivEl = document.querySelector("#answerDiv");
const responseDivEl = document.querySelector("#responseDiv");
const _max_scorelist = 5;
const scoreForm = document.querySelector("#score-form");
const highScoresListEl = document.querySelector("#highscore-list");

var finalScore = 0;
var highscores = [];
var questionIndex = 0;
var question;
var choice, answer1, answer2, answer3, answer4;
var correctCount = 0;
var isGameOver = false;
let timeleft = 60; // initial quiz is 60 seconds

// this is the array of quiz questions
var quizQuestions = [
  {
    // Question 1
    question: "The condition in an 'if / else statement is enclosed within ______.",
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
    question: "A very useful tool during development and debugging for printing content to the debugger is ______.",
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
    question: "String values must be enclosed within ______ when being assigned to variables.",
    answers: {
      1: 'commas',
      2: 'curly brackets',
      3: 'quotes',
      4: 'parentheses'
    },
    correctAnswer: '3'
  }
];

// This is the function that initializes the panels
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

// This function is used to display the response for a certain interval until it disappears
function displayResponse(response) {
  let countdown = 15;
  let timer;
  var timerInterval = setInterval(function () {
    countdown--;
    if (countdown < 0) {
      clearInterval(timerInterval);
      responseDivEl.innerHTML = "";
    } else {
      responseDivEl.innerHTML = response;
    }
  }, 50);
}

// This is the function to check the user's choice against the correct answer in the array. Then display the response in the responseDiv. 
function checkAnswer(event) {
  event.preventDefault();
  var response = "";
  choice = event.target.value;
  console.log(`[checkAnswer] choice: ${choice}`);
  if (choice == quizQuestions[questionIndex]["correctAnswer"]) {
    finalScore++;
    response = "<hr><i><span id='responseCorrect'>Correct!</span></i>";
  } else {
    response = "<hr><i><span id='responseWrong'>Wrong!</span></i>";
    // remove 10 seconds from timer if incorrect
    timeleft = timeleft - 10;
    if (timeleft >= 0) {
      timeEl.textContent = `Time: ${timeleft}`;
    }
  }
  displayResponse(response);
  questionIndex++;
  buildQuiz();  // call the quiz again to show the next question and choices.
}

// This is the function that will display each question and choices. 
function buildQuiz() {
  if (questionIndex >= quizQuestions.length) {
    questionIndex = 0;
    isGameOver = true;
  }
  if (questionIndex == 0) {
    introEl.style.display = "none";
    quizEl.style.display = "block";
    setTime();
  }
  // set question and the 4 choices in HTML
  question = quizQuestions[questionIndex]["question"];
  answer1 = quizQuestions[questionIndex]["answers"][1];
  answer2 = quizQuestions[questionIndex]["answers"][2];
  answer3 = quizQuestions[questionIndex]["answers"][3];
  answer4 = quizQuestions[questionIndex]["answers"][4];
  questionDivEl.innerHTML = `<h3><strong>${question}</strong></h3>`;
  answerDivEl.innerHTML = `
      <div id='answerDiv' class="row">
        <button name='answer1' value='1' class='btn btn-primary brand-bgcolor text-left' onclick='checkAnswer(event)';>1 - ${answer1}</button>
      </div>
      <div id='answerDiv' class="row">
        <button name='answer2' value='2' class='btn btn-primary brand-bgcolor text-left' onclick='checkAnswer(event)';>2 - ${answer2}</button>
      </div>
      <div id='answerDiv' class="row">
        <button name='answer3' value='3' class='btn btn-primary brand-bgcolor text-left' onclick='checkAnswer(event)';>3 - ${answer3}</button>
      </div>
      <div id='answerDiv' class="row">
        <button name='answer4' value='4' class='btn btn-primary brand-bgcolor text-left' onclick='checkAnswer(event)';>4 - ${answer4}</button>
      </div>
    `
}

// This is used to set the timer
function setTime() {
  // countdown every second starting from 60 seconds
  var timerInterval = setInterval(function () {
    timeleft--;
    timeEl.textContent = `Time: ${timeleft}`;
    // if the time left is 0 or the game is over, clear the time and call the game over function
    if (timeleft === 0 || (isGameOver)) {
      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);
}

// This is called when the game is over. This handles the panels to hide and show.
function gameOver() {
  timeEl.textContent = " ";
  quizEl.style.display = "none";
  gameoverEl.style.display = "block";
  scoreEl.innerHTML = finalScore; // set the score to show the final score
  choice = "";  // clear the choice variable in case user wants to go back and run game again
}

// This is the function that stores score and user's initials to localStorage, to be able to be used in the highscores panel later.
function saveUser() {
  event.preventDefault();
  // get highscores from local storage and store in array, set to empty if not in localStorage
  const highScores = JSON.parse(localStorage.getItem("highScores")) ? JSON.parse(localStorage.highScores) : [];
  // array to hold the score and initials
  let score = {
    score: finalScore,
    name: userInitialsEl.value
  };
  highScores.push(score);
  highScores.sort((a, b) => b.score - a.score); // sorting highscores list in array descending
  highScores.splice(_max_scorelist);  // Currently set a limit to keep in array. If more than the limit, the lower one gets dropped off
  // store highscores back into localStorage
  localStorage.setItem('highScores', JSON.stringify(highScores))
  gethighscores();  // call next function to show the highscores
}

// This is to show the highscores list. Other panels are hidden
function gethighscores() {
  introEl.style.display = "none";
  quizEl.style.display = "none";
  gameoverEl.style.display = "none";
  highscorelink.style.display = "none";
  highscoreEl.style.display = "block";
  nohighscoreLinkEL.style.display = "block";  // to not show the highscore link
  // Render scores to the DOM
  renderHighScore();
  goBackBtn.addEventListener("click", initializePanels);
  clearHighScoresBtn.addEventListener("click", clearHighScores);
}

function renderHighScore() {
  // get highScores from localStorage, if empty set empty array
  const renderhighScores = JSON.parse(localStorage.getItem("highScores")) || [];

  // setting the innerhtml for the highscores list. map is returning the output of each item that is joined in one string
  highScoresListEl.innerHTML = renderhighScores.map(
    score => {
      return `<li class='high-score'>${score.name} - ${score.score}</li>`;
    }
  ).join("");
}

// This is used to clear the stored high scores after confirming. Then calls the renderHighScore again to refresh the list.
function clearHighScores() {
  event.preventDefault();
  confirm('Are you sure you want to clear the scores?')
  delete localStorage.highScores;
  renderHighScore();
}

// This is the starting function that initializes the panels.
initializePanels();