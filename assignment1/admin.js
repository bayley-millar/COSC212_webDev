/**This module is used to setup and process the admin page*/
var Admin= (function () {
    'use strict';
    var pub = {};
    var result;
    
    /**
    *this function is used to get the cookie data from matches and venues
    *and then append them to the correct drop box
    */
    function setupPage(){
        var matches = JSON.parse(Cookie.get("matches"));
         var venues = JSON.parse(Cookie.get("venues"));
        $("#edit").hide();
        $("#success").hide();
        $("#select_match").append("<option>default</option>");
        for(var i=0; i < matches.length; i+= 1){
            $("#select_match").append("<option>" + matches[i].venue + " "+ (matches[i].day) +"/" + (matches[i].month)+"/"+ (matches[i].year) + "</options>");
        }
        for(var j=0; j < venues.length ; j+=1){
            $("#venue").append("<option>"+venues[j]+"</option>");
        }
        
    }
    
    
    /**
    *this function is used to get the correct select item and
    *then append the correct match to a <p> tag. This function
    *also makes the edit match form appear.
    */
    function selectOption(){
        $("#display_r").empty();
        
        var matches = JSON.parse(Cookie.get("matches"));
        var select = $("#select_match option:selected").val();
        if(select === "default"){
            $("#edit").hide();
        }
        for(var i=0; i < matches.length; i+=1){
            var temp =matches[i].venue + " "+ matches[i].day +"/"+ matches[i].month+"/"+ matches[i].year;
            if(temp === select){
                result = matches[i];
            } 
        }
        $("#display_r").append("<p>" + result.venue + " , " + result.team1+ " vs "+result.team2+" , "+ result.day +"/"+ result.month+"/"+ result.year + ",  RESULT:  "+result.team1Score + " - " + result.team2Score  +"</p>");
        $("#edit").show();     
    }
    
    
    /**
    *this function is used to edit the existin match with the new details
    */
    function editForOnSubmit(){
        var matchToEdit = result;
        matchToEdit.team1Score = $("#teamScore1").val();
        matchToEdit.team2Score = $("#teamScore2").val();
        matchToEdit.venue = $("#venue").val();
        matchToEdit.day = $("#day").val();
        matchToEdit.month = $("#month").val();
        matchToEdit.year = $("#year").val();
        confirm("Change to the new details of: "+ JSON.stringify(matchToEdit));
        $("#errors").append("<p>" +"New Details: RESULT:"+matchToEdit.team1Score+" vs  "+matchToEdit.team2Score+", VENUE: "+matchToEdit.venue+", DATE: "+matchToEdit.day+"/ "+matchToEdit.month+"/ "+matchToEdit.year+ "</p>");
    }

    
     pub.setup = function () {
         setupPage();
         $("#select_match").change(selectOption);
         $("#success").click(editForOnSubmit);
    };
    
    
    return pub;
}());


$(document).ready(Admin.setup);
