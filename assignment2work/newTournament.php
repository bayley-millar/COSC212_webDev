<?php
$scriptList = array('js/jquery-3.1.0.min.js', "js/XMLReader.js", "js/admin.js", "js/Validation.js");
include("restricted/header.php");
include("restricted/validationFunctions.php");
include("restricted/tournamentFunctions.php");
venuesToXML();
$xml = simplexml_load_file('xml/venues.xml');
if (!(checkForVenues($xml))) {
    ?>
    <header id="header">
        <nav>
            <ul>
                <?php include("restricted/links.php"); ?>
            </ul>
        </nav>

        <h1>New Tournament</h1>
    </header>
    <?php
    echo "<p id='intro'>ERROR!: There was no venue provided, please return to the last page. Please use the below link to add a venue before proceeding</p>";
    echo "<p id='link'><a href='tournamentAdmin.php'>create tournament</a> </p>";
} else {
    createNewTourn();

    ?>
    <header id="header">
        <nav>
            <ul>
                <?php include("restricted/links.php"); ?>
            </ul>
        </nav>

        <h1>New Tournament</h1>
    </header>
    <p id="intro">Your changes have been made. Edit these matches to your needs by clicking the below link</p>
    <p id="link"><a href='matchAdmin.php'>Edit matches</a> </p>

    <?php
}
?>





<?php
include('restricted/footer.php');
?>
