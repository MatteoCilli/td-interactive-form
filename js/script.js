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
// by default hide
$('.activities-hint').css("opacity", "0");


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
// name input
const $nameInput = $('#name');
// email input
const $emailInput = $('#email');
// by default hide name-hint1 error (alphabetical)
$('#name-hint1').css("opacity", "0");
// by default hide name-hint2 error (no name)
$('#name-hint2').css("opacity", "0");

//**EMAIL INPUT VALIDATION

// by default hide name-hint1 error (alphabetical)
$('#email-hint').css("opacity", "0");

//**PAYMENT VALIDATION

// payment method
const $paymentMethod = $('#payment');
// credit card number
const $ccNum = $('#cc-num');
// by default show CC error
$('#cc1-hint').css("opacity", "0");

// ZIP code
const $zip = $('#zip');
// by default show ZIP error
$("#zip-hint").css("opacity", "0");

// CVV code
const $cvv = $('#cvv');
// by default show ZIP error
$("#cvv-hint").css("opacity", "0");

//***** BUTTON VALIDATION

// function for submit button validation upon click
$submitButton.on('click', e => {
    // name input value
    const $nameVal = $nameInput.val();
    // name input regex
    const $nameRegex = /^[a-zA-Z]+(\s[a-zA-Z]+)?(\s)?$/i;
    // email input value
    const $emailVal = $emailInput.val();
    // email input regex
    const $emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/i;

    // if name value is empty or does not match regex
    if ($nameVal == "" || !$nameVal.match($nameRegex)) {
        // prevent button default action
        e.preventDefault();
        // show button error
        $buttonErrorSpan.show();
        $('#name-hint1').css("opacity", "1");
    } else {
        // hide button error
        $buttonErrorSpan.hide();
        $('#name-hint1').css("opacity", "0");
    }
    // if email value does not match regex
    if (!$emailVal.match($emailRegex)) {
        // prevent button default action
        e.preventDefault();
        // show button error
        $buttonErrorSpan.show();
        $('.email-hint').css("opacity", "1");
    } else {
        // hide button error
        $buttonErrorSpan.hide();
        $('.email-hint').css("opacity", "0");
    }
    // if there are no checkboxes checked
    if (!$('input[type=checkbox]:checked').length) {
        // prevent button default action
        e.preventDefault();
        // show button error
        $buttonErrorSpan.show();
        $('.activities-hint').css("opacity", "1");
    } else {
        // hide button error
        $buttonErrorSpan.hide();
        $('.activities-hint').css("opacity", "0");
    }
    // if credit card is chosen as payment method
    if ($paymentMethod.val() == 'credit-card') {
        // CC number value
        const $ccNumVal = $('#cc-num').val();
        // CC number regex
        const $ccNumRegex = /^\d{13,16}$/;
        // ZIP value
        const $zipVal = $('#zip').val();
        // ZIP regex
        const $zipRegex = /^\d{5}$/;
        // CVV value
        const $cvvVal = $('#cvv').val();
        // CVV regex
        const $cvvRegex = /^\d{3}$/;
        // if CVV number value does not match regex
        if (!$ccNumVal.match($ccNumRegex)) {
            // prevent button default action
            e.preventDefault();
            // show button error
            $buttonErrorSpan.show();
            $('#cc1-hint').css("opacity", "1");
        } else {
            // show button error
            $buttonErrorSpan.hide();
            $('#cc1-hint').css("opacity", "0");
        }
        // if ZIP value does not match regex
        if (!$zipVal.match($zipRegex)) {
            // prevent button default action
            e.preventDefault();
            // show button error
            $buttonErrorSpan.show();
            $('#zip-hint').css("opacity", "1");
        } else {
            // hide button error
            $buttonErrorSpan.hide();
            $('#zip-hint').css("opacity", "0");
        }
        // if CVV does not match regex
        if (!$cvvVal.match($cvvRegex)) {
            // prevent button default action
            e.preventDefault();
            // show button error
            $buttonErrorSpan.show();
            $('#cvv-hint').css("opacity", "1");
        } else {
            // show button error
            $buttonErrorSpan.hide();
            $('#cvv-hint').css("opacity", "0");
        }
    }
    if ($('#name-hint').css('opacity') == '0' && $('#email-hint').css('opacity') == '0' && $('#activities-hint').css('opacity') == '0' && $('#cc1-hint').css('opacity') == '0' && $('#zip-hint').css('opacity') == '0' && $('#cvv-hint').css('opacity') == '0') {
        $buttonErrorSpan.hide();
        location.reload();
    } else {
        $buttonErrorSpan.show();
    }
});