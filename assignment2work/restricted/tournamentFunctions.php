<?php
/**
 * Created by PhpStorm.
 * User: bmillar
 * Date: 10/7/16
 * Time: 3:01 PM
 */

/**
 * This function is activated when clearVenues form is submitted.
 * On submit this will clear all the venues within the XML document for
 * a fresh page.
 */

session_start();
/*
 * Unsets the venues XML
 */
function unsetVenues(){
    $xml = simplexml_load_file('xml/venues.xml');
    $venues= $xml->xpath('venue');
    foreach($venues as $venue){
        unset($venue[0]);
    }
    $xml->saveXML('xml/venues.xml');

}
/*
 * unsets the matches XML
 */
function unsetMatches(){
    $xml = simplexml_load_file('xml/tournament.xml');
    $matches= $xml->xpath('match');
    foreach($matches as $match){
        unset($match[0]);
    }
    $xml->saveXML('xml/tournament.xml');

}

/*
 * adds teams to the team array session
 */
function addTeams($team){
    if (!isset($_SESSION['teams'])) {
        $_SESSION['teams'] = array();
    }
    if (!(in_array($team, $_SESSION['teams']))) {
        array_push($_SESSION['teams'], $team);
    }
}

/*
 * adds teams to the venues array session
 */
function addVenues($venue){
    if (!isset($_SESSION['venue'])) {
        $_SESSION['venue'] = array();
    }
    if (!(in_array($venue, $_SESSION['venue']))) {
        array_push($_SESSION['venue'], $venue);
    }
}

/*
 * prints all the teams int the array
 */
function printTeams(){
    echo "<h4>Selected Teams</h4>";
    echo "<ul id='list'>";
    foreach ($_SESSION['teams'] as $team){
        echo  "<li>" . $team ;
    }
    echo "</ul>";
}

/*
 * prints all the venues in the array
 */
function printVenues(){
    echo "<h4>Selected Venues</h4>";
    echo "<ul id='list'>";
    foreach ($_SESSION['venue'] as $venue){
        echo  "<li>" . $venue ;
    }
    echo "</ul>";
}


/*
 * puts all the venues into the XML from the venues session array
 */
function venuesToXML(){
    $xml = simplexml_load_file('xml/venues.xml');

    foreach ($_SESSION['venue'] as $venue){
        $xml->addChild('venue', $venue);
    }
    $xml->saveXML('xml/venues.xml');
    unset($_SESSION['venue']);
}


/*
 * Adds all the new tournament details to the XML
 */
function createNewTourn(){
    $xml = simplexml_load_file('xml/tournament.xml');
    $array = $_SESSION['teams'];
    $length = count($_SESSION['teams']);
    for($i = 0; $i < $length ; $i++){
        for($j = $i + 1; $j < $length ; $j++) {
            if(strlen($array[$i]) > 0 && strlen($array[$j]) > 0){
                $match = $xml->addChild('match');
                $date = $match->addChild('date');
                $date->addChild('day');
                $date->addChild('month');
                $date->addChild('year', 2016);

                $match->addChild('venue');

                $match->addChild('team', $array[$i]);
                $match->addChild('team', $array[$j]);

            }


        }
    }
    unset($_SESSION['teams']);
    $xml->saveXML('xml/tournament.xml');
}
