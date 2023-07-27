var buttonColours = ["red", "blue", "green", "yellow"];

var userclickedPattern = [];
var gamePattern = [];
var keypresses = 0;
var level = 0;
var highScore=0;

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);

    var randomColour = buttonColours[randomNumber];

    gamePattern.push(randomColour);

    $("#" + randomColour).fadeOut(100).fadeIn(100);
    playsound(randomColour);
    $("h1").text("level " + level);
}

$(".btn").on("click", function () {
    userclickedPattern.push($(this).attr("id"));
    playsound($(this).attr("id"));
    animatePress($(this).attr("id"));
    checkanswer(userclickedPattern.length - 1);
});

$(document).on("keydown", function () {
    if (keypresses === 0) {
        level++;
        nextSequence();
        keypresses = 1;
    }
})

function playsound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function () { $("." + currentColour).removeClass("pressed") }, 100);
}

function checkanswer(currentLevel) {
    if (userclickedPattern[currentLevel] !== gamePattern[currentLevel]) {
        keypresses = 0;
        userclickedPattern=[];
        gamePattern=[];
        playsound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        highScore=Math.max(highScore,(level-1));
        level = 0;
        $(".ys").text("Your Score : ");
        $(".hs").text("High Score : "+highScore);
        setTimeout(function(){$("body").removeClass("game-over");},200);

    }
    else if (currentLevel === level-1) {
        userclickedPattern = [];
        level++;
        $(".ys").text("Your Score : "+(level-1));
        setTimeout(function () {nextSequence()}, 1000);
    }
}