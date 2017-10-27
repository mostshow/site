<?php
define('ACC',true);
include('../include/init.php');

$_SESSION['U_id'] = null;
$_SESSION['U_loginID'] = null;
session_destroy();

echo '退出成功！';

?>