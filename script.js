//all required elements
const startButton = document.querySelector(".startButton button");
const infoBox = document.querySelector(".infoBox");
const quitButton = infoBox.querySelector(".buttons .quit");
const continueButton = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quizBox");

//when start quiz button is clicked
startButton.onclick = ()=>{
    infoBox.classList.add("activateInfo"); //shows info box
}

//when quit quiz button is clicked
quitButton.onclick = ()=>{
    infoBox.classList.remove("activateInfo"); //hides info box
}

//when continue button is clicked
continueButton.onclick = ()=>{
    infoBox.classList.remove("activateInfo"); //hides info box
    quizBox.classList.add("activateQuiz"); //show quiz
}
