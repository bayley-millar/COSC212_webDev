

/**
 * Module pattern for XML reading functions.
 *
 * Since all the pages basically read some XML then do something with the data, this provides
 * a simple and uniform interface to do that. The publicly exposed functions read some XML
 * file(s) and then call a function to process that data.
 */
var XMLReader = (function() {
    "use strict";

    var pub;

    pub = {}; // Public interface

    pub.teams = [];   // A list of all the team names. Can be extracted from matches, but provided for convenience.
    pub.matches = []; // A list of all the matches represented as simple objects.
    pub.venues = [];  // A list of all the possible venues for matches. Note that there may be venues with no matches.

    /**
     * Create an object representing a match from the XML data.
     *
     * @param match - The XML containing the match data.
     * @returns {Object} - An object representing the match.
     */
    function parseMatchXML(match) {
        var matchObj, teams;
        // For the most part, this is just copying data across
        matchObj = {};
        teams = $(match).find("team");
        matchObj.team1 = $(teams[0]).text();
        matchObj.team2 = $(teams[1]).text();
        // The scores will be undefined if they are not present
        matchObj.score1 = parseInt($(teams[0]).attr("score"));
        matchObj.score2 = parseInt($(teams[1]).attr("score"));
        // A standard JavaScript Date object is used here
        matchObj.date = new Date (
            $(match).find("date year").text(),
            $(match).find("date month").text() - 1, // Note that JS dates use January = 0, XML uses January = 1
            $(match).find("date day").text()
        );
        matchObj.venue = $(match).find("venue").text();
        /**
         * Check if a match has been recorded as played or not. This is done by checking the score.
         * A match that has been played will have numbers for the scores (possibly zeros),
         * but a match that has not been played will have undefined scores.
         *
         * @returns {boolean} True if the match has score information
         */
        matchObj.isPlayed = function() {
            return $.isNumeric(this.score1) && $.isNumeric(this.score2);
        };
        return matchObj;
    }

    /**
     * Parse the XML representing a set of round-robin matches.
     * This fills the matches and teams arrays, leaving venues unchanged.
     *
     * @param xml - The XML representing the matches in a tournament.
     */
    function parseTournamentXML(xml) {
        $.each($(xml).find("match"), function(key, match) {
            pub.matches.push(parseMatchXML(match));
            $.each($(match).find("team"), function(key, team) {
                var teamName = $(team).text();
                if (pub.teams.indexOf(teamName) < 0) {
                    pub.teams.push(teamName);
                }
            });
        });
    }

    /**
     * Parse the XML representing a list of venues.
     * This fills thevenues array, leaving matches and teams unchanged.
     *
     * @param xml - The XML representing the possible venues for the tournament.
     */
    function parseVenueXML(xml) {
        $.each($(xml).find("venue"), function(key, venue) {
            pub.venues.push($(venue).text());
        });
        pub.venues.sort();
    }

    /**
     * Read the tournament data and then call a function.
     *
     * Once it is called, the function can reasonably expect that match and team data will be in
     * the arrays XMLReader.matches and XMLReader.teams
     *
     * @param functionToCall - The function to call once match and team data is available.
     */
    pub.fetchTournamentThenCall = function(functionToCall) {
        $.ajax({
            url: "xml/tournament.xml",
            cache: false,
            success: function (tournamentXML) {
                parseTournamentXML(tournamentXML);
                functionToCall();
            }
        });
    };

    /**
     * Read the tournament and venue data and then call a function.
     *
     * Once it is called, the function can reasonably expect that match, team, and venue data will be in
     * the arrays XMLReader.matches, XMLReader.teams, and XMLReader.venues
     *
     * @param functionToCall - The function to call once match, team, and venue data is available.
     */
    pub.fetchTournamentAndVenueThenCall = function(functionToCall) {
        $.ajax({
            url: "xml/tournament.xml",
            cache: false,
            success: function (tournamentXML) {
                parseTournamentXML(tournamentXML);
                $.ajax({
                    url: "xml/venues.xml",
                    cache: false,
                    success: function (venueXML) {
                        parseVenueXML(venueXML);
                        functionToCall();
                    }
                });
            }
        });
    };

    return pub; // Expose the public interface
}());

// Note, no setup for this Module