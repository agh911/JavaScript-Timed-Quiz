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
var time = questions.length * 15;
var timerInt;
var userScore = 0;

function startQuiz() {
    // add hide class to start screen
    var startScreen = document.querySelector('#start-screen');
    startScreen.classList.add('hide');

    // remove hide class for questions section
    questionsWrap.classList.remove('hide');

    timerInt = setInterval(function () {
        // decrease time every second
        time--;
        timerEl.textContent = time;

        if (time < 1) {
            clearTimeout(timerInt);
            quizOver();
        }
    }, 1000);
    // show starting time
    timerEl.textContent = time;

    var currentQuestion = questions[currentQuestionIndex];
    var choices = currentQuestion.choices;

    questionTitle.innerText = currentQuestion.question;

    for (var i = 0; i < choices.length; i++) {
        var choice = choices[i];
        var isCorrect = currentQuestion.answer === choice;

        questionChoices.insertAdjacentHTML('beforeend', `<button data-correct=${isCorrect}>${choice}</button`);
    }
}

startQuizButton.addEventListener('click', startQuiz);

function checkAnswer(event) {
    if (event.target.attributes[0].nodeValue === 'true') {
        feedback.classList.remove('hide')
        feedback.innerText = 'Correct!'
        userScore += 10;
    } else {
        feedback.classList.remove('hide')
        feedback.innerText = 'Wrong...'
        if (userScore !== 0) {
            userScore -= 10;
        }
    }
}

questionChoices.addEventListener('click', checkAnswer);

function quizOver() {
    // show end screen
    var endScreen = document.querySelector("#end-screen");
    endScreen.classList.remove('hide');

    // show final score
    var finalScoreEl = document.querySelector("#final-score");
    finalScoreEl.textContent = time;

    // hide questions section
    questionsWrap.classList.add('hide');
}

