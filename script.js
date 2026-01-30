/* jshint esversion: 6 */


//Answer counter//
const quizForm = document.querySelector("form");
const answeredCount = document.getElementById("answeredCount");
const TOTAL = 10;

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
//Listener and count//
quizForm.addEventListener("change", updateAnsweredCount);
updateAnsweredCount();
