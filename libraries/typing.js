var typeText = document.querySelector(".typeText")
var textToBeTyped = "Together, we can end police violence \n\t\t\t and advance racial justice."
var index = 0

function playAnim() {
  setTimeout(function () {
    // set the text of typeText to a substring of the text to be typed using index.
    typeText.innerText = textToBeTyped.slice(0, index)
      // adding text
      if (index > textToBeTyped.length) {
        playAnim();
        return
      } else {
        index++;
      }
    playAnim();
  }, 120)
}

var element_position = $('#section11').offset().top;

$(window).on('scroll', function() {
    var y_scroll_pos = window.pageYOffset;
    var scroll_pos_test = element_position;

    if(y_scroll_pos > scroll_pos_test-500) {
        playAnim();
    }
});

