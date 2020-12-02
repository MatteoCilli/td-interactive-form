// Techdegree 3rd Project, Interactive form, by Matteo Cilli


// Resets form upon page load
$('form')[0].reset();
// Sets focus to #name
$("#name").focus();


//***** BASIC INFO

//** JOB ROLES

// hide other jobs title upon load
$('.other-job-role').hide();
// on change
$('#title').on('change', () => {
    // if job selector is other
    if ($('#title').val() == "other") {
        // show the once forgotten other jobs thing
        $('.other-job-role').slideDown();
    } else {
        // or else prepare for a thousand years of darkness
        $('.other-job-role').slideUp();
    }
});


//** T-SHIRT INFO

// starting with size set to small
$('#size').val('small').show();
// t-shirt colors currently in reserve
$('#shirt-colors').hide();
// adds blue border
$('#design').css("border", "#45a1ff solid 2px");



// when t-shirt design is changed
$('#design').on('change', () => {
    // if js puns is selected
    if ($('#design option').eq(1).is(':selected')) {
        // show t-shirt colors box
        $('#shirt-colors').slideDown();
        // shows all color options
        $('#shirt-colors option').show();
        // hide I love JS option
        $('#shirt-colors option').slice(4, 8).hide();
        // cornflowerblue as initial option
        $('#color').val('cornflowerblue').show();
        // remove blue border
        $('#design').css("border", "#666 solid .5px");
    } // else if I love JS is selected
    else if ($('#design option').eq(2).is(':selected')) {
        // show t-shirt colors box
        $('#shirt-colors').slideDown();
        // shows all color options
        $('#shirt-colors option').show();
        // hide I love JS option
        $('#shirt-colors option').slice(0, 4).hide();
        // tomato as initial option
        $('#color').val('tomato').show();
        // remove blue border
        $('#design').css("border", "#666 solid .5px");
    } else {
        // hide t-shirt colors box
        $('#shirt-colors').hide();
        // adds blue border
        $('#design').css("border", "#45a1ff solid 2px");
    }
});


//***** REGISTER FOR ACTIVITIES

//** SELECTING ACTIVITIES


// functions to decrease opacities when activities are the same time
$('.activities').on('change', () => {
    if ($('.activities input').eq(1).is(':checked')) {
        $('.activities input').eq(3).attr('disabled', true);
        $('.activities label').eq(3).css("opacity", "0.5");
    } else if ($('.activities input').eq(3).is(':checked')) {
        $('.activities input').eq(1).attr('disabled', true);
        $('.activities label').eq(1).css("opacity", "0.5");
    } else {
        $('.activities input').filter(':eq(1), :eq(3)').attr('disabled', false);
        $('.activities label').filter(':eq(1), :eq(3)').css("opacity", "1");
    }
});

$('.activities').on('change', () => {
    if ($('.activities input').eq(2).is(':checked')) {
        $('.activities input').eq(4).attr('disabled', true);
        $('.activities label').eq(4).css("opacity", "0.5");
    } else if ($('.activities input').eq(4).is(':checked')) {
        $('.activities input').eq(2).attr('disabled', true);
        $('.activities label').eq(2).css("opacity", "0.5");
    } else {
        $('.activities input').filter(':eq(2), :eq(4)').attr('disabled', false);
        $('.activities label').filter(':eq(2), :eq(4)').css("opacity", "1");
    }
});


//** CALCULATING TOTAL AMOUNT


// set sum to 0
let $sum = 0;
// text span for total amount
const $total = $('#activities-cost');
// span for sum amount
let $sumText = $('<span id="activity-cost"></span>');
// append sum to respective span
$sumText.append($sum);
// append sum span to total span
$total.append($sumText);
// bold using CSS
$total.css("font-weight", "bold");
// appends total text to end of activities class
$('.activities').append($total);
// show activities-hint
$('.activities-hint').show();

//* and now for the real deal

