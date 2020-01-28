// Global variables
var time = 60
var intervalId
var questionIndex = 0;
var choices = [];
var answer = "";
var score = 0;

function startTimer() {
    clearInterval(intervalId);
    intervalId = setInterval(decrementTimer, 1000);
};

function decrementTimer() {
    time--
    $("#timer-display").text("Time: " + time);
    if (time === 0) {
        stopTimer();
        $("#action-display").text("Time's up!");
    }
}

function stopTimer() {
    clearInterval(intervalId);
}

function loadQuestion() {
    // Empty any previous rendered choices
    emptyChoices();
    // Send question text to HTML
    $("#question-display").text("Question: " + questions[questionIndex].question);

    // Create an array of all possible answers
    let unshuffledChoices = [];

    // Add correct answer to choices array
    unshuffledChoices.push(questions[questionIndex].correct_answer);

    // Add incorrect answers to choices array
    for (let i = 0; i < questions[questionIndex].incorrect_answers.length; i++) {
        unshuffledChoices.push(questions[questionIndex].incorrect_answers[i])
    }

    // Shuffle array of choices
    shuffleArray(unshuffledChoices);

    let shuffledChoices = unshuffledChoices;

    // Send each item from the now shuffled array to the global variable
    shuffledChoices.forEach(function (choice) {
        choices.push(choice);
    })

    // Send answer to global variable
    answer = questions[questionIndex].correct_answer;
    renderChoices();
}

function renderChoices() {
    choices.forEach(function (choice, i) {
        let $div = $("<div>").attr({ "class": "form-check", "id": "form" + i });
        let $input = $("<input>").attr({ "class": "form-check-input", "type": "radio", "name": "choiceRadios", "id": "answer" + i, "value": choice });
        let $label = $("<label>").attr({ "class": "form-check-label", "for": "answer" + i })
        $label.text(choice);

        $div.append($input);
        $div.append($label);
        $("#answers-display").prepend($div)
    });
}

function emptyChoices(){
    $("#answers-display").empty();
    choices = [];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startGame() {
    loadQuestion();
    startTimer();
}

startGame();


// Submit on-click event that evaluates answer and tallys the player's score
$("#submit-button").click(function () {
    let playerChoice = $('#answers-display input:radio:checked').val();
    console.log(playerChoice);
    if (playerChoice === answer) {
        score++
        questionIndex++
        $("#action-display").text("Correct!");
        loadQuestion();
    } else {
        questionIndex++
        $("#action-display").text("Oops! Wrong answer.");
    }
});