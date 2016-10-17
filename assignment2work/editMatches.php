<?php

$scriptList = array('js/jquery-3.1.0.min.js', "js/XMLReader.js", "js/admin.js", "js/Validation.js");
include("restricted/header.php");
include("restricted/validationFunctions.php");


$errorcount = 0;
session_start();
?>

    <header id="header">
        <nav>
            <ul>
                <?php include("restricted/links.php"); ?>
            </ul>
        </nav>
        <h1>Edit Matches</h1>
    </header>

    <div id="main">
        <?php
        /**
         * Assigning all the values from the form to variables
         */
        $day = $_POST['day'];
        $month = $_POST['month'];
        $year = $_POST['year'];
        $venue = $_POST['venue'];
        $played = $_POST['played'];
        $team1 = $_POST['team1'];
        $team2 = $_POST['team2'];
        $team1name = $_POST['team1name'];
        $team2name = $_POST['team2name'];

        $month += 1;//to fix month position to proper index


        $xml = simplexml_load_file('xml/tournament.xml');
        $matches = $xml->xpath('match');

        /**
         * checking validation of the values posted from the form
         * hows it, this section of code is average.
         */
        if ((isEmpty($_POST['day']))) {
            echo "<br> -Day:  empty";
            $errorcount++;
        }

        if ((isEmpty($_POST['month'])) ) {
            echo "<br> -Year: empty ";
            $errorcount++;
        }

        if ((isEmpty($_POST['year']))) {
            echo "<br> -Year:  empty ";
            $errorcount++;
        }

   

        if ((isEmpty($_POST['team1'])) ) {
            echo "<br> -Team1 score: Either empty or not digits";
            $errorcount++;
        }
        if ((isEmpty($_POST['team2']))) {
            echo "<br> -Team2 score: Either empty or not digits";
            $errorcount++;
        }
        if ((isEmpty($_POST['team1name']))) {
            echo "<br> - Empty team1name";
            $errorcount++;
        }
        if ((isEmpty($_POST['team2name']))) {
            echo "<br> - Empty team2name";
            $errorcount++;
        }
        if (!(validateDate($day, $month, $year))) {
            echo "<br> - Date given was not valid";
            $errorcount++;
        }
        $xmlVenues = simplexml_load_file('xml/venues.xml');
        if (!(validateVenue($xmlVenues, $venue))) {
            echo "<br> - This venue is not a valid venue";
            $errorcount++;
        }
        if (!(scoreNotNegative($team1, $team2))) {
            echo "<br> - Scores: One of the scores is negative, please change.";
            $errorcount++;
        }
        if (!(checkClash($day, $month, $year, $venue, $team1name, $team2name, $matches))) {
            echo "<br> - Match Clash: There is already a match on this day in this venue.";
            $errorcount++;
        }

        /*
         * if there are no errors
        */
        if ($errorcount == 0) {
            echo "Success";
            echo "<ul><li>Day: " . $day . "<li>month:" . $month . "<li>year:" . $year . "<li>venue:" . $venue . "<li>played:" . $played . "<li>team1:" . $team1 . "<li>team2: " . $team2 . "<li>team1name: " . $team1name . "<li>team2name: " . $team2name . "</ul>";


            foreach ($matches as $match) {
                $xmlTeam1 = $match->team[0];
                $xmlTeam2 = $match->team[1];
                if ($team1name == $xmlTeam1 && $team2name == $xmlTeam2) {
                    echo "ok!";
                    unset($match[0]);
                    $tournament = $xml->addChild('match');

                    $tournamentDate = $tournament->addChild('date');
                    $tournamentDate->addChild('day', $day);
                    $tournamentDate->addChild('month', $month);
                    $tournamentDate->addChild('year', $year);
                    $tournament->addChild('venue', $venue);

                    if ($played == "on") {

                        $changeT1 = $tournament->addChild('team', $team1name);
                        $changeT1->addAttribute("score", $team1);
                        $changeT2 = $tournament->addChild('team', $team2name);
                        $changeT2->addAttribute("score", $team2);
                    } else {

                        $changeT1 = $tournament->addChild('team', $team1name);
                        $changeT2 = $tournament->addChild('team', $team2name);
                    }
                }
            }
            $xml->saveXML('xml/tournament.xml');


            /*
             * if there are errors, display error message and link back to edit matches page
             */
        } else {
            ?>

            <p>** PLEASE FIX THE ABOVE LISTED ERROR BEFORE CARRYING ON ** </p

            <p><a href='matchAdmin.php'>edit matches</a></p>


        <?php } ?>


    </div>


<?php
include("restricted/footer.php");
?>