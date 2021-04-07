// Section elements
const superHeaderDiv = document.getElementById(".superheader");
const headerDiv = document.querySelector(".header");
const introDiv = document.querySelector(".intro");
const mainDiv = document.querySelector(".main");
const submitScoreDiv = document.querySelector(".submitscore");
const scoresDiv = document.querySelector(".scores");

const finalScoreEl = document.getElementById("final-score");
const initialsTxt = document.getElementById("initials");
const highestScoreTxt = document.getElementById("highestscore");

// Button handlers
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const scoresBtn = document.getElementById("scores");
const submitBtn = document.getElementById("submit");
const goBackBtn = document.getElementById("goback");
const clearScoresBtn = document.getElementById("clearscores");

// Timer element
const timerEl = document.getElementById("countdown");

// Question/answer element
const questionAnswerEl = document.getElementById("question");

// Answer element
const answerEl = document.querySelectorAll(".answer");

// Message element
var messageEl;

//
const MAX_TIMER = 60;
const MAX_QUESTIONS = 10;
const MAX_ANSWERS = 5;
const PENALTY = 10;
const REWARD = 5;

// Variables
var timeLeft;
var timer;
var numberOfCorrectAnswers;
var numberOfWrongAnswers;
var actualScore;

// Question object
var questionObj = {
  number: "",
  question: "",
  possibleAnswers: [],
  correctAnswer: "",
};

// Score object
var scoreObj = {
  initials: "",
  score: "",
};

// Quiz
var quizObj = [];
var isQuizLoaded = false;
var questionNumber = 0;

// Initialize timer
function startTimer() {
  //
  questionNumber = 0;
  numberOfCorrectAnswers = 0;
  numberOfWrongAnswers = 0;
  actualScore = 0;
  //
  timeLeft = MAX_TIMER;
  timerEl.textContent = timeLeft;
  //
  loadNextQuestion();
  timer = setInterval(function () {
    // Decrease timeLeft by 1 second
    updateTimeLeft(-1);
  }, 1000);
}

// Stop timer
function stopTimer() {
  timerEl.textContent = timeLeft;
  clearInterval(timer);
}

// Update time left
function updateTimeLeft(seconds) {
  timeLeft = timeLeft + seconds;

  if (timeLeft > 0) {
    timerEl.textContent = timeLeft;
  } else {
    timeLeft = 0;
    timerEl.textContent = timeLeft;
    clearInterval(timer);

    // All done
    processAllDone();
  }
}

// Init quiz
// Questions extracted from W3Schools.com
// => https://www.w3schools.com/quiztest/quiztest.asp?qtest=JS
function initQuiz() {
  // Question 1
  questionObj = {
    number: "1",
    question: "Inside which HTML element do we put the JavaScript?",
    possibleAnswers: ["<javascript>", "<script>", "<scripting>", "<js>"],
    correctAnswer: "2",
  };
  quizObj.push(questionObj);

  // Question 2
  questionObj = {
    number: "2",
    question: "Where is the correct place to insert a JavaScript?",
    possibleAnswers: [
      "The <body> section",
      "Both the <head> section and the <body> section are correct",
      "The <head> section",
    ],
    correctAnswer: "2",
  };
  quizObj.push(questionObj);

  // Question 3
  questionObj = {
    number: "3",
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    possibleAnswers: [
      "<script href='xxx.js'>",
      "<script name='xxx.js>",
      "<script src='xxx.js'>",
    ],
    correctAnswer: "3",
  };
  quizObj.push(questionObj);

  // Question 4
  questionObj = {
    number: "4",
    question: "The external JavaScript file must contain the <script> tag.",
    possibleAnswers: ["False", "True"],
    correctAnswer: "1",
  };
  quizObj.push(questionObj);

  // Question 5
  questionObj = {
    number: "5",
    question: "How do you write 'Hello World' in an alert box?",
    possibleAnswers: [
      "msg('Hello World')",
      "msgBox('Hello World')",
      "alert('Hello World')",
      "alertBox('Hello World')",
    ],
    correctAnswer: "3",
  };
  quizObj.push(questionObj);

  // Question 6
  questionObj = {
    number: "6",
    question: "How do you create a function in JavaScript?",
    possibleAnswers: [
      "function:myFunction()",
      "function myFunction()",
      "function = myFunction()",
    ],
    correctAnswer: "2",
  };
  quizObj.push(questionObj);

  // Question 7
  questionObj = {
    number: "7",
    question: "How do you call a function named 'myFunction'?",
    possibleAnswers: [
      "call function myFunction()",
      "call myFunction()",
      "myFunction()",
    ],
    correctAnswer: "3",
  };
  quizObj.push(questionObj);

  // Question 8
  questionObj = {
    number: "8",
    question: "How to write an IF statement in JavaScript?",
    possibleAnswers: [
      "if i = 5 then",
      "if (i == 5)",
      "if i == 5 then",
      "if i = 5",
    ],
    correctAnswer: "2",
  };
  quizObj.push(questionObj);

  // Question 9
  questionObj = {
    number: "9",
    question:
      "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
    possibleAnswers: [
      "if (i <> 5)",
      "if (i != 5)",
      "if i <> 5",
      "if i =! 5 then",
    ],
    correctAnswer: "2",
  };
  quizObj.push(questionObj);

  // Question 10
  questionObj = {
    number: "10",
    question: "How does a WHILE loop start?",
    possibleAnswers: [
      "while (i <= 10)",
      "while i =1 to 10",
      "while (i <= 10; i++",
    ],
    correctAnswer: "1",
  };
  quizObj.push(questionObj);

  isQuizLoaded = true;
}

