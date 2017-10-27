<?php
defined('ACC')||exit('Access Denied');

class Model {
    protected $db = null;

    public function __construct() {
        
        try {
            $this->db = mysql::getIns();
        } catch(Exception $e) {
            // $e就是前文中 throw出来的 $error (Exception的实例)
            // $e对象有一些方法和属性,能准确判断出问题的行.
            $err = '';
            $err .= '错误代码:' . $e->getCode() . "\r\n";
            $err .= '错误信息:' . $e->getMessage() . "\r\n";
            $err .=  '文件:' . $e->getFile() . "\r\n";
            $err .=  '行号:' . $e->getLine() . "\r\n";
            echo '致命错误,代码',$e->getCode();
            log::write($err);
            exit;
        }

    }
}


