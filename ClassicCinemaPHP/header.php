<html lang="en">

<head>
    <title>Classic Cinema</title>
    <link rel="stylesheet" href="stylesheet.css">
    <meta charset="utf-8">
    <?php
    /**
     * Created by PhpStorm.
     * User: bmillar
     * Date: 9/6/16
     * Time: 1:06 PM
     */
    if (isset($scriptList) && is_array($scriptList)) {
        foreach ($scriptList as $script) {
            echo "<script src='$script'></script>";
        }
    }
    ?>
</head>

<body>

<header>
    <h1>Classic Cinema</h1>
</header>

<div id="user">
    <div id="login">
        <form id="loginForm">
            <label for="loginUser">Username: </label>
            <input type="text" name="loginUser" id="loginUser">
            <label for="loginPassword">Password: </label>
            <input type="password" name="loginPassword" id="loginPassword">
            <input type="submit" id="loginSubmit" value="Login">
        </form>
    </div>

    <div id="logout">
        <p>Welcome, <span id="logoutUser"></span></p>
        <form id="logoutForm">
            <input type="submit" id="logoutSubmit" value="Logout">
        </form>
    </div>
</div>

<nav>
<?php


$currentPage = basename($_SERVER['PHP_SELF']);

if ($currentPage === 'index.php') {
    echo "<li> Home";
} else {
    echo "<li> <a href='index.php'>Home</a>";
}
if ($currentPage === 'hitchcock.php') {
    echo "<li> hitchcock";
} else {
    echo "<li> <a href='hitchcock.php'>hitchcock</a>";
}
if ($currentPage === 'scifi.php') {
    echo "<li> Scifi";
} else {
    echo "<li> <a href='scifi.php'>Scifi</a>";
}
if ($currentPage === 'classic.php') {
    echo "<li> classic";
} else {
    echo "<li> <a href='classic.php'>classic</a>";
}
if ($currentPage === 'shoppingCart.php') {
    echo "<li> cart";
} else {
    echo "<li> <a href='shoppingCart.php'>cart</a>";
}

?>

</nav>