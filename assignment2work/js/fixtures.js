
/* global XMLReader */


/**
 * Module pattern for showing Fixtures
 */
var Fixtures = (function() {
    "use strict";

    var pub, months;

    pub = {}; // Public interface

    // Months of the year. Note that JavaScript's Date object numbers months 0-11 so can
    // be used to index directly into this array.
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    /**
     * Comparison function for Match objects.
     *
     * This can be used to sort Matches by date.
     *
     * @param match1 - the first match to compare.
     * @param match2 - the second match to compare.
     * @returns {boolean} - true if match1 is before match2, false otherwise.
     */
    function matchCompare(match1, match2) {
        return match1.date.getTime() < match2.date.getTime();
    }

    /**
     * Function to fill the fixtures list.
     *
     * This function creates entries in the list of fixtures.
     * Each entry gives the date and location of the match and the two teams.
     * If scores are present they are shown as well.
     */
    function showFixtures() {
        XMLReader.matches.sort(matchCompare);
        $.each(XMLReader.matches, function(key, match) {
            var fixture, header, result, row;
            // Each fixture is an item in a list
            fixture = $("<li>");
            // There's a header giving the date and location of the match
            header = $("<p>");
            header.text(match.date.getDate() + " " + months[match.date.getMonth()] + " " + match.date.getFullYear() + " at " + match.venue);
            fixture.append(header);
            // And then a table showing the score for each team
            result = $("<table>");
            row = $("<tr>");
            row.append("<td>" + match.team1 + "</td>");
            row.append("<td>" + match.team2 + "</td>");
            result.append(row);
            if (match.isPlayed()) {
                row = $("<tr>");
                row.append("<td>" + match.score1 + "</td>");
                row.append("<td>" + match.score2 + "</td>");
                result.append(row);
            }
            fixture.append(result);
            $("#fixtures").append(fixture);
        });
    }

    /**
     * Setup function for the main (Fixtures) page
     *
     * Displays a list of fixtures from the data stored in the XML file.
     */
    pub.setup = function() {
        XMLReader.fetchTournamentThenCall(showFixtures);
    };

    return pub; // Expose the public interface
}());

// Setup the fixtures information when the page loads
$(document).ready(Fixtures.setup());