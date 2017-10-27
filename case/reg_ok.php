<?php
define('ACC',true);
include('../include/init.php');
// 用户注册入库

// 接收POST过来的数据

$data = array();
$data['U_loginID'] = trim($_POST['U_loginID']);
$data['U_passWord'] = $_POST['U_passWord'];
$data['U_nickname'] = $_POST['U_nickname'];
$data['U_headPortrait'] = rand(1,6);
$repasswd = $_POST['U_repassWord'];
$verifycode = $_POST['verifycode'];
// 验证数据
if(strtolower($verifycode) !=$_SESSION['verifycode'] ){
	$msg =  '验证码错误';
     echo $msg;
	 exit;
}


// 判断POST数据
if(mb_strlen($data['U_loginID']) < 4 || mb_strlen($data['U_loginID']) > 16) {
    $msg =  '帐号长度应在4-16位';
     echo $msg;
	 exit;
}


if($data['U_passWord'] != $repasswd) {
    $msg =  '两次密码不一致';
    echo $msg;
	 exit;
}

if($data['U_passWord']=='') {
    $msg =  '密码不能为空';
    echo $msg;
	 exit;
}

$data['U_regtime'] = time();

// 调用Model
$userModel = new userModel();

// 验证用户名是否已存在
if($userModel->chkuser($data['U_loginID'])) {
    $msg =  '用户名已存在';
     echo $msg;
	 exit;
}



// 根据注册结果,提示用户

if($userModel->reg($data)) {
    $msg =  '1';
    echo $msg;
} else {
    $msg =  '注册失败';
    echo $msg;
}



