<?php
define('ACC',true);
include('../include/init.php');

$data = array();
$data2 = array();
// 接收POST数据
$u = trim($_POST['U_loginID']);
$user_Id = $_SESSION['U_id'];
// 验证数据
if(!$u || mb_strlen($u) < 4 || mb_strlen($u) > 16) {
	$msg =  '用户不存在';
     echo $msg;
	 exit;
}
// 调用model,查询用户是否存在
$userModel = new userModel();
$friendModel = new friendModel();
$user = $userModel->chkuser($u);
$uId = $userModel->getId($u);
$isFriend = $friendModel->isFriend($uId,$user_Id);
if(!empty($isFriend)) {
	$msg =  '已经是好友';
     echo $msg;
	 exit;
}

if(empty($user)) {
	$msg =  '用户不存在';
     echo $msg;
	 exit;
}
$data['F_friendid'] =$uId ;
$data['F_userId'] =$user_Id;
$data2['F_userId'] =$uId ;
$data2['F_friendid'] =$user_Id;
if($friendModel->addFriend($data) &&$friendModel->addFriend($data2)){
    $msg =  '1';
    echo $msg;
}else{
    $msg =  '添加失败';
    echo $msg;
}
