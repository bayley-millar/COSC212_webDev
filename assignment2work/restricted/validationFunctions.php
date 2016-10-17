<?php


/**
 * Check to see if a string is composed entirely of the digits 0-9.
 * Note that this is different to checking if a string is numeric since
 * +/- signs and decimal points are not permitted.
 *
 * @param string $str The string to check.
 * @return True if $str is composed entirely of digits, false otherwise.
 */
function isDigits($str) {
    $pattern='/^[0-9]+$/';
    return preg_match($pattern, $str);
}

/**
 * Check to see if a string contains any content or not.
 * Leading and trailing whitespace are not considered to be 'content'.
 *
 * @param string $str The string to check.
 * @return True if $str is empty, false otherwise.
 */
function isEmpty($str){
    return strlen(trim($str)) == 0;
}



/**
 * Check to see if the length of a string is a given value, ignoring leading
 * and trailing whitespace.
 *
 * @param string $str The string to check.
 * @param integer $len The expected length of $str.
 * @result True if $str has length $len, false otherwise.
 */
function checkLength($str, $len) {
    return strlen(trim($str)) === $len;
}




/**
 * Validate the date of the match
 *
 * @param $day - the day to check
 * @param $month - the month to check
 * @param $year - the year to check
 * @return bool - true if date is valid
 */
function validateDate($day, $month, $year){
    if(!(checkdate($month, $day, $year))){
        return false;
    }else{
        return true;
    }

}


/**
 * Validates the venue of a match
 *
 * @param $venues - xml list of venues
 * @param $venue - match venue to validate
 */
function validateVenue($venues, $venue){
    $boolean = false;
    foreach ($venues->venue as $validVenue){
        if(($venue == $validVenue)){
            $boolean = true;
        }
    }
    if(!$boolean){
        return false;
    }else{
        return true;
    }
}

/**
 * Make sure the venue is not negative
 * @param $score1 first teams score
 * @param $score2 second teams score
 */
function scoreNotNegative($score1, $score2){

    if($score1 < 0 || $score2 < 0){
        return false;
    }else{
        return true;
    }
}

//TODO
/**
 * Checks fpr clashes between matches
 * @param $str - object that contains match details to update xml with
 * @param $matches - xml with currently set matches
 */
function checkClash($day, $month, $year, $venue , $team1Name, $team2name,  $matches){
    foreach ($matches as $match){
        $team1 = $match->team[0];
        $team2 = $match->team[1];


        if(!(($team1 == $team1Name && $team2 == $team2name) ||
            ($team2 == $team1Name && $team1 == $team2name))){

            ///to check to see whether the dates are the same between matches
            $strDate = $day . '/' . $month . '/' . $year;
            $matchDate = $match->date->day . '/' . $match->date->month . '/' . $match->date->year;
            if($strDate == $matchDate){

                // if same date
                if($venue == $match->venue){
                    return false;
                }
                // check to see team isn't playing on the same day
                if($team1 == $team1Name || $team1 == $team2name){
                    return false;
                }
                if($team2 == $team1Name || $team2 == $team2name){
                    return false;
                }
            }
            return true;
        }

    }
}

/**
 * This method is for check that there is one venue in the xml for venues
 * @param $xml gives the venues XML page
 * @return bool returns true if the size is greater than 1
 */
function checkForVenues($xml){
    $array = array();
    $venues = $xml->xpath('venue');
    foreach ($venues as $venue){
        array_push($array, $venue );
    }
    $size = count($array);
    if($size <= 1){
        return false;
    }else{
        return true;
    }
    
}



?>