<?php
define('ACC',true);
header('content:text/html;charset:utf-8');
include('../include/init.php');
include('../library/mostUpload.class.php');
$upload = new upload();
$upImg = new bgModel();
$rs = $upload->up('Files');
if(!$rs) {
    $msg =  '文件上传失败\\n'.$msg.$upload->getErr();
}else{
	$upImg->upImg($rs );
    $msg =  '上传成功,暂未解决上传程序成功后初始化';
}






echo "<script>window.parent.Finish('".$msg ."');</script>";	



