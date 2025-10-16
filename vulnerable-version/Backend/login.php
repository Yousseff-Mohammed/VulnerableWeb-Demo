<?php
include("db.php");
if(isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $query = "SELECT * FROM users WHERE username = '$username' AND password = '$password' LIMIT 1";

    $result = mysqli_query($conn, $query);

    if(mysqli_num_rows($result) === 1) {
        header("Location: dashboard.php");
        exit();
    }
    else {
        echo "Invalid credentials, the specified $username is wrong";
    }
}
?>