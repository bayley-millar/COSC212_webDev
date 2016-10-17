<?php
$scriptList = array("js/jquery-3.1.0.min.js", "js/XMLReader.js", "js/fixtures.js");
include("restricted/header.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
 
    
    <script src=></script>
    <script src=""></script>
    <script src=></script>
</head>
<body>

<header id="header">
    <nav>
        <ul>
            <?php include("restricted/links.php"); ?>
        </ul>
    </nav>
    <h1>Fixtures</h1>
</header>



<p id="intro">Welcome! This is the homepage to the UEFA Euro 2016 page. The below table displays the results so far in the round robin</p>

<ul id="fixtures">
</ul>


<?php include("restricted/footer.php");