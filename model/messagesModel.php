<?php
defined('ACC')||exit('access denied');
class messagesModel extends Model {
	//保存消息
    public function saveMes($data) {
        return $this->db->autoExecute($data,'Messages');
    }
	public function getMes($toId){
		$sql = "select M_times,M_postMessages,M_fromuserid,M_touserid,M_status,U_id,U_nickname from Messages as mes left join user as user1 on  mes.M_fromuserid =user1.U_id  where M_touserid = '$toId' and M_status = 1" ;
		return $this->db->getAll($sql);
	}
    // 更新信息状态
    public function upMes($toId) {
        $data = array('M_status'=>0);
        $this->db->autoExecute($data,'Messages','update',"M_touserid=$toId");
    }
}



















