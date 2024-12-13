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
const imageDivEl = document.querySelector("#imageDiv");
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
    question: "Какой герой изображен на картинке?",
    image: '01.jpeg',
    answers: {
      1: 'Void Spirit',
      2: 'Dark Seer',
      3: 'Void Seer',
      4: 'Dark Spirit'
    },
    correctAnswer: '2'
  },
  {
    // Question 2
    question: "Угадай героя по эмоджи",
    image: '02.png',
    answers: {
      1: 'Riki',
      2: 'Dark Willow',
      3: 'Vengeful Spirit',
      4: 'Puck'
    },
    correctAnswer: '3'
  },
  {
    // Question 3
    question: "Что даёт Aghanim`s Scepter у Enigma?",
    answers: {
      1: 'Увеличивает количество эйдолонов на 5 и их урон на 50 ед.',
      2: 'Ульта притягивает врагов в радиусе 1000',
      3: 'Увеличивает урон наносимый третьего скилла на 15%',
      4: 'Ульта наносит доп урон, 5% от макс. здоровья жертвы'
    },
    correctAnswer: '2'
  },
  {
    // Question 4
    question: "Какие International выйграли Team Spirit?",
    answers: {
      1: '11 и 13',
      2: '11 и 12',
      3: '10 и 13',
      4: '12 и 10'
    },
    correctAnswer: '1'
  },
  {
    // Question 5
    question: "Что позволяют делать Boots of Travel 2",
    answers: {
      1: 'Ускоряют время телепортации',
      2: 'Позволяют телепортироваться на героев',
      3: 'Увеличивают скорость передвижения по сравнению с Boots of Travel на 20',
      4: 'Всё вышеперечисленное'
    },
    correctAnswer: '4'
  },
  {
    // Question 6
    question: "Сколько стоит танго?",
    answers: {
      1: '120',
      2: '90',
      3: '110',
      4: '100'
    },
    correctAnswer: '2'
  },
  {
    // Question 7
    question: "Определи героя по сборке от про игрока",
    image: '07.png',
    answers: {
      1: 'Witch Doctor',
      2: 'Tinker',
      3: 'Silencer',
      4: 'Shadow Demon'
    },
    correctAnswer: '4'
  },
  {
    // Question 8
    question: "Какой из этих предметов не дает эффект развеивания?",
    answers: {
      1: `Eul's Screpter of Divinity`,
      2: 'Lotus Orb',
      3: 'Solar Crest',
      4: 'Guardian Greaves'
    },
    correctAnswer: '3'
  },
  {
    // Question 9
    question: "Угадай героя по вражденной способности: Герой постоянно горит, каждую секунду нанося урон врагам поблизости",
    answers: {
      1: 'Dawnbreaker',
      2: 'Phoenix',
      3: 'Ember Spirit',
      4: 'Lina'
    },
    correctAnswer: '2'
  },
  {
    // Question 10
    question: "Сколько процентов шанс оглушения у Spirit Breaker? (без таланта на увелечение шанса)",
    answers: {
      1: '20',
      2: '52',
      3: '17',
      4: '15'
    },
    correctAnswer: '3'
  },
  {
    // Question 11
    question: "Сколько стоит мидас?",
    answers: {
      1: '2100',
      2: '2200',
      3: '1950',
      4: '2250'
    },
    correctAnswer: '2'
  },
  {
    // Question 12
    question: "Какая из этих способностей не работает сквозь бкб?",
    answers: {
      1: 'Ульт праймал биста',
      2: 'Ульт трента',
      3: 'Ульт пуджа',
      4: 'Ульт наги сирены',
    },
    correctAnswer: '4'
  },
  {
    // Question 13
    question: "Какой из этих предметов не уменьшает восстановление здоровья противникам?",
    answers: {
      1: `Shiva's Guard`,
      2: 'Urn of Shadow',
      3: 'Eye of Skadi',
      4: 'Orb of Corrosion',
    },
    correctAnswer: '2'
  },
  {
    // Question 14
    question: "От какого из этих предметов нельзя защититься линкой?",
    answers: {
      1: 'Scythe of Vyse',
      2: 'Gleipnir',
      3: 'Nullifaer',
      4: 'Silver Edge',
    },
    correctAnswer: '4'
  },
  {
    // Question 15
    question: "Определи героя по сборке про игрока",
    image: '15.png',
    answers: {
      1: 'Kunkka',
      2: 'Doom',
      3: 'Axe',
      4: 'Sand King',
    },
    correctAnswer: '2'
  },
  {
    // Question 16
    question: "У кого из этих героев больший процент побед на кери роли в текущем патче?",
    answers: {
      1: 'Morphling',
      2: 'Dragon Knight',
      3: 'Alchemist',
      4: 'Spectre',
    },
    correctAnswer: '3'
  },
  {
    // Question 17
    question: "Определи героя по сборке про игрока",
    image: '17.png',
    answers: {
      1: 'Muerta',
      2: 'Hoodwink',
      3: 'Pugna',
      4: 'Batrider',
    },
    correctAnswer: '1'
  },
  {
    // Question 18
    question: "Какой максимальный рейтинг в дота 2 на данный момент?",
    answers: {
      1: '16 к +',
      2: '15 к +',
      3: '14 к +',
      4: '13 к +'
    },
    correctAnswer: '1'
  },
  {
    // Question 19
    question: "Какой из этих предметов не дает ауру?",
    answers: {
      1: 'Shivas Guard',
      2: 'Assault Cuirass',
      3: 'Crimson Guard',
      4: 'Guardian Greves'
    },
    correctAnswer: '3'
  },
  {
    // Question 20
    question: "Сколько призовых у данного игрока?",
    image: '20.jpg',
    answers: {
      1: '5000$ с пари матч',
      2: 'Банка пива',
      3: 'У самурая нет цели, только путь',
      4: 'Всё впереди! С Днем Рождения!'
    },
    correctAnswer: '4'
  },
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
  } else {
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
  image = quizQuestions[questionIndex].image;
  answer1 = quizQuestions[questionIndex]["answers"][1];
  answer2 = quizQuestions[questionIndex]["answers"][2];
  answer3 = quizQuestions[questionIndex]["answers"][3];
  answer4 = quizQuestions[questionIndex]["answers"][4];
  questionDivEl.innerHTML = `<h3><strong>${question}</strong></h3>`;
  
  renderImage(image);

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

function renderImage(image) {
  if (image) {
    imageDivEl.innerHTML = `<img src="assets/images/${image}">`;
  } else {
    imageDivEl.innerHTML = '';
  }
}

// This is used to set the timer
function setTime() {
  // countdown every second starting from 60 seconds
  var timerInterval = setInterval(function () {
    timeleft--;
    timeEl.textContent = `Time: ${timeleft}`;
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
  let result = confirm('Are you sure you want to clear the scores?')
  if (result) {
    delete localStorage.highScores;
    renderHighScore();
  }
}

// This is the starting function that initializes the panels.
initializePanels();