// BEGIN CONTENT
//  This sets the stage for the show. Would be nice to have a UI that helps build it on the page itself, right?

var content = [
  "<div style=\"min-height: 10vh\"></div>",
  "1. Uusi supersankari",
  "<img class=\"valign center responsive-img\" src=\"img/superhero1.jpg\">",
  "<img class=\"valign center responsive-img\" src=\"img/superhero2.jpg\">",
  "2. Yhdessä paremmin",
  "Kuinka tehdä hyvä joulu?",
  "Vastaus 1",
  "Miten saa seurustelukumppanin?",
  "Vastaus 2",
  "3. Aakkosnäytelmä",
  "<span class=\"blue-text\">Henkilö 1</span> on Jehovan todistaja, joka yrittää ängetä ovesta sisään kertomaan jumalastaan. <span class=\"purple-text\">Henkilö 2</span> on juuri murhannut ihmisen, eikä halua sen paljastuvan.",
  "<span class=\"red-text\">Henkilö 1</span> on turisti, joka luulee tulleensa matkamuistokauppaan. <span class=\"orange-text text-darken-2\">Henkilö 2</span> on rukouspalvelija, joka alkaa profetoida <span class=\"red-text\">Henkilön 1</span> elämästä."
];


// END CONTENT

document.addEventListener('contextmenu', event => event.preventDefault());

var score_left = 0;
var score_right = 0;
var timeout_visible = false;
var content_number = 0;
var first_content = true;
var CONTENT_ANIM_SPEED = 500;
var anim_complete = true;

// TIMER
var sTime;
var countDown = 60;     //  Countdown timer start value
var counter;

$(document).ready(function() {
  console.log("Document ready");
  $('#timer-value').html(countDown);
  $('#content_1').html(content[content_number]);
  $('#button-left').hide();
});

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
  if(timeout_visible) {
    toggleTimeout();
    resetTimer(); 
  }
});


