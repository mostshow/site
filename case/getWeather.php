<?php
header("content-type: text/html");  
define('ACC',true);
include('../include/init.php');
$arr =file("../data/weatherCity.txt");
$b =$_GET["city"];
function seach($arr,$b){
	for($i = 0; $i<count($arr);$i++){
			if(stripos($arr[$i],$b)){
				$arr[$i] =explode('=',$arr[$i]);
				return $arr[$i][0];
				break;
			}
	};
	return '101010100';
}
$id = seach($arr,$b);  
$url = 'http://www.weather.com.cn/data/cityinfo/';  
$data = file_get_contents($url . $id .'.html');  
echo $data;