// Init quiz
function initQuizOld() {
  //
  var possibleAnswers = [];
  var rndAnswer;
  //
  for (var i = 0; i < MAX_QUESTIONS; i++) {
    //
    questionObj.question = "";
    questionObj.possibleAnswers = [];
    questionObj.correctAnswer = "";

    questionObj.question = "Question " + (i + 1);

    for (var j = 0; j < MAX_ANSWERS; j++) {
      questionObj.possibleAnswers[j] =
        "Answer [" + (i + 1) + "," + (j + 1) + "]";
    }

    rndAnswer = Math.floor(Math.random() * 5);
    questionObj.correctAnswer = rndAnswer;

    quizObj.push(questionObj);
  }

  isQuizLoaded = true;
}

// Check answer
function checkAnswer(element) {
  //
  var answerNumber = element.getAttribute("answer-number");
  var correctAnswer = quizObj[questionNumber - 1].correctAnswer;
  //
  if (answerNumber === correctAnswer) {
    numberOfCorrectAnswers++;
    // Increase time left
    updateTimeLeft(REWARD);
    return true;
  } else {
    numberOfWrongAnswers++;
    // Decrease time left
    updateTimeLeft(-PENALTY);

    return false;
  }
  //
}

// Shows correct/wrong message
function showMessage(message) {
  messageEl.textContent = message;
}

// Load next question
function loadNextQuestion() {
  var liEl;
  var btnEl;
  //
  questionAnswerEl.setAttribute(
    "question-number",
    quizObj[questionNumber].number
  );
  questionAnswerEl.textContent =
    quizObj[questionNumber].number + ". " + quizObj[questionNumber].question;
  liEl = document.createElement("li");
  //
  for (var j = 0; j < quizObj[questionNumber].possibleAnswers.length; j++) {
    //
    btnEl = document.createElement("button");
    //
    btnEl.setAttribute("class", "answer");
    btnEl.setAttribute("answer-number", j + 1);
    btnEl.textContent = quizObj[questionNumber].possibleAnswers[j];
    //
    liEl.appendChild(btnEl);
  }

  //
  messageEl = document.createElement("span");
  messageEl.setAttribute("id", "message");
  messageEl.setAttribute("class", "message");
  messageEl.textContent = "";

  questionAnswerEl.appendChild(liEl);
  questionAnswerEl.appendChild(messageEl);

  questionNumber++;
}

// Calculate score
function calculateScore() {
  actualScore = (numberOfCorrectAnswers / MAX_QUESTIONS) * 100;
}

