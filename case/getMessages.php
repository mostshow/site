<?php
define('ACC',true);
include('../include/init.php');
// 获取信息



$toId = $_SESSION['U_id'];
$messagesModel = new messagesModel();

if($messagesModel->getMes($toId)) {
    $msg =  urlencodeArr($messagesModel->getMes($toId));
	$messagesModel->upMes($toId);
   echo json_encode($msg);
} else {
    $msg =  '没有消息';
    echo $msg;
}













