/* jshint esversion: 6 */

//ELEMENTS//
const quizForm = document.getElementById("quizForm");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
const answeredCount = document.getElementById("answeredCount");
const progressBar = document.getElementById("progressBar");
const scoreDialog = document.getElementById("scoreDialog");
const scoreText = document.getElementById("scoreText");
const closeDialogBtn = document.getElementById("closeDialogBtn");

const TOTAL = 10;

//ANSWER KEY//
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

//MESSAGES//
function showMessage(text) {
    message.textContent = text;
    message.style.display = text ? "block" : "none";
}   

//PROGRESS + COUNT//
function updateAnsweredCount() {
    let answered = 0;

    for (let i = 1; i <= TOTAL; i++) {
        if (document.querySelector(`input[name="q${i}"]:checked`)) {
            answered++;
        }
    }
    
answeredCount.textContent = answered;
const percent = (answered / TOTAL) * 100;
    progressBar.style.width = percent + "%";
}

//VALIDATION//
function validateAllAnswered() {
    for (let i = 1; i <= TOTAL; i++) {
        if (!document.querySelector(`input[name="q${i}"]:checked`)) {
            return i;
        }
    }
    return null;
}

//SCORING//
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


//SHOW CORRECT / INCORRECT //
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

//fieldset when correct/incorrect//
    if (chosen && chosen.value === correctValue) {
        fs.classList.add("correct");}
       else {
        fs.classList.add("incorrect");
       }
    
//Label highlighting//
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



//RESET FUNCTIONS FOR OPTIONS, PROGRESS COUNT AND DIALOGUE CLOSE//
function resetUI() {
    quizForm.reset();

    showMessage("");
    scoreText.textContent = "";

    //clear correct/incorrect highlights//
    quizForm.querySelectorAll("fieldset").forEach(fs => {
        fs.classList.remove("correct", "incorrect")});

        quizForm.querySelectorAll("label").forEach(label => {
            label.classList.remove("correctChoice", "wrongChoice");
        });

        //reset progress and count
        answeredCount.textContent = "0";
        progressBar.style.width = "0%";

        updateAnsweredCount();  
    }

//EVENTS//
//UPDATE AS USERS ANSWER//
quizForm.addEventListener("change", updateAnsweredCount);

//SUBMIT>VALIDATE>SCORE>SHOW>HIGHLIGHT ANSWERS//
quizForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const missing = validateAllAnswered();
    if (missing) {
        showMessage(`Please answer question ${missing} before submitting.`);
        return;
    }

    const score = calculateScore();
    showMessage("Thank you for completing the quiz!");

const scoreMessage = `You scored ${score} out of ${TOTAL}.`;
    scoreText.textContent = scoreMessage;

    if (typeof scoreDialog.showModal === "function") {
        scoreDialog.showModal();
    }else {
        alert(scoreMessage);
    }

    showCorrectAnswers();
});

//RESET BUTTON//
resetBtn.addEventListener("click", resetUI);
    

//PLAY AGAIN BUTTON PRESSED TO CLOSE DIALOGUE BOX AND RESET//
closeDialogBtn.addEventListener("click", function(){
    scoreDialog.close();
});

scoreDialog.addEventListener("close", resetUI);

//Initial count update//
updateAnsweredCount();  
showMessage("");    
