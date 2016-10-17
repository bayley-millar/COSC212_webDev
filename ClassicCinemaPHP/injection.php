<?php
$dbUsername = '';
$dbPassword = '';
?>

<!DOCTYPE html>

<html>

  <head>
    <title>SQL Injection Demonstration</title>
    <meta charset="utf-8">
  </head>

  <body>
    <h1>Update your password</h1>
    <form action='<?php echo $_SERVER['PHP_SELF']?>' method='POST'>
      <p>
        <label for="username">Username</label>
        <input type="text" name="username">
      </p>
      <p>
        <label for="newPassword">Password</label>
        <input type="password" name="newPassword">
      </p>
      <p>
        <input type="submit" value="Update">
      </p>
    </form>

    <?php
        if (isset($_POST['username'])) {  
          $conn = new mysqli('sapphire', $dbUsername, $dbPassword, $dbUsername.'_dev');
          if ($conn->connect_errno) {
            echo "<p>ERROR: Could not connect to database</p>\n";
          } else {
            $password = $_POST['newPassword'];
            $username = $_POST['username'];
            $query = "UPDATE Users SET password = SHA('$password') WHERE username='$username'";
            echo "<p>$query</p>";
            $conn->query($query);
            if ($conn->error) {
              echo "<p>ERROR: Could not update database</p>\n";
            } else {
              $numRowsChanged = $conn->affected_rows;
              echo "<p>$numRowsChanged row(s) changed</p>\n";
            }
          }
          $conn->close();
        }
     ?>
  </body>

</html>