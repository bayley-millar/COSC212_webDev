<?php
/**
 * Created by PhpStorm.
 * User: bmillar
 * Date: 9/22/16
 * Time: 1:08 PM
 */

function connect()
{
    if (isset($_POST['registerSubmit'])) {
        $formOK = true;
        $new_username = $_POST['registerName'];
        $email = ($_POST['registerEmail']);
        $password = ($_POST['registerPassword']);
        $confirmpw = ($_POST['confirmPW']);


        if (isEmpty($new_username)) {
            echo "Enter a user name";
            $formOK = false;
        } else if (!isEmail($email)) {
            $formOK = false;
            echo "Enter a correct email";


        } else if (strlen($password) <= 7) {
            echo "Password must include at least 8 characters!" . PHP_EOL;
            $formOK = false;
        } else if (!preg_match("#[0-9]+#", $password)) {
            echo "Password must include at least one number!" . PHP_EOL;
            $formOK = false;
        } else if (!preg_match("#[A-Z]+#", $password)) {
            echo "Password must include at least one Capital letter!" . PHP_EOL;
            $formOK = false;
        } else if (!preg_match("#[a-z]+#", $password)) {
            echo "Password must include at least one letter!" . PHP_EOL;
            $formOK = false;
        }

        if ($password !== $confirmpw) {
            echo "Passwords must match";
            $formOK = false;
        }


        if ($formOK) {
            $conn = new mysqli('sapphire', 'bmillar', 'bayleyMillar', 'bmillar_dev');
            if ($conn->connect_errno) {
                echo "Connection issues";
            }
            $new_username = $conn->real_escape_string($new_username);
            $password = $conn->real_escape_string($password);

            $query = "SELECT * FROM users WHERE username = '$new_username'";
            $result = $conn->query($query);

            if ($result->num_rows === 0) {
                echo "Name was avalible";


                $query = "INSERT INTO users (username, password, email, role) " .
                    "VALUES ('$new_username', SHA('$password'), '$email', 'user')";

                $conn->query($query);
                if ($conn->error) {
                    echo "nope";

                }


            } else {
                echo "user name taken";

            }
            $result->free();
            $conn->close();
            header("Location: registerSuccess.php");
        }
    }
}

?>