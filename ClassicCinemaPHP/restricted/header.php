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
    if(session_id() === ""){
        session_start();
    }

    $_SESSION['lastPage'] = $_SERVER['PHP_SELF'];

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


<?php if(isset($_SESSION['authenticatedUser'])) {?>
<div id="user">


    <div id="logout">
        <p>Welcome,<?php echo $_SESSION['authenticatedUser']?> <span id="logoutUser"></span></p>
        <form id="logoutForm" action="logout.php">
            <input type="submit" name="logoutSubmit" id="logoutSubmit" value="Logout">
        </form>
    </div>
</div>

<nav><ul>
        <?php }else{?>

        <div id="user">
            <div id="login">
                <form id="loginForm" action="login.php" method="post">
                    <label for="loginUser">Username: </label>
                    <input type="text" name="loginUser" id="loginUser">
                    <label for="loginPassword">Password: </label>
                    <input type="password" name="loginPassword" id="loginPassword">
                    <input type="submit" name="loginSubmit" id="loginSubmit" value="Login">

                </form>
                <form id="registerForm" action="register.php">
                    <input type="submit" id="register" value="register">
                </form>
            </div>


        </div>

        <nav><ul><?php }?>

<?php


$currentPage = basename($_SERVER['PHP_SELF']);

if(isset($_SESSION['authenticatedUser'])) {
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
    if ($currentPage === 'checkout.php') {
        echo "<li> cart";
    } else {
        echo "<li> <a href='checkout.php'>cart</a>";
    }
    if ($currentPage === 'orders.php') {
        echo "<li> orders";
    } else {
        echo "<li> <a href='orders.php'>orders</a>";
    }
}else{
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
    echo "<li>login to view the cart";
}

?>
</ul>
</nav>