<?php

include_once 'config.php';

$data = [];

$sql = 'INSERT INTO tbl_formdata(name,password) VALUES(?,?);';
$stmt = $conn->stmt_init();

if ($stmt->prepare($sql)) {
    $stmt->bind_param('ss', $param_name, $param_password);
    $param_name = $_POST['name'];
    $param_password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $stmt->execute();
    $stmt->close();
} else {
    echo "Could not added into Database. Sorry!!!";
}

$sql = 'SELECT id,name,password from tbl_formdata;';
$stmt = $conn->stmt_init();

if ($stmt->prepare($sql)) {
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        array_push($data, $row);
    }
    echo json_encode($data);
    $stmt->close();
} else {
    echo "Could not Fetched";
}

$conn->close();