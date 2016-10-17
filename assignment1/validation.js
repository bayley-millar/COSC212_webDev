/**
 * Created by bmillar on 8/11/16.
 */
/**
 * Module pattern for Validation functions
 */
var MatchValidation = (function () {
    "use strict";

    var pub;

    // Public interface
    pub = {};

    /**
     * Check to see if a string is empty.
     *
     * Leading and trailing whitespace are ignored.
     * @param textValue The string to check.
     * @return {boolean} True if textValue is not just whitespace, false otherwise.
     */
    function checkNotEmpty(textValue) {
        return textValue.trim().length > 0;
    }

    /**
     * Check to see if a string contains just digits.
     *
     * Note that an empty string is not considered to be 'digits'.
     * @param textValue The string to check.
     * @return {boolean} True if textValue contains only the characters 0-9, false otherwise.
     */
    function checkDigits(textValue) {
        var pattern = /^[0-9]+$/;
        return pattern.test(textValue);
    }

    /**
     * Check to see if a string's length is in a given range.
     *
     *
     * This checks to see if the length of a string lies within [minLength, maxLength].
     * If no maxLength is given, it checks to see if the string's length is exactly minLength.
     * @param textValue The string to check.
     * @param minLength The minimum acceptable length
     * @param maxLength [optional] The maximum acceptable length
     * @return {boolean} True if textValue is an acceptable length, false otherwise.
     */
    function checkLength(textValue, minLength, maxLength) {
        var length = textValue.length;
        if (maxLength === undefined) {
            maxLength = minLength;
        }
        return (length >= minLength && length <= maxLength);
    }

    

    /**
     * Check if a key-press is a digit or not
     *
     * @param event The event representing the key-press
     * @return {boolean} True (accept) if key is a digit, False (reject) otherwise
     */
    function checkKeyIsDigit(event) {
        // Cross-browser key recognition - see http://stackoverflow.com/questions/1444477/keycode-and-charcode
        var characterPressed, charStr;
        characterPressed = event.keyCode || event.which || event.charCode;
        charStr = "0";
        if (characterPressed < charStr.charCodeAt(0)) {
            return false;
        }
        charStr = "9";
        return characterPressed <= charStr.charCodeAt(0);
    }




    
        /**
     * Check to see if the date name appears valid.
     *
     * The only check here is that the date name must not be blank.
     *
     * @param date The string to check
     * @param messages Array of error messages (may be modified)
     * @return True if the date  looks OK, false otherwise
     */
    function checkDate(date, messages) {
        if (!checkNotEmpty(date)) {
            messages.push("You must enter a valid date");
        }else if(!checkDigits(date) || !checkLength(date, 1, 2)) {
            messages.push("date must be the correct length");
        }
    }
    
            /**
     * Check to see if the year name appears valid.
     *
     * The only check here is that the year name must not be blank.
     *
     * @param year The string to check
     * @param messages Array of error messages (may be modified)
     * @return True if the year  looks OK, false otherwise
     */
    function checkYear(year, messages) {
        if (!checkNotEmpty(year)) {
            messages.push("You must enter a valid year");
        }else if(!checkDigits(year) || !checkLength(year, 4)) {
            messages.push("year must be the correct length");
        }
    }
            /**
     * Check to see if the score name appears valid.
     *
     * The only check here is that the score name must not be blank.
     *
     * @param date The string to check
     * @param messages Array of error messages (may be modified)
     * @return True if the score  looks OK, false otherwise
     */
    function checkScore(score, messages) {
        if (!checkNotEmpty(score)) {
            messages.push("You must enter a score ");
        }else if(!checkDigits(score) || !checkLength(score, 1, 2)) {
            messages.push("score must be the correct score length");
        }
    }
    
    
    
    /**
    *Checks if venue is availiable on the date
    *@param venue is the selected venue to check
    *@param dd, mm, yyyy are the parameters to check for the date
    *@return true if it is a valid venue
    */
    function venueAvailiable(venue, messages){
        var hit;
        var date = $("#day").val()+$("#month").val()+$("#year").val();
        var matches = JSON.parse(Cookie.get("matches"));
        var mVenue, mDD, mMM, mYYYY;
        for(var i=0; i < matches.length;i+=1){
            mVenue = matches[i].venue;
            mDD = matches[i].day;
            mMM = matches[i].month;
            mYYYY = matches[i].year;
            var mDate = (mDD+mMM+mYYYY);
            if((mVenue === venue) && (date === mDate)){
               hit = true;
            }  
        }
        if(hit){
            messages.push("this venue is already used on this date: ");
        }
    }



   
  
    /**
     * Validate the checkout form
     *
     * Check the form entries before submission
     *
     * @return {boolean} False, because server-side form handling is not implemented. Eventually will return true on success and false otherwise.
     */
    function validateCheckout() {
        var messages, team1Score, team2Score, venue, dd, mm, yyyy, errorHTML;

        // Default assumption is that everything is good, and no messages
        messages = [];

        // Validate match edit details
        dd = $("#day").val();
        checkDate(dd, messages);


        mm = $("#month").val();
        checkDate(mm, messages);

        yyyy = $("#year").val();
        checkYear(yyyy, messages);
 
        team1Score = $("#teamScore1").val();
        checkScore(team1Score, messages);
                                                                                                                                                                                                                             
        team2Score = $("#teamScore2").val();
        checkScore(team2Score, messages);

        venue = $("#venue").val();
        venueAvailiable(venue, messages);


        $("#errors").empty();
        if (messages.length === 0) {
            $("#errors").empty();
            // Display a friendly message
            $("#errors").append( "<p>Editing Success!!</p>");
            $("#success").show();
        } else {
            // Report the error messages
            errorHTML = "<p><strong>There were errors processing your form</strong></p>";
            errorHTML += "<ul>";
            messages.forEach(function (msg) {
                errorHTML += "<li>" + msg;
            });
            errorHTML += "</ul>";
            $("#errors").append(errorHTML);
        }

        // Stop the form from submitting, which would trigger a page load
        // In future this will return true if the form is OK and can be submitted to the server
        return false;

    }

    /**
     * Setup function for sample validation.
     *
     * Adds validation to the form on submission.
     * Note that if the validation fails (returns false) then the form is not submitted.
     */
    pub.setup = function () {
        var form = $("#edit");
        //form.onsubmit = validateCheckout;
        $("#submit").click(validateCheckout);
        /*document.getElementById("cardNumber").onkeypress = checkKeyIsDigit;
        document.getElementById("deliveryPostcode").onkeypress = checkKeyIsDigit;
        document.getElementById("cardValidation").onkeypress = checkKeyIsDigit;
        */
        $("#teamScore1").click(checkKeyIsDigit);
        $("#teamScore2").click(checkKeyIsDigit);
        $("#day").click(checkKeyIsDigit);
        $("#month").click(checkKeyIsDigit);
        $("#year").click(checkKeyIsDigit);


    };

    // Expose public interface
    return pub;
}());

$(document).ready(MatchValidation.setup);