/**this module is used to get the data from the 
*xml data files and process the data appropriatly
*/
var ShowTable = (function () {
    'use strict';
    var pub = {};

    
    /**
    *this fucntion is used to retrieve the tournament xml
    *data, where it then on success parses it to parseMatches
    */
    function getMatches(){
        var target = $('#table');
        var source = "xml/tournament2.xml";
        $.ajax({
            type: "GET",
            url: source,
            cache: false,
            success: function(data){
                parseMatches(data, target);
            },
            error: function(){
                $(target).html("No matches");
            }
        });
    }
    
    /**
    *this fucntion is used to retrieve the venues xml
    *data, where it then on success parses it to parseVenues
    */
    function getVenues(){
        var target = $('#table');
        var source = "xml/venues2.xml";
        $.ajax({
            type: "GET",
            url: source,
            cache: false,
            success: function(data){
                parseVenues(data, target);
            },
            error: function(){
                $(target).html("No matches");
            }
        });
    }

    /**
     * This is the team object which takes the input required
     * for the ranking table
     */
    function TeamsObj(team, played, won, drawn, lost){
        this.team = team;
        this.played = played;
        this.won = won;
        this.drawn = drawn;
        this.lost = lost;
    }

    /**
     *This is the matches object which takes in all the information from
     * the XML.
     */

    function MatchesObj(day, month, year,venue,team1,team1Score,team2,team2Score) {
        this.day = day;
        this.month = month;
        this.year = year;
        this.venue = venue;
        this.team1 = team1;
        this.team1Score = team1Score;
        this.team2 = team2;
        this.team2Score = team2Score;
    }

    /**
     * This Function is used to process results from the given results
     * @param teamArray is the array of teams
     * @param matchArray is the array of objects where all the matches are
     * @param results is an empty array passed that is used to store the results
     */
    function processResults(teamArray, matchArray, results){
        var i = 0;
        for(i; i < matchArray.length ; i+=1){
            if ($.inArray(matchArray[i].team1, teamArray)!==-1){
                var indexOf = $.inArray(matchArray[i].team1, teamArray);
                if(matchArray[i].team1Score > matchArray[i].team2Score){// if team 1 wins
                   results.push(new TeamsObj(matchArray[i].team1, TeamsObj.played =1, TeamsObj.won = 1, TeamsObj.drawn = 0, TeamsObj.lost = 0));
                    results.push(new TeamsObj(matchArray[i].team2, TeamsObj.played =1, TeamsObj.won = 0, TeamsObj.drawn = 0, TeamsObj.lost = 1));
                }else if(matchArray[i].team1Score < matchArray[i].team2Score){// if team 2 wins
                   results.push(new TeamsObj(matchArray[i].team1, TeamsObj.played =1, TeamsObj.won = 0, TeamsObj.drawn = 0, TeamsObj.lost = 1));
                    results.push(new TeamsObj(matchArray[i].team2, TeamsObj.played =1, TeamsObj.won = 1, TeamsObj.drawn = 0, TeamsObj.lost = 0));
                }else if(matchArray[i].team1Score === matchArray[i].team2Score){// if draw
                   results.push(new TeamsObj(matchArray[i].team1, TeamsObj.played =1, TeamsObj.won = 0, TeamsObj.drawn = 1, TeamsObj.lost = 0));
                    results.push(new TeamsObj(matchArray[i].team2, TeamsObj.played =1, TeamsObj.won = 0, TeamsObj.drawn = 1, TeamsObj.lost = 0));
                }
            }
        }
        for(var j=0; j < results.length; j+=1){
           
            $(".table").append("<tr><td>" + "nil" + " </td><td> " + results[j].team+ "</td><td>"+results[j].played+"</td><td>"+ results[j].won + "</td><td>"+results[j].drawn + "</td><td>"+results[j].lost +"</td></tr>");
        }
    }
    

    /**
    *parseVenues is parsed the venue data where it then takes is
    *and puts it into a cookie as an a array.This functio is also used
    *to append data to tables
    *@param data is the xml data passed to it
    *@param target is the target fo the data
    */
    function parseVenues(data, target){
        var venues = [];
        $(target).empty();
        var x = $(data).find("venue");
        for(var i=0; i < x.length; i+=1){
            venues.push(x[i].textContent);
        }
        Cookie.set("venues", JSON.stringify(venues));        
    }

    /**
    *parseMatches is parsed the matches data where it then takes is
    *and puts it into a cookie as an a array of objects
    *@param data is the xml data passed to it
    *@param target is the target fo the data
    */
    
    function parseMatches(data, target){
        var matchArray = [];
        var teamArray = [];
        var results = [];
        $(target).empty();
        $(data).find("match").each(function(){
            //find all the data
            var venue = $(this).find("venue")[0].textContent;
            
            var team1 = $(this).find("team")[0].textContent;
            var team1Score = $(this).find("team")[0].getAttribute("score");
            
            var team2 = $(this).find("team")[1].textContent;
            var team2Score = $(this).find("team")[1].getAttribute("score");
            
            var day = $(this).find("day")[0].textContent;
            var month = $(this).find("month")[0].textContent;
            var year = $(this).find("year")[0].textContent;
        
            
            matchArray.push(new MatchesObj(day, month, year, venue, team1, team1Score, team2, team2Score));
            teamArray.push(team1);
            teamArray.push(team2);
            
            //append all matches to a list
            if(team1Score !== null && team2Score !== null){
                $("#list_matches").append("<tr><td>" + venue + " </td><td> " + team1+ "</td><td>"+team2+"</td><td>"+ day +"/"+ month+"/"+ year + "</td><td>"+team1Score + "</td><td>" + team2Score +"</td></tr>");
            }else if(team1Score === null && team2Score === null){
                
                $("#to_be_played").append("<tr><td>"+  venue + " </td><td> " + team1+ " </td><td> "+team2+" </td><td> "+ day +"/"+ month+"/"+ year + "</td></tr>");
            }
        });
        teamArray = $.unique(teamArray);
        processResults(teamArray, matchArray, results);
        Cookie.set("matches", JSON.stringify(matchArray));
        
    }//end of parse matches
    
    pub.setup = function () { 
        getMatches();
        getVenues();
    };
    
    
    return pub;
}());


$(document).ready(ShowTable.setup);

