<?php
session_start();

$scriptList = array('JS/jquery-3.1.0.min.js', 'JS/cookies.js');
include("restricted/validationFunctions.php");
include("restricted/header.php");
$errorcount = 0;

if(!isset($_SESSION['authenticatedUser'])) { //if login in session is not set
    header('Location: '.$_SESSION['lastPage']);
}
?>

<div id="main">

    <?php

    $_SESSION['deliveryName'] = $_POST['deliveryName'];
    $_SESSION['deliveryEmail'] = $_POST['deliveryEmail'];
    $_SESSION['deliveryAddress1'] = $_POST['deliveryAddress1'];
    $_SESSION['deliveryAddress2'] = $_POST['deliveryAddress2'];
    $_SESSION['deliveryCity'] = $_POST['deliveryCity'];
    $_SESSION['deliveryPostcode'] = $_POST['deliveryPostcode'];

    if ((isEmpty($_POST['deliveryName']))) {
        echo "<br> - Delivery name: Enter your name please.";
        $errorcount++;
    }
    if ((isEmpty($_POST['deliveryEmail']))) {
        echo "<br> - Email name: Enter your email address please.";
        $errorcount++;
    }
    if ((isEmpty($_POST['deliveryAddress1']))) {
        echo "<br> - DeliveryAddress1: Enter your delivery Address please.";
        $errorcount++;
    }
    if ((isEmpty($_POST['deliveryAddress2']))) {
        echo "<br> - DeliveryAddress2: Enter your delivery Address please.";
        $errorcount++;
    }
    if ((isEmpty($_POST['deliveryCity']))) {
        echo "<br> - DeliveryCity: Enter your deliveryCity please.";
        $errorcount++;
    }
    if ((isEmpty($_POST['deliveryPostcode']))) {
        echo "<br> - DeliveryPostcode: Enter your deliveryPostcode please.";
        $errorcount++;
    }
    if (!(isDigits($_POST['deliveryPostcode']))) {
        echo "<br> - Enter in correct digits for post code";
        $errorcount++;
    }
    if ((isEmpty($_POST['cardValidation']))) {
        echo "<br> - CVC: Enter in  CVC  number.";
        $errorcount++;
    }
    if (!(isEmail($_POST['deliveryEmail']))) {
        echo "<br> - Email address: Enter your correct email addreess please.";
        $errorcount++;
    }
    if ((checkLength($_POST['deliveryPostcode'], 5))) {
        echo "<br> - DeliveryPostcode: Enter the correct length of the postcode.";
        $errorcount++;
    }
    if (!(checkCardDate($_POST['cardMonth'], $_POST['cardYear']))) {
        echo "<br> - Expiry Date: The expiry date has already past.";
        $errorcount++;
    }


    if (!(checkCardNumber($_POST['cardType'], $_POST['cardNumber']))) {
        echo "<br> - CardNumber: Enter some valid information, check your card number. ";
        echo "<br> - American Express card numbers must be 15 digits long and start with a '3' ";
        echo "<br> - MasterCard numbers must be 16 digits long and start with a '5' ";
        echo "<br> - Visa card numbers must be 16 digits long and start with a '4'";
        $errorcount++;
    }
    ?>


    <?php
    if ($errorcount == 0) {
        echo "Success";
        $cart = json_decode($_COOKIE['cart']);
        $totalPrice = 0;
        echo "<table ><tr><th>Title (Year)</th><th>Price</th></tr>";
        foreach ($cart as $key => $value) {
            $title = $cart[$key]->title;
            $price = $cart[$key]->price;
            echo "<tr><td>" . $title . "</td><td>" . "$" . $price . "</td></tr>";
            $totalPrice += $price;
        }
        echo "</table>";
        /*$_SESSION = array();
        session_destroy();*/
        if (isset($_COOKIE['cart'])) {
            unset($_COOKIE['cart']);
            setcookie('cart', '', time() - 3600, '/');
        }

        $orders = simplexml_load_file('orders.xml');
        $newOrder = $orders->addChild('order');
        $username = $newOrder->addChild('username', $_SESSION['authenticatedUser']);
        $delivery = $newOrder->addChild('delivery');
        $delivery->addChild('name', $_POST['deliveryName']);
        $delivery->addChild('email', $_POST['deliveryEmail']);
        $delivery->addChild('address', $_POST['deliveryAddress1']);
        $delivery->addChild('city', $_POST['deliveryCity']);
        $delivery->addChild('postcode', $_POST['deliveryPostcode']);
        $items = $newOrder->addChild('items');
        
        foreach ($cart as $value) {
            $item = $items->addChild('item');
            $title = $value->title;
            $price = $value->price;
            $item->addChild('title', $title);
            $item->addChild('price', $price);
        }
        $orders->saveXML('orders.xml');



    }else{
        echo "fix errors";


    }


    ?>
</div>

<?php
include("restricted/footer.php");
?>
</body>


</html>


