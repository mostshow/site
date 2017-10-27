<?php
define('ACC',true);
include('../include/init.php');


$userModel = new userModel();
$friendModel = new friendModel();
$use_id = $_SESSION['U_id'];
$friendList = $friendModel->getFriend($use_id);
$friendCont = '';
foreach($friendList as $v) {
	$friendCont.= '<div  class="eqq_BuddyList_Buddy" style="background-color: transparent;" id="lxr'.$v["U_id"].'">  
											<div title="在线"  class="eqq_BuddyList_AvatarContainer" >   
												<img src="'.$userModel->getHeadImg($v['U_headPortrait']).'"  class="eqq_BuddyList_Avatar">  
												<div class="eqq_BuddyList_State"></div>    
											</div>  
											<div title="'.$v["U_nickname"].'" class="eqq_BuddyList_RightContainer">   
												<div class="eqq_BuddyList_Nick ">'.$v["U_nickname"].'</div>                
												<div class="eqq_BuddyList_Sign" title="理论不懂就实践，实践不会就学理论。" >理论不懂就实践，实践不会就学理论。
												</div>   
											</div>   
										</div>';

};
if($friendCont){
	echo $friendCont;
};



