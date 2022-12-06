// Reference variables for the quiz DOM elements
var questionsWrap = document.querySelector('#questions');
var questionTitle = document.querySelector('#question-title');
var questionChoices = document.querySelector('#choices');
var startQuizButton = document.querySelector('#start');
var submitButton = document.querySelector('#submit');
var timerEl = document.querySelector('#time');
var initials = document.querySelector('#initials');
var feedback = document.querySelector('#feedback');
// Other needed variables for the quiz
var currentQuestionIndex = 0;
// give user 15 sec per question
var time = questions.length * 15;
var timerInt;

function quizTimer() {
    // display the time in the browser window
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
        quizOver();
    }
}

// Correct/incorrect answer sound effects
var sfxCorrect = new Audio("assets/sfx/correct.wav");
var sfxIncorrect = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
    // add hide class to start screen
    var startScreen = document.querySelector('#start-screen');
    startScreen.classList.add('hide');

    // remove hide class for questions section
    questionsWrap.classList.remove('hide');

    // Setting timer 
    if (currentQuestionIndex === 0) {
        timerInt = setInterval(function () {
            quizTimer();
        }, 1000);
    }

    getQuestion();
}
startQuizButton.addEventListener('click', startQuiz);
questionChoices.addEventListener('click', checkAnswer);

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var choices = currentQuestion.choices;

    questionTitle.innerText = currentQuestion.question;
    questionChoices.innerHTML = '';

    for (var i = 0; i < choices.length; i++) {
        var choice = choices[i];
        var isCorrect = currentQuestion.answer === choice;

        questionChoices.insertAdjacentHTML('beforeend', `<button data-correct=${isCorrect}>${choice}</button`);
    }
}

function checkAnswer(event) {
    if ((event.target).closest('button').attributes[0].textContent === 'true') {
        // get answer feedback
        answerFeedback();
        // play sound for correct answer
        sfxCorrect.play();
    } else {
        // time penalisation 
        time -= 10;
        // get answer feedback
        answerFeedback();
        // play sound for incorrect answer
        sfxIncorrect.play();
    }
    // move to the next question
    if (currentQuestionIndex < questions.length - 1) {
        getQuestion(currentQuestionIndex++);
    } else {
        quizOver();
    }
}
questionChoices.addEventListener('click', checkAnswer);

function answerFeedback() {
    if ((event.target).closest('button').attributes[0].textContent === 'true') {
        feedback.classList.remove('hide');
        feedback.innerText = 'Correct!';
        setInterval(function () {
            feedback.classList.add('hide');
        }, 500);
    } else {
        feedback.classList.remove('hide');
        feedback.innerText = 'Wrong...';
        setInterval(function () {
            feedback.classList.add('hide');
        }, 500);
    }
}

function quizOver() {
    // stop timer
    clearInterval(timerInt);
    timerEl.textContent = time;

    var endScreen = document.querySelector("#end-screen");
    endScreen.classList.remove('hide');

    // show final score
    var finalScoreEl = document.querySelector("#final-score");
    finalScoreEl.textContent = time;

    // hide questions & feedback section
    questionsWrap.classList.add('hide');
    feedback.classList.add('hide');
}

function saveHighscore() {
    // get value of input box
    var userInitials = initials.value.toUpperCase();
    // check if user entered initials in the input box
    if (userInitials === "") {
        alert("Your initials input should not be blank");
    } else if (userInitials.length > 3) {
        alert("Your input should not be longer than 3 characters");
    } else {
        // retreive the existing saved scores from localStorage
        var highscores;
        if (JSON.parse(localStorage.getItem("highscores")) != null) {
            highscores = JSON.parse(window.localStorage.getItem("highscores"));
        } else {
            highscores = [];
        }
        // create score object for current user
        var newUserScore = {
            initials: userInitials,
            score: time
        };
        highscores.push(newUserScore);
        // save score to the localStorage
        localStorage.setItem("highscores", JSON.stringify(highscores));
        // get user to next page
        location.href = "highscores.html";
    }
}
// add event for when the user clicks button to submit initials
submitButton.addEventListener('click', saveHighscore);
