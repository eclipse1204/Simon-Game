var colors_array = ["red", "blue", "green", "yellow"];
var game_pattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function () {
    if (started == false)
    {
        started = true;
        $("h1").text("Level " + level);
        nextSequence();
    }
});

$(".btn").click(function (){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
    var random_num = Math.floor(Math.random() * 4);
    var color = colors_array[random_num];
    game_pattern.push(color);
    $("#" + color).fadeOut(100).fadeIn(100);
    playSound(color);
    level++;
    $("h1").text("Level "+level);
}

function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour)
{
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (game_pattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if (game_pattern.length ===userClickedPattern.length)
        {
            setTimeout(function () {
                userClickedPattern = [];
                nextSequence();
            }, 1000);

        }
    }
    else
    {
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver()
{
    level = 0;
    game_pattern = [];
    userClickedPattern = [];
    started = false;
}