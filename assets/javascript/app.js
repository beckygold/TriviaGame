// --- Timer ---
var time = 60
var intervalId
var questionIndex = 0;

function startTimer() {
    clearInterval(intervalId);
    intervalId = setInterval(decrementTimer, 1000);
};

function decrementTimer() {
    time--
    $("#timer-display").text("Time: " + time);
    console.log(time)
    if (time === 0) {
        stopTimer();
    }
}

function stopTimer() {
    clearInterval(intervalId);
}

function loadQuestion() {

}

startTimer();


// Submit on-click event that evaluates answer and tallys the player's score
submit.onclick = function () {

}