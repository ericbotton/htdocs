
buttonColors = ["red", "blue", "green", "yellow"];
keyMap       = { r:"red", b:"blue", g:"green", y:"yellow" };
gamePattern = [];
userClickPattern = [];
var started = false;
var level = 0;

// Start Here -> Check Response -> Game Over!

$(".start").click(function () {
  if (!started) {
    $(".level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Check Answer
function checkAnswer(currentLevel) {
  if (userClickPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    $(".level-title").text("Fail! Game Over");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    setTimeout(function() {
      $(".level-title").html("Failed! Click <span class='start'>HERE</span> to reStart");
    }, 2000);

  }
}

// Game Over!
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

$(".btn").click(function() {
  userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickPattern.length - 1);
});

$(document).keypress(function(e) {
  userChosenColor = keyMap[e.key];
  userClickPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickPattern.length - 1);
});

function playSound(name) {
  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.volume = 0.33;
  buttonSound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userClickPattern = [];
  level++;
  $(".level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(10).fadeIn(10).fadeOut(10).fadeIn(100);
  playSound(randomChosenColor);
};



// for(var i=0;i<10;i++){nextSequence();};
console.log(started);
