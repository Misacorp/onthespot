document.addEventListener('contextmenu', event => event.preventDefault());

$(document).ready(function() {
  console.log("Document ready");
  $('#timer-value').html(countDown);
});

var score_left = 0;
var score_right = 0;
var timeout_visible = false;

$('#score-left').click(function() {
  score_left++;
  updateScores();
});

$('#score-left').contextmenu(function() {
  score_left--;
  updateScores();
});

$('#score-right').click(function() {
  score_right++;
  updateScores();
});

$('#score-right').contextmenu(function() {
  score_right--;
  updateScores();
});

function updateScores() {
  $('#score-left').html(score_left);
  $('#score-right').html(score_right);
}





// TIMER
var sTime;
var countDown = 2;     //  Countdown timer start value
var counter;

function UpdateTime() {
    var cTime = new Date().getTime();
    var diff = cTime - sTime;
    var seconds = countDown - Math.floor(diff / 1000);
    console.log(seconds);
    //show seconds
    if(seconds >= 0) {
      $('#timer-value').html(seconds);
    }
    else {
      clearInterval(counter);
    }

    //  Show time out message when counter is 0.
    if(seconds <= 0 && !timeout_visible) {
      console.log("UpdateTime calling timeOut()");
      timeOut();
    }
}

$('#timer-value').click(function() {    //  Reads from HTML value. Bad!
  timer_value = $('#timer-value').html();

  if(timer_value <= 0) {
    resetTimer();
  }
  else if(timer_value == countDown){
    sTime = new Date().getTime();
    counter = clearInterval(counter);
    counter = setInterval(UpdateTime, 500);

    // Bounce button a bit to let user know it started counting.
    // Actual code...
  }
  else {
    console.log("Countdown timer value is between 0 and 60.");
  }
})

$('#timer-value').contextmenu(function() {
  resetTimer();
})

function resetTimer() {
  // Reset timer to @countDown, but don't start it.
  $('#timer-value').html(countDown);
  counter = clearInterval(counter);

  // Reset time out info box css
  if(timeout_visible) {
    toggleTimeout();
  }
}

function startTimer() {
  // Start timer.
  // Doesn't automatically get new start time, use: sTime = new Date().getTime();
  counter = clearInterval(counter);
  counter = setInterval(UpdateTime, 500);
}

function timeOut() {
  // Do something cool when time runs out.
  toggleTimeout();
}

$('#timeout').click(function() {
  toggleTimeout();
});


function toggleTimeout() {
  if(timeout_visible) {
    $('#timeout').animate({
      top: "-25%",
    },300);
    timeout_visible = false;
    return;
  }
  else {
    $('#timeout').animate({
      top: "45%",
    }, 500);
    timeout_visible = true;
  }
}


// Hover colors for circles
$('#score-left').hover(function() {
  originalColor = $(this).parent().css("background-color");
  console.log(originalColor);

  changeColor($(this).parent(), "#65A9E9");
}, function() {
  changeColor($(this).parent(), originalColor)
});

$('#score-right').hover(function() {
  originalColor = $(this).parent().css("background-color");
  console.log(originalColor);

  changeColor($(this).parent(), "#FE7A6A");
}, function() {
  changeColor($(this).parent(), originalColor)
});

$('#timer-value').hover(function() {
  originalColor = $(this).parent().parent().css("background-color");
  console.log(originalColor);

  changeColor($(this).parent().parent(), "#21CB65");
}, function() {
  changeColor($(this).parent().parent(), originalColor)
});

//  Change @object's background color to @color.
function changeColor(object, color) {
  $(object).css("background-color", color);
}