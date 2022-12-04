// Reference variables for the quiz DOM elements
var questions = document.getElementById("questions");
var choices = document.getElementById("choices");
var startQuizButton = document.getElementById("start");
var submitButton = document.getElementById("submit");
var timerEl = document.getElementById("time");
var initials = document.getElementById("initials");
var feedback = document.getElementById("feedback");
// Other needed variables for the quiz
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;


function timer() {
    // decrease time every second
    time--;
    timerEl.textContent = time;
}