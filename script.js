var timeEl = document.querySelector(".time");
var introEl = document.getElementById("introPanel");
var gameoverEl = document.getElementById("gameoverPanel");
var highscoreEl = document.getElementById("highscorePanel");
var startBtn = document.getElementById("start");
var quizEl = document.getElementById("QuizPanel");
var finalScore = 0;
var scoreEl = document.getElementById("finalscore");
var userInitials = "";
var highscorelink = document.getElementById("highscoreLink");
var userSubmitBtn = document.getElementById("userSubmit");
var goBackBtn = document.getElementById("goBack");
var clearHighScoresBtn = document.getElementById("clearHighScores");

function setTime() {
  var secondsLeft = 10;

  introEl.style.display = "none";
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = `Time: ${secondsLeft}`;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      gameOver();
    }

  }, 1000);
}

function gameOver() {
  timeEl.textContent = " ";

  // var timerEl = document.createElement("p");
  // gameoverEl.appendChild(timerEl);

  console.log("in gameover");
  quizEl.style.display = "none";
  gameoverEl.style.display = "block";
  scoreEl.innerHTML = finalScore;
  userSubmitBtn.addEventListener("click", highscore);

}

function Quiz(event) {
  event.preventDefault();
  console.log("in quiz");
  introEl.style.display = "none";
  quizEl.style.display = "block";
  setTime();
}

function initializePanels() {
  console.log("initializing panels");
  quizEl.style.display = "none";
  gameoverEl.style.display = "none";
  highscoreEl.style.display = "none";
  introEl.style.display = "block";
  highscorelink.style.display = "block";
  startBtn.addEventListener("click", Quiz);
}

function highscore() {
  console.log("in highscore panel");
  introEl.style.display = "none";
  quizEl.style.display = "none";
  gameoverEl.style.display = "none";
  highscorelink.style.display = "none";
  highscoreEl.style.display = "block";
  highscoreInit();
  goBackBtn.addEventListener("click", initializePanels);
  clearHighScoresBtn.addEventListener("click", clearHighScores);
}


initializePanels();



// for high scores
var userInitials = document.querySelector("#userInitials");
var scoreForm = document.querySelector("#score-form");
var highscoreList = document.querySelector("#highscore-list");
var highscoreCountSpan = document.querySelector("#score-count");

var highscores = [];

highscoreInit();

function renderHighScore() {
  // Clear todoList element and update todoCountSpan
  highscoreList.innerHTML = "";
  highscoreCountSpan.textContent = highscores.length;

  // Render a new li for each todo
  for (var i = 0; i < highscores.length; i++) {
    var highscore = highscores[i];

    var li = document.createElement("li");
    li.textContent = highscore;
    li.setAttribute("data-index", i);

    li.appendChild(button);
    highscoreList.appendChild(li);
  }
}

function highscoreInit() {
  // Get stored scores from localStorage
  // Parsing the JSON string to an object
  var storedScores = JSON.parse(localStorage.getItem("highscores"));

  // If scores were retrieved from localStorage, update the highscores array to it
  if (storedScores !== null) {
    highscores = storedScores;
  }

  // Render scores to the DOM
  renderHighScore();
}

function storeHighScore() {
  // Stringify and set "highscores" key in localStorage to highscores array
  localStorage.setItem("highscores", JSON.stringify(highscores));
}

// When form is submitted...
scoreForm.addEventListener("submitHighScore", function (event) {
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
highscoreList.addEventListener("click", function (event) {
  var element = event.target;

});


function clearHighScores() {
  event.preventDefault();

  console.log("In clear high scores");
}