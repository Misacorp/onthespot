document.addEventListener('contextmenu', event => event.preventDefault());

$(document).ready(function() {
  console.log("Document ready");
});

var score_left = 0;
var score_right = 0;

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