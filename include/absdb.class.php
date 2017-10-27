<?php

// 一个抽象的数据库操作类
abstract class absdb {
    /*
        参数 String $sql sql语句
        返回 数组
    */
    abstract public function getAll($sql);

    /*
        参数 String $sql sql语句
        返回 一维数组
    */
    abstract public function getRow($sql);

    /*
        参数 String $sql sql语句
        返回 单个值
    */
    abstract public function getOne($sql);

    /*
        参数 String $sql sql语句
        返回 bool/resource
    */
    abstract public function query($sql);

    /*
        参数 array $data
             String  $table名
             String $act 动作(insert/update)
        作用:
             根据$data,$table,$act生成相应的insert/update语句
             执行,并返回bool

    */
    abstract public function autoExecute($data,$table,$act='insert');
}