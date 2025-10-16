<?php
header('Content-Type: application/json; charset=utf-8');
session_start();
require_once __DIR__ . '/../../config/db.php';

$input = json_decode(file_get_contents('php://input'), true) ?? [];
$username = trim($input['username'] ?? '');
$password = $input['password'] ?? '';
$csrf = $input['csrf_token'] ?? '';

if (!isset($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $csrf)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid CSRF token']);
    exit;
}

if (!$username || !$password) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Missing fields']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id, username, password_hash, role FROM users WHERE username = ? LIMIT 1");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        $stmt = $pdo->prepare("INSERT INTO user_activity (user_id, type, details, ip, user_agent) VALUES (?, 'login_failed', ?, ?, ?)");
        $details = json_encode(['input' => $username]);
        $stmt->execute([null, $details, $_SERVER['REMOTE_ADDR'] ?? null, $_SERVER['HTTP_USER_AGENT'] ?? null]);

        http_response_code(401);
        echo json_encode(['success' => false, 'error' => 'Invalid credentials']);
        exit;
    }

    session_regenerate_id(true);
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['role'] = $user['role'];

    $stmt = $pdo->prepare("INSERT INTO user_activity (user_id, type, details, ip, user_agent) VALUES (?, 'login_success', ?, ?, ?)");
    $stmt->execute([$user['id'], json_encode([]), $_SERVER['REMOTE_ADDR'] ?? null, $_SERVER['HTTP_USER_AGENT'] ?? null]);

    $update = $pdo->prepare("INSERT INTO user_stats (user_id, login_count, last_login)
        VALUES (?, 1, NOW())
        ON DUPLICATE KEY UPDATE login_count = login_count + 1, last_login = NOW()");
    $update->execute([$user['id']]);

    echo json_encode(['success' => true, 'data' => ['username' => $user['username'], 'role' => $user['role']]]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Server error']);
}