// function for the total amount of chosen activities
$('.activities input').on('change', event => {
    // set event target as a variable
    const $eventTarget = $(event.target);
    // get the event target's name attribute
    const $name = $eventTarget.attr('name');
    // condition to assess if checkbox is checked
    if ($eventTarget.is(':checked')) {
        // if checked and name attribute is 'all'
        if ($name === 'all') {
            // add $200 to sum
            $sum += 200;
            // if checked and attribute is not 'all'
        } else {
            // add $100 to the sum
            $sum += 100;
        }
    } else {
        // if not unchecked and name attribute is 'all'
        if ($name === 'all') {
            // detract $200 from the sum
            $sum -= 200;
            // if not unchecked and name attribute is not 'all'
        } else {
            // detract $100 from the sum
            $sum -= 100;
        }
    }
    // populate activity cost with text containing sum amount
    $('#activity-cost').text($sum);
    // if nothing is selected beat the devil out of activities-hint
    if ($sum === 0) {
        $('.activities-hint').css("opacity", "1");
    } else {
        $('.activities-hint').css("opacity", "0");
    }
});


//*****PAYMENT INFO

// credit card as default method
$('#payment').val('credit-card').show();
// hide PP infobox when loaded
$('#paypal').hide();
// hide btc infobox when loaded
$('#bitcoin').hide();


// function for changes in the payment box dropdown
$('#payment').on('change', () => {
    // switch to check value of the payment method
    switch ($('#payment').val()) {
        // when CC selected, show CC-related info, hide the rest
        case 'credit-card':
            $('#paypal').hide();
            $('#bitcoin').hide();
            $('#credit-card').show();
            break;
            // when PP selected, show PP-related info, hide the rest
        case 'paypal':
            $('#credit-card').hide();
            $('#bitcoin').hide();
            $('#paypal').show();
            break;
            // when BTC selected, show BTC-related info, hide the rest
        case 'bitcoin':
            $('#credit-card').hide();
            $('#paypal').hide();
            $('#bitcoin').show();
            break;
    }
});


//***** VALIDATION

//** Basic Info Validation variables

// submit button
const $submitButton = $('button');
// error span for submit button
const $buttonErrorSpan = $('#button-error');
// success span for submit button
const $buttonSuccessSpan = $('#button-success');
// hide submit error button
$buttonErrorSpan.hide();
// hide submit success button
$buttonSuccessSpan.hide();
// name input
const $nameInput = $('#name');
// email input
const $emailInput = $('#email');
// by default show name-hint1 error (alphabetical)
$('#name-hint1').css("opacity", "1");
// by default hide name-hint2 error (no name)
$('#name-hint2').css("opacity", "0");

//**NAME INPUT VALIDATION

// function for name input validation on keyup
$nameInput.keyup(() => {
    // name input value
    const $nameVal = $nameInput.val();
    // name input regex
    const $nameRegex = /^[a-zA-Z]+(\s[a-zA-Z]+)?(\s)?$/i;
    // conditional statement if name value is not empty
    if ($nameVal != "") {
        // if not empty hide name input error message
        $('#name-hint1').css("opacity", "0");
        // if name value does not match regex
        if (!$nameVal.match($nameRegex)) {
            // show name error
            $('#name-hint2').css("opacity", "1");
        } else {
            // hide name error
            $('#name-hint2').css("opacity", "0");
        }
    } else { // if name value is empty
        // hide name error
        $('#name-hint2').css("opacity", "0");
        // show blank name error
        $('#name-hint1').css("opacity", "1");
    }
});


//**EMAIL INPUT VALIDATION

// function for email input validation on keyup
$emailInput.keyup(() => {
    // email input value
    const $emailVal = $emailInput.val();
    // email input regex
    const $emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i;
    // conditional statement if email input does not match regex
    if (!$emailVal.match($emailRegex)) {
        // show email error
        $('#email-hint').css("opacity", "1");
    } else {
        // hide email error
        $('#email-hint').css("opacity", "0");
    }
});


//** CHECKBOX VALIDATION
// already done