// Submit score
function submitScore() {
  var actualInitials = initialsTxt.value.trim();
  var savedScore;

  // Retrive the highest score
  savedScore = JSON.parse(localStorage.getItem("highestScore"));

  if (savedScore !== null) {
    // Compare the highest score to the actual one
    if (savedScore.score < actualScore) {
      scoreObj.initials = actualInitials;
      scoreObj.score = actualScore;

      // Save the actual score
      localStorage.setItem("highestScore", JSON.stringify(scoreObj));
    }
  } else {
    scoreObj.initials = actualInitials;
    scoreObj.score = actualScore;

    // Save the actual score
    localStorage.setItem("highestScore", JSON.stringify(scoreObj));
  }
}

// Load highest score
function loadHighestScore() {
  var savedScore;

  // Retrive the highest score
  savedScore = JSON.parse(localStorage.getItem("highestScore"));

  if (savedScore !== null) {
    // Display it
    highestScoreTxt.textContent =
      savedScore.initials + ": " + savedScore.score + "%";
  } else {
    highestScoreTxt.textContent = "N/A";
  }
}

// Clear highest score
function clearHighestScore() {
  localStorage.removeItem("highestScore");
}

// Hide section
function hideElement(section) {
  section.style.display = "none";
}

// Show section
function showElement(section) {
  section.style.display = "block";
}

// Init quiz parameters
function initParameters() {
  hideElement(mainDiv);
  hideElement(submitScoreDiv);
  hideElement(scoresDiv);
  showElement(introDiv);
  //
  timeLeft = MAX_TIMER;
  timerEl.textContent = timeLeft;
  //
  if (!isQuizLoaded) {
    initQuiz();
  }
}

// All done
function processAllDone() {
  // All done
  stopTimer();
  calculateScore();
  hideElement(mainDiv);
  finalScoreEl.textContent =
    actualScore + "% (" + numberOfCorrectAnswers + "/" + MAX_QUESTIONS + ")";
  showElement(submitScoreDiv);
}

// Process startBtn logic
function processStartBtn() {
  hideElement(introDiv);
  hideElement(submitScoreDiv);
  hideElement(scoresDiv);
  showElement(mainDiv);
  startTimer();
}

// Process stopBtn logic
function processStopBtn() {
  stopTimer();
  initParameters();
}

// Process scoresBtn logic
function processScoresBtn() {
  hideElement(introDiv);
  hideElement(mainDiv);
  hideElement(submitScoreDiv);
  loadHighestScore();
  showElement(scoresDiv);
}

// Process submitBtn logic
function processSubmitBtn() {
  submitScore();
  hideElement(submitScoreDiv);
  loadHighestScore();
  showElement(scoresDiv);
}

// Process clearScoresBtn logic
function processClearScoresBtn() {
  clearHighestScore();
  loadHighestScore();
}

// Process goBackBtn logic
function processGoBackBtn() {
  hideElement(mainDiv);
  hideElement(submitScoreDiv);
  hideElement(scoresDiv);
  showElement(introDiv);
}

// Process question/answer logic
function processQuestionAnswer() {
  // Check that the clicked element is an answer
  var element = event.target;

  if (element.matches(".answer")) {
    // Check answer
    if (checkAnswer(element)) {
      showMessage("Correct!");
      messageEl.setAttribute("style", "color: green;");
    } else {
      showMessage("Wrong!");
      messageEl.setAttribute("style", "color: red;");
    }

    // Wait 0.5 seconds before executing the next block of code
    // giving time to the user to read the correct/wrong message
    setTimeout(function () {
      //
      if (questionNumber < MAX_QUESTIONS) {
        // Load next question
        loadNextQuestion();
      } else {
        // All done
        processAllDone();
      }
    }, 500);
  }
}

// Event listeners
startBtn.addEventListener("click", processStartBtn);
stopBtn.addEventListener("click", processStopBtn);
scoresBtn.addEventListener("click", processScoresBtn);
submitBtn.addEventListener("click", processSubmitBtn);
clearScoresBtn.addEventListener("click", clearScoresBtn);
goBackBtn.addEventListener("click", processGoBackBtn);
questionAnswerEl.addEventListener("click", processQuestionAnswer);

// Init parameters
initParameters();
