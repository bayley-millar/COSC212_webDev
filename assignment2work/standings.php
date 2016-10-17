<?php
$scriptList = array("js/jquery-3.1.0.min.js", "js/XMLReader.js", "js/standings.js");
include("restricted/header.php");
?>

<header id="header">
    <nav>
        <ul>
            <?php include("restricted/links.php"); ?>
        </ul>
    </nav>

    <h1>Standings</h1>
</header>

<p id="intro">This page show the current standing in the round robin. It shows the current ranks of the teams and all the details about how they are currently standing.</p>

<table id="standings">
    <tr>
        <th>Rank</th>
        <th>Team</th>
        <th>Played</th>
        <th>Won</th>
        <th>Drawn</th>
        <th>Lost</th>
        <th>Points</th>
        <th>For</th>
        <th>Against</th>
        <th>Diff</th>
    </tr>
</table>


<?php include("restricted/footer.php");