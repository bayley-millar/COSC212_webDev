<?php
/**
 * Created by PhpStorm.
 * User: bmillar
 * Date: 9/20/16
 * Time: 11:56 AM
 */

$scriptList = array('JS/jquery-3.1.0.min.js', 'JS/cookies.js');
include("restricted/header.php");
include("restricted/validationFunctions.php");

if(isset($_SESSION['authenticatedUser'])) { //if login in session is not set
    header('Location: '.$_SESSION['lastPage']);
}

?>
<div id="main">

    <?php
    include('restricted/databaseConnection.php');
    connect();
    ?>

    <form id="registerForm" action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
        <fieldset>
            <legend>Register With Us</legend>
            <p>
                <label for="registerName">Name: </label>
                <input type="text" name='registerName' id='registerName' required>

            </p>
            <p>
                <label for="registerEmail">Email:</label>
                <input type="email" name="registerEmail" id="registerEmail" required>
                <label for="registerEmail">requires full email</label>
            </p>
            <p>
                <label for="password">Password:</label>
                <input type="password" name="registerPassword" id="registerPassword" required>
            </p>
            <p>
                <label for="registerPassword">(8 characters long, one number, one capital letter, one normal letter)</label>
            </p>
            <p>
                <label for="confirmPW">Confirm Password:</label>
                <input type="password" name="confirmPW" id="confirmPW" required>
            </p>

            <p>
                <input type="submit" name='registerSubmit' id='registerSubmit' value="Submit">
            </p>
        </fieldset>

    </form>


</div>

<?php include("restricted/footer.php"); ?>
