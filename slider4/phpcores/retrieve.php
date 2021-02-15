<?php
require_once 'connect.php';
$menu = [];
$sql = "SELECT * FROM tbl_webdata;";
$stmt = $conn->stmt_init();
if ($stmt->prepare($sql)) {
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        array_push($menu, $row);
    }
    /*
    For Displaying the Values
    foreach ($menu as $key => $value) {
    echo "<br>";
    print_r($key);
    echo " ->> <br> ";
    print_r($value);
    echo "<br>";
    } */
    $stmt->close();
} else {
    echo "<h1 style='{display:grid;place-items:center;width:100%:height:100vh}'><strong> Something Went Wrong</strong></h1>";
}
echo json_encode($menu);
$conn->close();