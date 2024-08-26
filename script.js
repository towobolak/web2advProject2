//all required elements
const startButton = document.querySelector(".startButton button");
const infoBox = document.querySelector(".infoBox");
const quitButton = infoBox.querySelector(".buttons .quit");
const continueButton = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quizBox");
const timeCount = quizBox.querySelector(".timer .timerSec");
const timeLine = quizBox.querySelector("header .timeLine");
const timeOff = quizBox.querySelector("header .timerText");


const optionList = document.querySelector(".optionList");


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
    showQuestions(0);
    queCounter(1);
    startTimer(20);
    startTimerLine(0)
}

let que_count = 0;
let que_numb = 1;
let counterLine;
let timeValue = 20;
let widthValue = 0;
let userScore = 0;

timeOff.textContent = "Time Left";

const nextPage = quizBox.querySelector(".nextPage");
const resultBox = document.querySelector(".resultBox");
const logOut = resultBox.querySelector(".buttons .logOut");

logOut.onclick = ()=>{
    window.location.reload();
}

nextPage.onclick = ()=>{
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        nextPage.style.display = "none";
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions completed");
        showResultBox();
    }

}
const previousPage = quizBox.querySelector(".previousPage")
previousPage.onclick = ()=>{
    que_count--;
    showQuestions(que_count)
}

function showQuestions(index){
    const queText = document.querySelector(".queText");
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>'
                    + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                    + '<div class="option">'+ questions[index].options[2] +'<span></span></div>'
                    + '<div class="option">'+ questions[index].options[3] +'<span></span></div>';
    queText.innerHTML = que_tag;
    optionList.innerHTML = option_tag;

    const option = optionList.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIcon ='<div class="icon tick"><i class="fa fa-check"></i></div>'
let crossIcon ='<div class="icon cross"><i class="fa fa-times"></i></div>'


function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = optionList.children.length;
    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is correct");    
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }else{
        answer.classList.add("incorrect");
        console.log("Answer is wrong");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        for (let i = 0; i < allOptions; i++) {
            if(optionList.children[i].textContent == correctAns){
                optionList.children[i].setAttribute("class", "option correct");
                optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled");
    }
    nextPage.style.display = "block";
}

function showResultBox(){
    quizBox.classList.remove("activateQuiz"); //hides quiz box
    resultBox.classList.add("activateResult"); //show result
    const scoreText = resultBox.querySelector(".scoreText");
    if(userScore > 30){
        let scoreTag = '<span>am Congrats!, you got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore < 30){
        let scoreTag = '<span>Nice, you got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>am sorry, you got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function queCounter(index){
    const page_counter = quizBox.querySelector(".totalQue");
    let totalQuescountTag = '<span>Page:<p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>';
    page_counter.innerHTML = totalQuescountTag;
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off";

            let correctAns = questions[que_count].answer;
            let allOptions = optionList.children.length;

        for (let i = 0; i < allOptions; i++) {
            if(optionList.children[i].textContent == correctAns){
                optionList.children[i].setAttribute("class", "option correct");
                optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
        for (let i = 0; i < allOptions; i++) {
            optionList.children[i].classList.add("disabled");
        }
        nextPage.style.display = "block";
        }
    }
}
function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}

