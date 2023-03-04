<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "GET":
        $sql = "SELECT * FROM events";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($users);
        break;
    case "POST":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "INSERT INTO events(id, title, descriptions, startDate, endDate, created_at, firstName, lastName, category, uid) VALUES(null, :title, :descriptions, :startDate, :endDate, :created_at, :firstName, :lastName, :category, :uid)";
        $stmt = $conn->prepare($sql);
        $created_at = date('Y-m-d');
        $stmt->bindParam(':title', $user->title);
        $stmt->bindParam(':descriptions', $user->descriptions);
        $stmt->bindParam(':startDate', $user->startDate);
        $stmt->bindParam(':endDate', $user->endDate);
        $stmt->bindParam(':firstName', $user->firstName);
        $stmt->bindParam(':lastName', $user->lastName);
        $stmt->bindParam(':category', $user->category);
        $stmt->bindParam(':uid', $user->uid);
        $stmt->bindParam(':created_at', $created_at);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create record.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $user = json_decode( file_get_contents('php://input') );
        $sql = "UPDATE events SET title= :title, descriptions= :descriptions, startDate= :startDate, endDate= :endDate, statusD= 1, created_at =:created_at WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $created_at = date('Y-m-d');
        $stmt->bindParam(':title', $user->title);
        $stmt->bindParam(':descriptions', $user->descriptions);
        $stmt->bindParam(':startDate', $user->startDate);
        $stmt->bindParam(':endDate', $user->endDate);
        $stmt->bindParam(':statusD', $user->statusD);
        $stmt->bindParam(':created_at', $created_at);

        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update record.'];
        }
        echo json_encode($response);
        break;


        case "DELETE":
            $sql = "DELETE FROM events WHERE id = :id";
            $path = explode('/', $_SERVER['REQUEST_URI']);
    
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
    
            if($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record.'];
            }
            echo json_encode($response);
            break;
}