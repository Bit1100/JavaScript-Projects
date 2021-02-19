<?php

// defining the variables
$DB_HOST = 'localhost';
$DB_USER = 'root';
$DB_PASSWORD = '';
$DB_NAME = 'trial';

$conn = new mysqli($DB_HOST, $DB_USER, $DB_PASSWORD, $DB_NAME);

if ($conn->connect_error) {
    die("Something Went Wrong") . $conn->connect_error;
}
// echo "Successful Connection to the DB";