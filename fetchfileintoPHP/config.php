<?php

//Defining Variables
$DB_SERVER = 'localhost';
$DB_USERNAME = 'root';
$DB_PASSWORD = '';
$DB_NAME = 'trial';

//Let's Connect to the Database

$conn = new mysqli($DB_SERVER, $DB_USERNAME, $DB_PASSWORD, $DB_NAME);
if ($conn->connect_error) {
    die('Internal Server Error') . $conn->connect_error;
}