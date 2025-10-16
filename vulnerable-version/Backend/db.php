<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "owasp_vulnerable";

$conn = mysqli_connect($host, $user, $pass, $db);

if(!$conn) {
    die("connection can't be done due to error: " . mysqli_connect_error());
}
?>