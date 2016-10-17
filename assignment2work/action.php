<?php
/**
 * Created by PhpStorm.
 * User: bmillar
 * Date: 10/7/16
 * Time: 5:14 PM
 */
include("restricted/tournamentFunctions.php");
unsetVenues();
unsetMatches();
header('Location: tournamentAdmin.php');
