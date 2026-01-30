/* jshint esversion: 6 */


//Action elements//
const quizForm = document.getElementById("quizForm");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
const result = document.getElementById("result");
const answeredCount = document.getElementById("answeredCount");
const progressBar = document.getElementById("progressBar");
const TOTAL = 10;
const scoreDialog = document.getElementById("scoreDialog");
const scoreText = document.getElementById("scoreText");
const closeDialogBtn = document.getElementById("closeDialogBtn");


//Correct Answers//
const answers = {
    q1: "C",
    q2: "B",
    q3: "B",
    q4: "D",
    q5: "B",
    q6: "C",
    q7: "C",
    q8: "A",
    q9: "C",
    q10: "B"
};

//Show message on bar//
function showMessage(text) {
    message.textContent = text;
    message.style.display = text ? "block" : "none";
}   


//Progress bar//

function updateProgressBar() {
    const answered = parseInt(answeredCount.textContent, 10) || 0;
    const progressPercent = (answered / TOTAL) * 100;
    progressBar.style.width = progressPercent + "%";
}


//Answered count update//

function updateAnsweredCount() {
    let answered = 0;
    for (let i = 1; i <= TOTAL; i++) {
        if (document.querySelector(`input[name="q${i}"]:checked`)) {
            answered++;
        }
    }

    answeredCount.textContent = answered;
    updateProgressBar();
}

//Validation for all answered//
function validateAllAnswered() {
    for (let i = 1; i <= TOTAL; i++) 
        if (!document.querySelector(`input[name="q${i}"]:checked`)) {
            return i;
        }
    return null;
}

//Calculating scores//
function calculateScore() {
    let score = 0;
    for (let i = 1; i <= TOTAL; i++) {
    const chosen = document.querySelector(`input[name="q${i}"]:checked`);
    if (chosen && chosen.value === answers[`q${i}`]) { 
        score++;
    }
    }
    return score;
}

//Show when incorrect or correct//
function showCorrectAnswers() {
    const fieldsets = quizForm.querySelectorAll("fieldset");

    for (let i = 1; i <= TOTAL; i++) {
    const fs = fieldsets[i - 1];
    const correctValue = answers[`q${i}`];
    const chosen = fs.querySelector(`input[name="q${i}"]:checked`);

//reset old fieldset and labels//
fs.classList.remove("correct", "incorrect");
fs.querySelectorAll("label").forEach(label => {
    label.classList.remove("correctChoice", "wrongChoice");
});

//Values for when correct/incorrect//
    if (chosen && chosen.value === correctValue) {
        fs.classList.add("correct");}
       else {
        fs.classList.add("incorrect");
       }
    
//Label correct and incorrect answers//
fs.querySelectorAll("label").forEach(label => {
    const input = label.querySelector('input[type="radio"]');
    if (!input) return;

    if (input.value === correctValue) {
        label.classList.add("correctChoice");
    }
    if (chosen && chosen.value !== correctValue && input === chosen) {
        label.classList.add("wrongChoice");
    }
});
}
}

//Function for reset quiz//
function resetQuiz() {
    quizForm.reset();
    showMessage("");
    result.textContent = "";

//clear correct/incrrect backgrounds//
document.querySelectorAll("fieldset").forEach(fs => {
    fs.classList.remove("correct", "incorrect");
});

//clear correct/incorrect labels //
document.querySelectorAll("label").forEach(label => {
    label.classList.remove("correctChoice", "wrongChoice");
});

//reset progress bar and counter //
answeredCount.textContent = "0";
progressBar.style.width = "0%";

//close dialog if open//
if (scoreDialog.open) {
    scoreDialog.close();
}
}

//close dialog to reset//
closeDialogBtn.addEventListener("click", function() {
    resetQuiz();
});


//Listener and count//
quizForm.addEventListener("change", updateAnsweredCount);

//Submit actions and block reload//
quizForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const missing = validateAllAnswered();
    if (missing) {
        showMessage(`Please answer question ${missing} before submitting.`);
        result.textContent = "";
        return;
    }

    const score = calculateScore();
    showMessage("Thank you for completing the quiz!");

//Dialogue box with score//
const scoreMessage = `You scored ${score} out of ${TOTAL}.`;
    scoreText.textContent = scoreMessage;

    if (typeof scoreDialog.showModal === "function") {
        scoreDialog.showModal();
    }else {
        alert(scoreMessage);
    }

showCorrectAnswers();

});

//Reset button//
resetBtn.addEventListener("click", function() {
    resetQuiz();
});

//Initial count update//
updateAnsweredCount();  
showMessage("");    