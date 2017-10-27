<?php
defined('ACC')||exit('access denied');


class userModel extends Model {

    // 注册的方法
    public function reg($data) {
        $data['U_passWord'] = $this->encpass($data['U_passWord']);
        return $this->db->autoExecute($data,'user');
    }

    // 查询用户的方法
    public function chkuser($username,$passwd='') {
        if($passwd == '') {
            $sql = "select count(*) from user where U_loginID = '$username'";
            return $this->db->getOne($sql);
        } else {
            $passwd = $this->encpass($passwd);
            $sql = "select U_id,U_loginID,U_headPortrait,U_nickname from user where U_loginID = '$username' and U_passWord = '$passwd'";
            return $this->db->getRow($sql);
        }
    }
	//查询头像url
	public function getHeadImg ($id){
		$sql = "select head_url,Head_id from HeadPortrai where Head_id = '$id'";
		return $this->db->getOne($sql);
	}

    // 加密密码
    public function encpass($passwd) {
        return md5($passwd);
    }
	//返回用户ID
	public function getId($login_id){
		$sql = "select U_id,U_loginID from user where U_loginID = '$login_id'";
		return $this->db->getOne($sql);
		return $data['U_id'];
	}
    // 更新登陆时间
    public function uplog($user_id) {
        $data = array('U_lastlogin'=>time());
        $this->db->autoExecute($data,'user','update',"U_id=$user_id");
    }
}
