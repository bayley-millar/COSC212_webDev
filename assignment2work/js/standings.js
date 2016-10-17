
/* global XMLReader */

/**
 * Module pattern for showing Standings (ranking table)
 */
var Standings = (function() {
    "use strict";

    var pub, standings;

    pub = {};  // Public interface
    standings = [];  // List to be populated with summaries of standings

    /**
     * Comparison function for teams' standings.
     *
     * This allows teams' standings to be sorted to make a ranked table.
     *
     * @param st1 - first team's standing to compare
     * @param st2 - second team's standing to compare
     * @returns {boolean} - true if st1 ranks below st2
     */
    function compareStandings(st1, st2) {
        // First check points
        if (st1.points() < st2.points()) { return true; }
        if (st2.points() < st1.points()) { return false; }
        // If they're the same, difference of for-against
        if (st1.diff() < st2.diff()) { return true; }
        if (st2.diff() < st1.diff()) { return false; }
        // And games played, mostly to reduce ambiguity
        if (st1.played() < st2.played()) { return true; };
        if (st2.played() < st1.played()) { return false; };
        return false;
    }

    /**
     * Set up the list of team data to compute ranks for.
     *
     * This function would typically be followed by computeStandings to update all the values.
     */
    function initialiseStandings() {
        $.each(XMLReader.teams, function(key, team) {
            var teamData;
            teamData = {};
            teamData.name = team;
            teamData.won = 0;
            teamData.drawn = 0;
            teamData.lost = 0;
            teamData.for = 0;
            teamData.against = 0;
            // Note that since played, points, and score difference are computed from the basic values
            // They are functions not just values. This means they don't get out of date if the data is updated.
            teamData.played = function() {
                return this.won + this.drawn + this.lost;
            };
            teamData.points = function() {
                return 2*this.won + this.drawn;
            };
            teamData.diff = function() {
                return this.for - this.against;
            };
            standings.push(teamData);
        });
    }

    /**
     * Compute the information needed to rank the teams from the XML data and update the standings array.
     *
     * This requires that initialiseStandings has been called to set up the array of teams.
     */
    function computeStandings() {
        $.each(XMLReader.matches, function(key, match) {
            if (match.isPlayed()) {
                var ix1, ix2;
                // Find indexes of teams in the standings array
                ix1 = ix2 = 0;
                $.each(standings, function (key, standing) {
                    if (standing.name === match.team1) {
                        ix1 = key;
                    }
                    if (standing.name === match.team2) {
                        ix2 = key;
                    }
                });
                // Update the points scored for and against each team
                standings[ix1].for += match.score1;
                standings[ix1].against += match.score2;
                standings[ix2].for += match.score2;
                standings[ix2].against += match.score1;
                // And the number of games won, lost, or drawn
                if (match.score1 < match.score2) {
                    standings[ix1].lost += 1;
                    standings[ix2].won += 1;
                } else if (match.score1 > match.score2) {
                    standings[ix1].won += 1;
                    standings[ix2].lost += 1;
                } else {
                    standings[ix1].drawn += 1;
                    standings[ix2].drawn += 1;
                }
            }
        });
    }

    /**
     * Populate the standings table.
     *
     * First computes the standings, then sorts them and fills the table.
     */
    function showStandings() {
        initialiseStandings();
        computeStandings();
        standings.sort(compareStandings);
        $.each(standings, function(key, standing){
            var row;
            row = $("<tr>");
            row.append("<td>" + (key+1) + "</td>");
            row.append("<td>" + standing.name + "</td>");
            row.append("<td>" + standing.played() + "</td>");
            row.append("<td>" + standing.won + "</td>");
            row.append("<td>" + standing.drawn + "</td>");
            row.append("<td>" + standing.lost + "</td>");
            row.append("<td>" + standing.points() + "</td>");
            row.append("<td>" + standing.for + "</td>");
            row.append("<td>" + standing.against + "</td>");
            row.append("<td>" + standing.diff() + "</td>");
            $("#standings").append(row);
        });
    }

    /**
     * Setup function for the standings page
     *
     * Fetches the XML data then displays a ranked table of teams by results.
     */
    pub.setup = function() {
        XMLReader.fetchTournamentThenCall(showStandings);
    };

    return pub; // Expose public interface.
}());

// Setup the standings table when the page loads
$(document).ready(Standings.setup());