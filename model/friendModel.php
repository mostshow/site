<?php
defined('ACC')|| exit('access denied');

class friendModel extends Model {
	//查询好友
	public function getFriend($int){
		$sql = "select U_id,U_headPortrait,U_nickname from user where U_id  in  (select F_friendid from (select F_friendid,F_userId from Friends  where F_userId = '$int') as b )";
		return $this->db->getAll($sql);
	}
	//添加好友
	public function addFriend($data){
        return $this->db->autoExecute($data,'Friends');
	}
	//查询是否是好友
	public function isFriend($toId,$fromId){
		$sql = "select * from Friends where F_friendid = '$toId' and F_userId = '$fromId'";
		return $this->db->getAll($sql);
	}

}





















