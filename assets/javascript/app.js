// Target HTML elements with jQuery
$timerDisplay = $("#timer-display");
$questionDisplay = $("#question-display");
$answersDisplay = $("#answers-display");
$actionDisplay = $("#action-display");
$scoreDisplay = $("#score-display");
$startDisplay = $("#start-display");
$gameDisplay = $("#game-display");
$finalScoreDisplay = $("#final-score-display");
$playerScore = $("#player-score");
$submitBtn = $("#submit-button");
$startBtn = $("#start-button");

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
    // Update time dynamically on page
    $timerDisplay.text("Time: " + time);
    if (time === 0) {
        stopTimer();
        $actionDisplay.text("Time's up!");
        reanimateAction();
        finalScore();
    }
}

function stopTimer() {
    clearInterval(intervalId);
}

function loadQuestion() {
    // Empty any previous rendered choices
    emptyChoices();
    // Send question text to HTML
    $questionDisplay.text("Question: " + questions[questionIndex].question);

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
    // Create a radio for each choice
    choices.forEach(function (choice, i) {
        let $div = $("<div>").attr({ "class": "form-check", "id": "form" + i });
        let $input = $("<input>").attr({ "class": "form-check-input", "type": "radio", "name": "choiceRadios", "id": "answer" + i, "value": choice });
        let $label = $("<label>").attr({ "class": "form-check-label", "for": "answer" + i })
        $label.text(choice);

        // Append the input and label to the parent div
        $div.append($input);
        $div.append($label);
        // Send the new radio to the page
        $answersDisplay.prepend($div)
    });
}

function emptyChoices() {
    $answersDisplay.empty();
    choices = [];
}

function shuffleArray(array) {
    // Using the Fisher-Yates shuffle to randomize an array
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function reanimateAction() {
    // This function uses .width() to trigger a DOM reflow so that our CSS animation can run again
    $actionDisplay.removeClass("stretchAnimate");
    $actionDisplay.width();
    $actionDisplay.addClass("stretchAnimate");
}

function scorePoint() {
    score++
    $scoreDisplay.text("Score: " + score);
}

function startGame() {
    $actionDisplay.addClass("stretchAnimate");
    loadQuestion();
    startTimer();
}

function finalScore() {
    $gameDisplay.addClass("hideDiv");
    $finalScoreDisplay.removeClass("hideDiv");
    $playerScore.text(score);
}

$startBtn.click(function () {
    $startDisplay.addClass("hideDiv");
    $gameDisplay.removeClass("hideDiv");
    startGame();
})


// Submit on-click event that evaluates answer and tallys the player's score
$submitBtn.click(function () {
    let playerChoice = $('#answers-display input:radio:checked').val();
    console.log(playerChoice);
    // If the player is correct, give them a point and move to the next question
    if (playerChoice === answer) {
        scorePoint();
        questionIndex++
        $actionDisplay.text("Correct!");
        reanimateAction();
        loadQuestion();
    }
    // otherwise, just move on to the next question
    else {
        questionIndex++
        $actionDisplay.text("Oops! Wrong answer.");
        reanimateAction();
        loadQuestion();
    }
    // If the player hits submit on the last question,
    if (questionIndex === 9) {
        // send them to the end of the quiz
        finalScore();
    }
});