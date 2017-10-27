<?php

class log {
    public static function write($err) {
        $fh = fopen(ROOT . 'data/log.txt','a'); // 追加方式打开,允许从后面追加内容
        
        $err = date('Y-m-d H:i:s',time()) . "\r\n" . $err;
        fwrite($fh,$err);

        fclose($fh);
    }
}


