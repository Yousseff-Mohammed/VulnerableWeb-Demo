<?php
header('Conetent-Type: application/json; charset=utf-8;');
require_once __DIR__ . '/../db.php';

session_start();

$username = $_SESSION['username'];

$stmt = $pdo->prepare('SELECT * FROM users WHERE username = ? LIMIT 1');
$stmt->execute([$username]);
$user = $stmt->fetch();

?>