<?php
session_start();
?>
<?php
$scriptList = array('JS/jquery-3.1.0.min.js', 'JS/cookies.js');
include("restricted/validationFunctions.php");




if (isset($_POST['loginSubmit'])) {
    $user = $_POST['loginUser'];
    $password=$_POST['loginPassword'];
    $conn = new mysqli('sapphire', 'bmillar', 'bayleyMillar', 'bmillar_dev');
    if ($conn->connect_errno) {
        echo "Connection issues";
    // Something went wrong connecting
    }
    $user = $conn->real_escape_string($user);
    $password = $conn->real_escape_string($password);
    $query = "SELECT * FROM users WHERE username = '$user' AND password = SHA('$password')";
    $result = $conn->query($query);


    if ($result->num_rows === 0) {
        echo"Your user name or password were incorrect";
        header('Location: index.php');
        exit;
        /* name is not in the table*/


    }else{
        echo "success";
        $row = $result->fetch_assoc();
        $role = $row['role'];
        $_SESSION['authenticatedUser'] = $user;
        $_SESSION['role']= $role;
        if (isset($_SESSION['authenticatedUser'])){
            print_r($_SESSION);
            header('Location: '.$_SESSION['lastPage']);
            echo ", session made";
            exit;
        }else{
            echo " session failure";
        }
        /* name is in the system*/
    }
}else{
    echo "there was an error";
}
?>