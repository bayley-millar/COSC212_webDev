<?php
/**
 * Created by PhpStorm.
 * User: bmillar
 * Date: 9/15/16
 * Time: 1:54 PM
 */
$scriptList = array('JS/jquery-3.1.0.min.js', 'JS/showHide.js', 'JS/cookies.js', 'JS/cart.js', 'JS/reviews.js');
$currentPage = basename($_SERVER['PHP_SELF']);
include('restricted/header.php');


if (!isset($_SESSION['authenticatedUser'])) { //if login in session is not set
    header('Location: ' . $_SESSION['lastPage']);
}
?>
<div id="main">
    <?php
    if ($_SESSION['role'] === 'admin') {
        $orders = simplexml_load_file('orders.xml');
        foreach ($orders->order as $order) {
            $username = $order->username;
            echo "</p>Username: $username<p>";
            $name = $order->delivery->name;
            echo "</p>Name: $name<p>";
            $email = $order->delivery->email;
            echo "</p>Email: $email<p>";
            $address = $order->delivery->address;
            echo "</p>Address: $address<p>";
            $city = $order->delivery->city;
            echo "</p>City: $city<p>";
            $postcode = $order->delivery->postcode;
            echo "<p>Postcode: $postcode<p>";
            $items = $orders->xpath('//item');
            echo "<p> Movies: </p> <ul>";

            foreach ($order->items->item as $item) {
                $title = $item->title;
                $price = $item->price;
                echo "<li> $title  $$price</li>";
            }
            echo "</ul></p></br>";
        }
        header("Refresh:10");
    }else if ($_SESSION['role'] === 'user') {
        $orders = simplexml_load_file('orders.xml');
        $loginUser = $_SESSION['authenticatedUser'];
        foreach ($orders->order as $order) {
            $orderUser = $order->username;
            if (strcmp($orderUser, $loginUser) === 0) {
                $name = $order->delivery->name;
                $address = $order->delivery->email;
                $city = $order->delivery->city;
                $postcode = $order->delivery->postcode;
                echo "<ul>";
                echo "<li>UserName: $loginUser</li>";
                echo "<li>Name: $name</li>";
                echo "<li>Address: $address</li>";
                echo "<li>City: $city</li>";
                echo "<li>Postcode: $postcode</li>";
                echo "<li>Movies:</li>";
                echo "<ul>";

                foreach ($order->items->item as $item) {
                    $title = $item->title;
                    echo "<li>$title</li>";
                }
                echo "</ul>";
                echo "</ul>";
            }
        }
    }
    ?>
</div>
<?php include("restricted/footer.php"); ?>
</body>
</html>