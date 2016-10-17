

/* global XMLReader */

/**
 * Module pattern for form Validation functions.
 *
 * These functions are called from admin.js. They could have been included there, but are separated out
 * so that there's a bit less to deal with in any one place.
 *
 * The validation functions follow a general rule to return true if everything is OK and false otherwise.
 * This makes it easy to combine them when validating the form.
 */
var Validation = (function() {
    "use strict";

    var pub;

    pub = {}; // public interface

    /**
     * Validate the date of a match.
     *
     * Validation is done by making a Date object. This takes care of leap years, etc. and if you
     * make a Date with an invalid date (say 30 February), you'll get a different date (2 March or
     * 1 March in a leap year). Checking that the Date is what you expect does most of the validation
     * for very little work.
     *
     * @param key - the key (index) of the match to validate the date of.
     * @returns {boolean} - true if the date is OK, false if there is a problem.
     */
    pub.validateDate = function (key) {
        var subDate, day, month, year;
        day = parseInt($("#day"+key).val());
        month = parseInt($("#month"+key).val());
        year = parseInt($("#year"+key).val());
        // Make a Date object...
        subDate = new Date(year, month, day);
        // ...and check that it is what we said it should be.
        if (subDate.getDate() !== day ||
            subDate.getMonth() !== month ||
            subDate.getFullYear() !== year) {
            $("#dateError" + key).text("This is not a valid date");
            return false;
        }
        return true;
    };

    /**
     * Validate the venue of a match.
     *
     * The venue should be OK, since it is chosen from a drop-down. However, there's no harm in checking,
     * and you never know what might be going on with a dodgy browser or a user with a JavaScript console.
     *
     * @param key - the key (index) of the match to validate the date of.
     * @returns {boolean} - true if the venue is OK, false if there is a problem.
     */
    pub.validateVenue = function (key) {
        if ($.inArray($("#venue"+key).val(), XMLReader.venues) < 0) {
            $("#venueError" + key).text("This is not a valid venue");
            return false;
        }
        return true;
    };

    /**
     * Validate the scores of a match.
     *
     * Check that the scores are numbers, are non-negative, and are integers.
     *
     * @param key - the key (index) of the match to validate the date of.
     * @returns {boolean} - true if the score is OK, false if there is a problem.
     */
    pub.validateScore = function (key) {
        var score1, score2;
        if ($("#played"+key).is(":checked")) {
            score1 = $("#team1_"+key).val();
            score2 = $("#team2_"+key).val();
            if (!($.isNumeric(score1) && $.isNumeric(score2))) {
                $("#scoreError" + key).text("Scores must be numbers");
                return false;
            }
            if (parseInt(score1) < 0 || parseInt(score2) < 0){
                $("#scoreError" + key).text("Scores cannot be negative");
                return false;
            }
            if (parseFloat(score1) !== parseInt(score1) ||
                parseFloat(score2) !== parseInt(score2)) {
                $("#scoreError" + key).text("Scores must be integers");
                return false;

            }
        }
        return true;
    };

    /**
     * Helper function to add text at the end of an element's HTML.
     *
     * @param id - the id of the element.
     * @param text - the text to add.
     */
    function appendText(id, text) {
        $(id).text($(id).text() + text);
    }

    /**
     * Validate pairs of matches for clashes.
     *
     * There are two main types of clashes:
     * - same date and same venue
     * - same date and same team
     *
     * @param key1 - the key (index) of the first match.
     * @param key2 - the key (index) of the second match.
     * @returns {boolean} - true unless the two matches clash in some way.
     */
    pub.validateClashes = function(key1, key2) {
        var match1, match2, venue1, venue2, anyClashes;
        anyClashes = false;
        match1 = XMLReader.matches[key1];
        match2 = XMLReader.matches[key2];
        venue1 = $("#venue" + key1).val();
        venue2 = $("#venue" + key2).val();
        // First check the date, if it is different we're fine
        if ($("#day"+key1).val() === $("#day"+key2).val() &&
            $("#month"+key1).val() === $("#month"+key2).val() &&
            $("#year"+key1).val() === $("#year"+key2).val()) {
            // If same date, see if the venues are the same
            if (venue1 === venue2) {
                appendText("#venueError" + key1, " There is another match on this date at " + venue1);
                appendText("#venueError" + key2, " There is another match on this date at " + venue1);
                anyClashes = true;
            }
            // Then check if there are any duplicate teams.
            if (match1.team1 === match2.team2 || match1.team1 === match2.team2) {
                appendText("#dateError" + key1, " " + match1.team1 + " has another match on this date");
                appendText("#dateError" + key2, " " + match1.team1 + " has another match on this date");
                anyClashes = true;
            }
            if (match1.team2 === match2.team2 || match1.team2 === match2.team2) {
                appendText("#dateError" + key1, " " + match1.team2 + " has another match on this date");
                appendText("#dateError" + key2, " " + match1.team2 + " has another match on this date");
                anyClashes = true;
            }
        }
        return !anyClashes;
    }

    return pub; // Expose public interface
}());

// Note, no setup for this Module