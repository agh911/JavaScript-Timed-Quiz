// Storing user's score to localStorage
function displayHighscores() {
  // Grab scores from the localStorage
  var allHighscores = JSON.parse(localStorage.getItem("highscores"));
  if (allHighscores != null) {
    // sort highscores: high -> low
    allHighscores.sort(function (a, b) {
      return parseInt(b.score) - parseInt(a.score);
    });
    // for loop to go through scores and grab each one of them for display
    for (var i = 0; i < allHighscores.length; i++) {
      // create <li> tag
      var scoreLi = document.createElement("li");
      scoreLi.textContent = allHighscores[i].initials + " - " + allHighscores[i].score;
      // and display it on the board
      document.querySelector("#highscores").appendChild(scoreLi);
    }
  } else {
    var highscoreBoard = document.querySelector("#highscores");
    highscoreBoard.textContent = "Highscores Board Cleared";
    setInterval(function () {
      highscoreBoard.classList.add('hide');
    }, 1000);
  }
}

// Create function to clear the highscores board
function clearBoard() {
  localStorage.removeItem("highscores");
  location.reload();
}
// add event listener to the 'Clear' button and call function clearBoard
var clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", function () {
  clearBoard();
})

// Call displayHighscores function to run when the page loads
displayHighscores();