function toggleTimeout() {
  if(timeout_visible) {
    $('#timeout').animate({
      top: "-25%",
    },300, function() {
      timeout_visible = false;
      return;
    });
  }
  else {
    $('#timeout').animate({
      top: "45%",
    }, 500,function() {
      timeout_visible = true;
    });
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






//  Keyboard commands.
$(document).keydown(function(e) {
  console.log("Key " + e.which + " pressed.");
  
  //  Left and right keys scroll content.
  if(e.which == 37) {
    prevContent();
  }
  if(e.which == 39) {
    nextContent();
  }

  //  Enter key updates answer.
  if(e.which == 13) {
    updateAnswer();
  }

  //  Up arrow moves timeout notification away.
  if(e.which == 38) {
    if(timeout_visible) {
      toggleTimeout();
      resetTimer();
    }
  }

  //  Decrease font size from comma (,)
  if(e.which == 186) {
    decreaseFontSize();
  }

  //  Increase font size from period (.)
  if(e.which == 219) {
    increaseFontSize();
  }

});

$('#button-right').click(function() {
  nextContent();
});

$('#button-left').click(function() {
  prevContent();
});

function prevContent() {
  //  If scrolling to first page, hide back button.
  if(content_number == 1) {
    $('#button-left').hide();
  }

  //  Make sure forward button is showing.
  $('#button-right').show();

  if(anim_complete) {
    if(content_number > 0) {
      content_number--;
      //  If first content is visible
      if(first_content) {
        //  Disable animation stacking for duration of animation.
        anim_complete = false;
        //  Move content 1 container out of screen to the right.
        $('#content_1').animate({
          "left": "150%",
        },CONTENT_ANIM_SPEED, function() {
          //  Re-enable animations.
          anim_complete = true;
          $('#content_1').css({
            "left": "-150%",
          });
        });

        //  Update content 2 container value.
        $('#content_2').html(content[content_number]);

        //  Move second content to the left so it slides in from the correct side.
        $('#content_2').css({
          "left": "-150%",
        });
      
        //  Disable animation stacking for duration of animation.
        anim_complete = false;

        //  Move content 2 container into middle of screen.
        $('#content_2').animate({
          "left": "15%",
        },CONTENT_ANIM_SPEED,function() {
          //  Re-enable animations.
          anim_complete = true;
        });
        first_content = !first_content;
      }
      else {
        //  Disable animation stacking for duration of animation.
        anim_complete = false;

        //  Move content 2 container out of screen to the right.
        $('#content_2').animate({
          "left": "150%",
        },CONTENT_ANIM_SPEED, function() {
          //  Re-enable animations
          anim_complete = true;
          $('#content_2').css({
            "left": "-150%",
          })
        });

        //  Update content 1 container value.
        $('#content_1').html(content[content_number]);

        //  Move content 1 to the left so it slides in from the right side.
        $('#content_1').css({
          "left": "-150%",
        });

        //  Disable animation stacking for duration of animation.
        anim_complete = false;
      
        //  Move content 1 container into middle of screen.
        $('#content_1').animate({
          "left": "15%",
        },CONTENT_ANIM_SPEED,function() {
          //  Re-enable animations.
          anim_complete = true;
        });
        first_content = !first_content;
      }
    }
    else {
      anim_complete = false;
      $('#content_1').animate({
        "left": "25%",
      },CONTENT_ANIM_SPEED/4,function() {
        $('#content_1').animate({
          "left": "15%",
        },CONTENT_ANIM_SPEED/4,function() {
          anim_complete = true;
        });
      });
    }
  }
}




function nextContent() {
  //  If scrolling to first page, hide back button.
  if(content_number == content.length-2) {
    $('#button-right').hide();
  }

  //  Make sure forward button is showing.
  $('#button-left').show();

  if(anim_complete) {
    if(content_number < content.length-1) {
      content_number++;

      if(first_content) {
        //  Disable animation stacking for duration of animation.
        anim_complete = false;

        //  Move content 1 container out of screen to the left.
        $('#content_1').animate({
          "left": "-150%",
        },CONTENT_ANIM_SPEED, function() {
          //  Re-enable animations.
          anim_complete = true;
          $('#content_1').css({
            "left": "150%",
          });
        });

        //  Update content 2 container value.
        $('#content_2').html(content[content_number]);

        //  Move content 2 to the right so it slides in from the correct side.
        $('#content_2').css({
          "left": "150%",
        });

        //  Disable animation stacking for duration of animation.
        anim_complete = false;

        //  Move content 2 container into middle of screen.
        $('#content_2').animate({
          "left": "15%",
        },CONTENT_ANIM_SPEED,function() {
          //  Re-enable animations
          anim_complete = true;
        });
        first_content = !first_content;
      }
      else {
        //  Disable animation stacking for duration of animation.
        anim_complete = false;

        //  Move content 2 container out of screen to the left.
        $('#content_2').animate({
          "left": "-150%",
        },CONTENT_ANIM_SPEED, function() {
          //  Re-enable animations.
          anim_complete = true;
          $('#content_2').css({
            "left": "150%",
          })
        });

        //  Update content 1 container value.
        $('#content_1').html(content[content_number]);

        //  Move content 1 to the right so it slides in from the correct side.
        $('#content_1').css({
          "left": "150%",
        });

        //  Disable animation stacking for duration of animation.
        anim_complete = false;

        //  Move content 1 container into middle of screen.
        $('#content_1').animate({
          "left": "15%",
        },CONTENT_ANIM_SPEED,function() {
          //  Re-enable animations.
          anim_complete = true;
        });
        first_content = !first_content;
      }
    }

    else {
      if(first_content) {
        anim_complete = false;
        $('#content_1').animate({
          "left": "5%",
        },CONTENT_ANIM_SPEED/4,function() {
          $('#content_1').animate({
            "left": "15%",
          },CONTENT_ANIM_SPEED/4,function() {
            anim_complete = true;
          });
        });
      }
      else {
        anim_complete = false;
        $('#content_2').animate({
          "left": "5%",
        },CONTENT_ANIM_SPEED/4,function() {
          $('#content_2').animate({
            "left": "15%",
          },CONTENT_ANIM_SPEED/4,function() {
            anim_complete = true;
          });
        });
      }
    }
  }
}

$('#send').click(function() {
  updateAnswer();
});

function updateAnswer() {
  //  Update answers to questions. This is hard coded to the array values so change these if you add or remove content items.
  if(content_number == 5 || content_number == 6) {
    content[6] = "<span class=\"blue-text\">" + $('#kirjoitus').val() + "</span>";
  }
  if(content_number == 7 || content_number == 8) {
    content[8] = "<span class=\"red-text\">" + $('#kirjoitus').val() + "</span>";
  }
}

function getFontSize() {
  var size = $('.card-panel').css('font-size');
  size = size.replace(/[^\d\.]/g, '');
  return parseInt(size);
}

function decreaseFontSize() {
  $('.card-panel').css({
    "font-size": getFontSize() - 10,
  });
}

function increaseFontSize() {
  $('.card-panel').css({
    "font-size": getFontSize() + 10,
  });
}