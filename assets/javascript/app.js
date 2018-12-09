var timer = 60
setInterval(function() {
    timer--
    $("#timer-display").text(timer);
    console.log(timer)
}, 1000);

// function countDown = {
//     timer--
//     $("#timer-display").text(timer);
//     console.log(timer)
// }


// $("#timer-display").text(timer);