// Storing user's score to localStorage
function displayHighscores() {
  // Grab scores from the localStorage
  var allHighscores = JSON.parse(localStorage.getItem("highscores"));
  if (allHighscores != null) {
    // for loop to go through scores and grab each one of them for display
    for(var i = 0; i < allHighscores.length; i++){
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
// Call displayHighscores function to run when the page loads
displayHighscores();