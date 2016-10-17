<?php
$scriptList = array('js/jquery-3.1.0.min.js', "js/XMLReader.js", "js/admin.js", "js/Validation.js");
include("restricted/header.php");
include("restricted/validationFunctions.php");
include("restricted/tournamentFunctions.php");
$team = $_POST['addTeam'];
$venue = $_POST['addVenue'];
?>

    <header id="header">
        <nav>
            <ul>
                <?php include("restricted/links.php"); ?>
            </ul>
        </nav>

        <h1>New Tournament</h1>
    </header>

    <p id="intro">The below forms are for clearing venues, adding teams, and adding venues. Push the submit at the bottom to
    submit the teams and venues</p>

<div id="main">

    <form id="clear" action="action.php" method="post">
        <fieldset>
            <p>Push the button below to clear all the venues and matches that are in the XML document.
            This is not related to the venues or teams you are submitting below. PLEASE HIT THIS
            IF YOU INTEND TO CREATE TOURNAMENT!</p>
            <input type="submit" id="clear" value="clear">
        </fieldset>
    </form>

    <form id="venues" action="<?php addVenues($venue); ?>" method="post">
        <fieldset>
            <legend>Add new venues</legend>
            <label>Add venues one at a time below:</label>
            <input type="text" id="venuesInput" name="addVenue">
            <input type="submit" id="addVenue" value="add venue" >
        </fieldset>
    </form>



    <form id="teams" action="<?php addTeams($team); ?>" method="post">
        <fieldset>
            <legend>Add teams</legend>
            <label>Add teams one at a time below:</label>
            <input type="text" id="teamInput" name="addTeam">
            <input type="submit" id="addTeam" value="add team">
        </fieldset>
    </form>


    <form id="submitData" action="newTournament.php" method="post">
        <fieldset>
            <legend>Submit</legend>
            <label>Submit all currently added teams and venues</label>
            <input type="submit" value="submit">
        </fieldset>
    </form>

</div>


<?php
printVenues();
?>
<?php
printTeams();
?>

<?php
include ("restricted/footer.php");
?>