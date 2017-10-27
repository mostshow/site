<?php
defined('ACC')||exit('access denied');


class BgModel extends Model {
	//记录上传图片
	public function upImg($data){
		$le = count($data);
		for($i = 0; $i <= $le; $i++){
			$this->db->autoExecute($data[$i],'backgroundimg');
		}
	}
}
