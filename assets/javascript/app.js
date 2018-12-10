var time = 60
var intervalId

// setInterval(function() {
//     time--
//     $("#timer-display").text("Time: " + time);
//     console.log(time)
// }, 1000);

function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
};

function decrement() {
    time--
    $("#timer-display").text("Time: " + time);
    console.log(time)
    if (time === 0) {
        stop();
    }
}

function stop () {
    clearInterval(intervalId);
}

run();