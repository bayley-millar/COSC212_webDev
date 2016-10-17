<?php
$currentPage = basename($_SERVER['PHP_SELF']);

if($currentPage === 'index.php') {
    echo "<li> Fixtures";
}else{
    echo "<li> <a href='index.php'>Fixtures</a>";
}

if($currentPage === 'standings.php') {
    echo "<li> standings";
}else{
    echo "<li> <a href='standings.php'>standings</a>";
}

if($currentPage === 'matchAdmin.php') {
    echo "<li> edit matches";
}else{
    echo "<li> <a href='matchAdmin.php'>edit matches</a>";
}

if($currentPage === 'tournamentAdmin.php') {
    echo "<li> new tournament";
}else{
    echo "<li> <a href='tournamentAdmin.php'>new tournament</a>";
}

