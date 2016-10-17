<?php
/**
 * Created by PhpStorm.
 * User: bmillar
 * Date: 9/27/16
 * Time: 1:29 PM
 */
?>

<?php

?>


<?php
session_start();
unset($_SESSION['authenticatedUser']);
header('Location: index.php');
exit;
?>