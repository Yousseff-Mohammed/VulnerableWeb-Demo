<?php
session_start();

if(!isset($_SESSION['csrf_token'])){
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

$csrf_token = $_SESSION['csrf_token'];

header('Content-Type: application/json');
echo json_encode(['success' => true, 'csrf_token' => $csrf_token]);
exit;
?>