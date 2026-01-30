/* jshint esversion: 6 */


//Action elements//
const quizForm = document.getElementById("quizForm");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
const result = document.getElementById("result");
const answeredCount = document.getElementById("answeredCount");
const TOTAL = 10;


//Answered count update//

function updateAnsweredCount() {
    let answered = 0;
    for (let i = 1; i <= TOTAL; i++) {
        const name = "q" +i;
        if (document.querySelector(`input[name="${name}"]:checked`)) {
            answered++;
        }
    }
    answeredCount.textContent = answered;
}

function valdidateAllAnswered() {
    for (let i = 1; i <= TOTAL; i++) 
        if (!document.querySelector(`input[name="q${i}"]:checked`)) {
            return i;
        }

    return null;
}


//Listener and count//
quizForm.addEventListener("change", updateAnsweredCount);
updateAnsweredCount();


