

/* global XMLReader, Validation */

/**
 * Module pattern for administrative functions.
 *
 * This module includes code for displaying the admin form and event handling.
 * Validation functions are defined in Validation.js and called from this file.
 */
var Admin = (function() {
    "use strict";

    var pub, months;

    pub = {}; // Public interface

    // Months of the year. Note that JavaScript's Date object numbers months 0-11 so can
    // be used to index directly into this array.
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    /**
     * Create a drop-down selection to select the day's date.
     *
     * @param id - id tag for the drop-down selection
     * @param selected - date to select initially
     * @returns {string} - HTML for the drop-down selection
     */
    function datePicker(id, selected) {
        var result, day;
        result = "<select id='" + id + "' name='" + id + "'>";
        for (day = 1; day <= 31; day += 1) {
            result += "<option ";
            if (day === selected) {
                result += "selected='selected' ";
            }
            result += "value='" + day + "'>" + day + "</option>";
        }
        result += "</select>";
        return result;
    }

    /**
     * Create a drop-down selection to select the month for a date.
     *
     * Note that, as with JavaScript's Date object, months are indexed from January = 0.
     * This is different to the XML where January = 1, but that is abstracted by XMLReader.
     *
     * @param id - id tag for the drop-down selection
     * @param selected - month to select initially
     * @returns {string} - HTML for the drop-down selection
     */
    function monthPicker(id, selected) {
        var result, month;
        result = "<select id='" + id + "' name='" + id + "'>";
        for (month = 0; month < 12; month += 1) {
            result += "<option ";
            if (month === selected) {
                result += "selected='selected' ";
            }
            result += "value='" + month + "'>" + months[month] + "</option>";
        }
        result += "</select>";
        return result;
    }

    /**
     * Create a drop-down selection to select the year for a date.
     *
     * @param id - id tag for the drop-down selection
     * @param selected - year to select initially
     * @returns {string} - HTML for the drop-down selection
     */
    function yearPicker(id, selected) {
        var result, year, minYear, maxYear;
        // By default we go from the current year to 3 years hence
        minYear = new Date().getFullYear();
        maxYear = minYear+3;
        // But make sure that the range includes all the dates in the XML
        $.each(XMLReader.matches, function(key, match) {
            var year;
            year = match.date.getFullYear();
            if (year < minYear) {
                minYear = year;
            } else if (year > maxYear) {
                maxYear = year;
            }
        });
        // Add a bit of leeway
        minYear -= 2;
        maxYear += 2;
        result = "<select id='" + id + "' name='" + id + "'>";
        for (year = minYear; year <= maxYear; year += 1) {
            result += "<option ";
            if (year === selected) {
                result += "selected='selected' ";
            }
            result += "value='" + year + "'>" + year + "</option>";
        }
        result += "</select>";
        return result;
    }

    /**
     * Create date picking interface elements.
     *
     * We could use a <input type='date'> element, but that is not widely supported.
     * Instead we use a set of drop-downs to pick day, month, and year.
     *
     * Day-month constraints (like 30 Feb is not valid) are not enforced by the interface,
     * but are checked on form submission.
     *
     * @param parent - element in which to place the date picker.
     * @param key - number of the match this is the date for (first match = 0, etc.)
     * @param match - Details of the match, including its date
     */
    function makeDateFields(parent, key, match) {
        var id;
        // Day of month picker
        id = "day";
        parent.append("<label for='" + id + "'>Date: </label>");
        parent.append(datePicker(id, match.date.getDate()));
        // Month picker
        id = "month";
        parent.append("<label class='narrow' for='" + id + "'> </label>");
        parent.append(monthPicker(id, match.date.getMonth()));
        // Year picker
        id = "year";
        parent.append("<label class='narrow' for='" + id + "'> </label>");
        parent.append(yearPicker(id, match.date.getFullYear()));
        // A place to report errors on submission.
        id = "dateError";
        parent.append("<span class='error' id='" + id + "'></span>");
    }

    /**
     * Create a drop-down selection for venues.
     *
     * @param id - id of the element to create.
     * @param selected - venue to select initially.
     * @returns {string} - HTML for a selection box for the venue.
     */
    function venuePicker(id, selected) {
        var result;
        result = "<select id='" + id + "' name='" + id + "'>";
        $.each(XMLReader.venues, function(key, venue) {
           result += "<option ";
            if (venue === selected) {
                result += "selected='selected' ";
            }
            result += " value='" + venue + "'>" + venue + "</option>";
        });
        result += "</select>";
        return result;
    }

    /**
     * Create venue picking interface elements.
     *
     * @param parent - element in which to place the venue picker.
     * @param key - number of the match this is the date for (first match = 0, etc.)
     * @param match - Details of the match, including its venue
     */
    function makeVenueFields(parent, key, match) {
        var id;
        id = "venue";
        parent.append("<label for='" + id + "'>Venue: </label>");
        parent.append(venuePicker(id, match.venue));
        // Error element in case there is an issue with the venue.
        id = "venueError";
        parent.append("<span class='error' id='" + id + "'></span>");
    }

    /**
     * Create 'played' interface elements.
     *
     * This is just a checkbox to indicate whether the match has been played (i.e. has a score) or not.
     *
     * @param parent - element in which to place the played indicator.
     * @param key - number of the match this is the date for (first match = 0, etc.)
     * @param match - Details of the match, including its score (if any)
     */
    function makePlayedFields(parent, key, match) {
        var id;
        id = "played";
        parent.append("<label for='" + id + "'>Played: </label>");
        if (match.isPlayed()) {
            parent.append("<input type='checkbox' name='" + id + "' id='" + id + "' checked>");
        } else {
            parent.append("<input type='checkbox' name='" + id + "' id='" + id + "'>");
        }
    }

    /**
     * Create interface elements to enter the score.
     *
     * These are number elements, although only non-negative integers are valid.
     * This constraint is checked at form submission time. Additional validation could
     * be added to stop the entry of - signs, and decimal points.
     *
     * The elements for the score are <input type='number'>, which defaults back to text
     * if there isn't browser support.
     *
     * @param parent - element in which to place the score entry boxes.
     * @param key - number of the match this is the date for (first match = 0, etc.)
     * @param match - Details of the match, including its venue
     */
    function makeScoreFields(parent, key, match) {
        var id;
        id = "team1";
        parent.append("<label for='" + id + "'>" + match.team1 + ": </label>");
        parent.append("<input type='number' name='" + id + "' id ='" + id + "' value='" + match.score1 + "'>");
        id = "team2";
        parent.append("<label for='" + id + "'>" + match.team2 + ": </label>");
        parent.append("<input type='number' name='" + id + "' id ='" + id + "' value='" + match.score2 + "'>");
        // Error element in case there is an issue with the scores entered.
        id = "scoreError";
        parent.append("<span class='error' id='" + id + "'></span>");
    }

    /**
     * Validiate the form on submission.
     *
     * The functions for validation are in Validation.js, but are called from here.
     *
     * Some of the validation is done for each match individually, but checking for clashes between
     * venues or teams on the same day requires pair-wise checking. This is done with a double loop,
     * which is O(n^2) for n = number of matches. This could be more efficient if the list were sorted
     * so that matches on the same date are adjacent. An n-log-n sort would be the main cost in most cases.
     * This was not done for a few reasons:
     * - The difference between the O(n^2) here and O(n log n) for sorting is not big for small n.
     * - If all matches are on the same date then checking all pairs is O(n^2) regardless.
     * - The logic to check for more than 2 games on the same date may be more complex than it's worth
     *
     * @param event - the form submission event.
     */
    function validateForm(event) {
        var allOK;
        // Basically we assume things are all OK and then see if that changes as we check the form.
        // Note that we don't stop validating on first error, it is better to tell the user all of
        // the errors, rather than one at a time.
        allOK = true;
        $.each(XMLReader.matches, function(key) {
            var dateOK, venueOK, scoreOK, key2, clashOK;
            // Check that the date is valid.
            dateOK = Validation.validateDate(key);
            // Check that the venu is in the list from the XML.
            venueOK = Validation.validateVenue(key);
            // Check that the scores are valid.
            scoreOK = Validation.validateScore(key);
            // Check for clashes of venue or team on the same date.
            clashOK = true;
            for (key2 = 0; key2 < key; key2 += 1) {
                clashOK = Validation.validateClashes(key, key2);
            }
            // Note that we accumulate errors, rather than returning early.
            allOK = allOK && dateOK && venueOK && scoreOK && clashOK;
        });
        if (!allOK) {
            // An error, don't submit the form.
            event.preventDefault();
        }
    }

    /**
     * Display the administration form.
     */
    function displayAdmin() {
        var adminForm;
        var count = 0;
        adminForm = $("#forms");
        // We loop over each match...
        $.each(XMLReader.matches, function(key, match) {
            var fs, p, form;
            count++;
            var id="adminForm" + count;
            // Fieldsets help separate each match's data both logically and visually.
            // The key (index) is used to identify and relate different input elements.
            fs = $("<form id='"+ id + "' action='editMatches.php' method='post'>");
            fs.append("<legend>" + match.team1 + " vs " + match.team2 + "</legend>");
            // Input for the date...
            p = $("<p>");
            makeDateFields(p, key, match);
            fs.append(p);
            // ...and the venue...
            p = $("<p>");
            makeVenueFields(p, key, match);
            fs.append(p);
            // ...and score.
            p = $("<p>");
            makePlayedFields(p, key, match);
            fs.append(p);
            p = $("<p>");
            makeScoreFields(p, key, match);
            fs.append(p);

            var team1 = "<input type='hidden' name='team1name' id='team1name' value="+match.team1 +">"
            var team2 = "<input type='hidden' name='team2name' id='team2name' value="+match.team2 +">"

            fs.append(team1);
            fs.append(team2);

            fs.append("<input type='submit' value='Update Schedule'></form>");
            adminForm.append(fs);



        });
        //TODO
        adminForm.on("submit");
    }

    /**
     * Setup function for the administration page
     *
     * Displays a form to edit matches populated from the data stored in the XML files.
     */
    pub.setup = function() {
        XMLReader.fetchTournamentAndVenueThenCall(displayAdmin);
    };

    return pub; // Expose the public interface
}());

// Setup the administration form when the page loads
$(document).ready(Admin.setup());