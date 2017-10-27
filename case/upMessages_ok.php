<?php
define('ACC',true);
include('../include/init.php');


$toId = $_SESSION['U_id'];
$messagesModel = new messagesModel();


$messagesModel->upMes($toId);














