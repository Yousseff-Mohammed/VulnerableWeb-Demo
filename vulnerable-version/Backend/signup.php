<?php
include('db.php');
echo "just anything but the first oen <br><br>";
if($_SERVER["REQUEST_METHOD"] === "POST") {
    echo "just anything <br><br>";
    $username = $_POST['username'];
    $password = $_POST['password'];
    $firstname = $_POST['firstname'];
    $secondname = $_POST['secondname'];

    $query = "INSERT INTO users (username, password) VALUES ('$username', '$password')";
    $result = mysqli_query($conn, $query);

    if ($result) {
        // Redirect to login page
        header("Location: ../Frontend/html/Login.html");
        exit();
    } else {
        echo "<h1>Error: " . mysqli_error($conn) . "</h1>";
        echo "<a href='../Frontend/html/Signup.html'>Try again</a>";
    }
}
?>