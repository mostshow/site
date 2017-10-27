<?php
define('ACC',true);
include('../include/init.php');
// 信息入库

// 接收POST过来的数据

$jsonString = $_POST['jsonStr'];
$json = stripslashes($jsonString);
$jsonArray = json_decode($json,true);
$jsonArray['M_fromuserid'] = $_SESSION['U_id'];
$jsonArray['M_status'] = 1;
$jsonArray['M_times'] = date("Y-m-d H:i:s");

$messagesModel = new messagesModel();

if($messagesModel->saveMes($jsonArray)) {
    $msg =  '发送成功';
    echo $msg;
} else {
    $msg =  '发送失败';
    echo $msg;
}













