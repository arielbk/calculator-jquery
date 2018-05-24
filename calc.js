var result = null;
var other = null;
var operator = null;

var finished = false;

// boolean to deterimine whether its time for new input
var next = false;

$('button').click( function() {

  var display = $('input#display');

  // IF A NUMBER IS PRESSED

  if ($(this).val() && next && operator) {

    display.val($(this).val());
    other = $(this).val();
    next = false;

  } else if ($(this).val() && finished) { // Showing equation result, but entering number to reset

    result = null;
    other = null;
    operator = null;
    display.val($(this).val());
    finished = false;

  } else if ($(this).val() && operator && other) { // adding to 'other' number

    display.val(display.val() + $(this).val());
    other = display.val();

  } else if ($(this).val()) { // Otherwise keep appending to the display

    // Write the chosen digit to the display
    display.val(display.val() + $(this).val());

  }


  // IF ANYTHING ELSE IS PRESSED

  // if clear button is pressed then everything is reset
  if ($(this).is('#clearButton')) {
    result = null;
    other = null;
    operator = null;
    next = false;
    display.val('');
  }

  // if operator buttons are pushed
  if ($(this).is('#addButton') ||
      $(this).is('#subtractButton') ||
      $(this).is('#multiplyButton') ||
      $(this).is('#divideButton')) {
    if (result && operator && !finished && !next) {
      other = display.val();
      result = calculate(result, other, operator);
      display.val(result);
    }
    result = display.val();
    if ($(this).is('#multiplyButton')) {
      operator = '*';
    } else if ($(this).is('#divideButton')) {
      operator = '/';
    } else {
      operator = $(this).html();
    }
    next = true;
  }

  // if the equals sign is pushed
  if ($(this).html() == '=' &&
      !next && result && operator && display.val() && display.val() != '') {

    result = calculate(result, other, operator);

    // display the result
    display.val(result);

    finished = true;

  }
});

// the endgame function
function calculate(x, y, operator) {
  // convert strings to numbers to calculate
  x = Number(x);
  y = Number(y);

  var result;

  switch(operator) {
    case '+':
      result = x+y;
      break;
    case '-':
      result = x-y;
      break;
    case '*':
      result = x*y;
      break;
    case '/':
      if (x == 0 || y == 0) {
        result = 'Infinity';
      } else {
        result = x/y;
      }
      break;
  }

  if (result > 99999999999999) {
    result = 'Infinity'
  }

  if (result % 1 != 0) {
    result *= 1000000000000;
    result = Math.round(result);
    result /= 1000000000000;
  }

  if (result > 0 && result < 1e-12) {
    result = 0;
  }

  if (result < -9999999999999) {
    result = '-Infinity'
  }

  return result;
}
