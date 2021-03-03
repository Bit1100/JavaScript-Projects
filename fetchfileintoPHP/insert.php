<?php
require_once "config.php";

// Checking for Content-type
$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

// Set initial response
$response = [
    'success' => 0,
    'error' => "No Error Detected",
    'infos' => null,
];

// Fetching, decoding and manipulating the data
if ($contentType == "application/json") {
    // Receive the RAW post data.
    $content = trim(file_get_contents("php://input"));

    // $decoded can be used the same as you would use $_POST in AJAX
    $decoded = json_decode($content, true);

    if ($_SERVER['REQUEST_METHOD'] == "POST") {
        // Do something with received data and include it in reponse
        $counter = 1;
        foreach ($decoded as $key => $value) {
            $sql = "INSERT INTO tbl_data (id,heading,content) VALUES(?,?,?);";

            $stmt = $conn->stmt_init();

            $stmt->prepare($sql);

            $stmt->bind_param('iss', $param_id, $param_heading, $param_content);

            $param_id = $counter++;
            $param_heading = $value['heading'];
            $param_content = $value['content'];

            $stmt->execute();
        }
        $stmt->close();

        // Success
        $response['infos'] = $decoded;
        $response['success'] = 1;
        $response['error'] = null;
    } else {
        // Content-Type is incorrect
        $response['error'] = 'Request Method Must Be POST';
    }
} else {
    // Content-Type is incorrect
    $response['error'] = 'Content-Type is not set as "application/json"';
}

// echo response for fetch API
echo json_encode($response);
$conn->close();