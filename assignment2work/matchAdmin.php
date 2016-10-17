<?php
$scriptList = array("js/jquery-3.1.0.min.js", "js/XMLReader.js", "js/admin.js", "js/Validation.js");
include("restricted/header.php");
?>


<header id="header">
<nav>
    <ul>
        <?php include("restricted/links.php"); ?>
    </ul>
</nav>

<h1>Edit Matches</h1>
</header>
<p id="intro">
    Use the form below to enter the schedule and results for the round robin tournament.
    If the 'played' box is un ticked it will not add scores to the XML, else if ticked
    it will add scores.

</p>

<div id="forms">
    
</div>



</form>



<?php include("restricted/footer.php");