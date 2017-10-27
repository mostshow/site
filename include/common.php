<?php
// common.php 
// 专门用来放置整个网站都会用到的常用函数

function addslash($arr) {
    foreach($arr as $k=>$v) {
        if(is_array($v)) {
            $arr[$k] = addslash($v);
        } else if(is_string($v)) {
            $arr[$k] = addslashes($v);
        }
    }

    return $arr;
}


function msg($message) {
    include(ROOT . 'view/msg.html');
    exit;
}
function urlencodeArr($arr){
	foreach($arr as $k => $v){
        if(is_array($v)) {
            $arr[$k] = urlencodeArr($v);
		} else{
            $arr[$k] = urlencode($v);
		}
	}
	return  $arr;
}
function mk_dir($path) {
    if(is_dir($path)) {
        return true;
    }

    if(is_dir(dirname($path))||mk_dir(dirname($path))) {
        return mkdir($path); 
    }
}
function deleteDir($path){
        $handle=opendir($path);
        while(false!==($file=readdir($handle))){
            if($file!='.'&&$file!='..'){
                $subpath=$path.'/'.$file;
                if(is_file($subpath)){
                    unlink($subpath);
                }
                if(is_dir($subpath)){
                    deleteDir($subpath);
                }                     
            }
       }
       closedir($handle);
       return rmdir($path);

}