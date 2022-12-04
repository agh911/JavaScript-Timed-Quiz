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

function timer() {
    // decrease time every second
    time--;
    timerEl.textContent = time;
}

function startQuiz() {
    // add hide class to start screen
    var startScreen = document.querySelector('#start-screen');
    startScreen.classList.add('hide');

    // remove hide class for questions section
    questionsWrap.classList.remove('hide');

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


