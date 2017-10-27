<?php
define('ACC',true);
include('../include/init.php');

// 登陆页面

// 接收POST数据
$u = trim($_POST['U_loginID']);
$p = $_POST['U_passWord'];
$verifycode = $_POST['verifycode'];
// 验证数据
if(strtolower($verifycode) !=@$_SESSION['verifycode'] ){
	$msg =  '验证码错误';
     echo $msg;
	 exit;
}
if(!$u || mb_strlen($u) < 4 || mb_strlen($u) > 16) {
	$msg =  '请检验用户名';
     echo $msg;
	 exit;
}

if(!$p) {
	$msg =  '密码为空';
     echo $msg;
	 exit;
}

// 调用model,查询用户名和密码
$userModel = new userModel();
$friendModel = new friendModel();
$user = $userModel->chkuser($u,$p);
if(empty($user)) {
	$msg =  '用户名密码不正确';
     echo $msg;
	 exit;
}

$userModel->uplog($user['U_id']);

// 如果查到,保存到session里
$_SESSION['U_id'] = $user['U_id'];
$_SESSION['U_loginID'] = $u;
$U_headPortrait = $userModel->getHeadImg($user['U_headPortrait']);
$U_nickname = $user['U_nickname'];
$friendList = $friendModel->getFriend($user['U_id']);
$friendCont = '';
foreach($friendList as $v) {
	$friendCont.= '<div  class=" eqq_BuddyList_Buddy" style="background-color: transparent;" id="lxr'.$v["U_id"].'">  
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
$msg =   '
	<div  class=" eqq_window window_QQ_outer" >
		<div  class="window_inner" >
			<div  class="window_bg_container" >	</div>
			<div class="window_content">
				<div  class="window_titleBar"  id="Q_person_drag">
					<div  class="window_titleButtonBar">
						<a  class="  window_close" id="Q_person_close" title="关闭"  href="javascript:void(0);" style="display: block;"></a>
						<a  class="  window_min" title="最小化" id="Q_person_min"  href="javascript:void(0);" style="display: block;"></a>
					</div>
					<div class="window_title titleText" >QQ</div>
				</div>
				<div class="window_bodyOuter">
					<div  class="window_bodyArea" >
						<div class="eqq_myPanel" >    
								<img class="eqq_myAvatar" id="eqq_myAvatar" src="'.$U_headPortrait.'" >      
								<div class="eqq_myInfo"  >       
									<div title="更改在线状态" class="eqq_myState" style="display: block;">      
										<div class="eqq_myStateShow eqq_hidden" >状态</div> 
										<div class="eqq_myStateDown">下</div>  
									</div>       
									<div title="'.$U_nickname.'" class="eqq_myNick" id="eqq_myNick" style="width: 163px;">'.$U_nickname.'</div>
								</div>      
								<div class="eqq_myService" >           
									<div class="eqq_mySignature_wraper " >
										<span>理论不懂就实践，实践不会就学理论。</span>
									</div>  
								</div>          
						</div>
						<div class="eqq_mainPanel" >
							<div   style="display: block; height: 100%;">
								<div class="eqq_SearchBar" >   
									<input type="text" title="搜索好友..." value="搜索好友..." name="" class="eqq_SearchBox">
									<div title="搜索..." class="eqq_SearchButton" >搜索按钮</div>
								</div>
								<ul class="eqq_tab">  
									<li title="联系人" class="eqq_tabBuddyList  current" >
									<a class="eqq_tabmenu_icon"  href="javascript:void(0);"></a>
									<div class="eqq_tabBuddyList_icon tab_icon"></div>
									</li>   
									<li title="群/讨论组" class="eqq_tabGroupList "  >
									<a class="eqq_tabmenu_icon" href="javascript:void(0);"></a>
									<div class="eqq_tabGroupList_icon tab_icon"></div>
									</li> 
									<li title="最近联系人" class="eqq_tabRecentList " >
									<a class="eqq_tabmenu_icon" href="javascript:void(0);"></a>
									<div class="eqq_tabRecentList_icon tab_icon"></div>
									</li>  
								</ul>
								<div  style="height: 365px;">
									<div  class="eqq_buddyListPanel eqq_List_BigHead" id="eqq_buddyListPanel" style="display: block; height: 330px;">
										'.$friendCont.'
									
									</div>
								
								
								
								</div>
								<div class="eqq_ListBottom" >   
								<a  class="searchBuddy"  href="javascript:void(0);" id="seachFriend"><div class="searchBuddy_div"></div>查找</a> 
								<a  class="buddy_manage_icon"  href="javascript:void(0);">
								<div class="buddy_manage_icon_div"></div>好友管理</a> 
								<a  class="message_manage_icon"  href="javascript:void(0);"><div class="message_manage_icon_div"></div>
								消息管理</a>  
								</div>			
								</div>

						</div>



					</div>
				</div>


			</div>
		</div>
	</div>
';
echo $msg;
exit;
