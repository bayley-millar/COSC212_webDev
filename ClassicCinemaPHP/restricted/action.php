<?php
if (session_id() === "") {
    session_start();
}

$xml = $_POST['xmlFileName'];
$user = $_SESSION['authenticatedUser'];

$reviews = simplexml_load_file($xml);
$selectOption = $_POST['rating'];
$newReview = $reviews->addChild('review');
$username = $newReview->addChild('user', $user);
$rating = $newReview->addChild('rating', $selectOption);
$reviews->saveXML($xml);
header('Location: '.$_SESSION['lastPage']);
exit();
?>