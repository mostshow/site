<?php
defined('ACC')||exit('Access Denied');
// 配置文件读取类

class conf {
    protected static $ins = null;
    protected $cfg = array();
    
    public static function getIns() {
        if(self::$ins === null) {
            self::$ins = new self();
        }

        return self::$ins;
    }

    final protected function __construct() {
        require(ROOT . 'include/config.php');
        $this->cfg = $cfg;
    }

    // 根据指定的配置项,返回该配置项的值
    public function __get($k) {
        if(!isset($this->cfg[$k])) {
            return null;
        }

        return $this->cfg[$k];
    }

    // 根据指定的配置项,返回配置项的值
    public function __set($k,$v) {
        $this->cfg[$k] = $v;
    }

}



/*

$conf = conf::getIns();

echo $conf->db,'<br />';


$conf->db = '';

echo $conf->db;

*/