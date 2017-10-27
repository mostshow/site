SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `city`
-- ----------------------------
DROP TABLE IF EXISTS `city`;
CREATE TABLE `city` (
  `region_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `region_name` varchar(255) NOT NULL DEFAULT '',
  `level` tinyint(4) unsigned NOT NULL DEFAULT '0',
  `parent_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `city_num` int(6) NOT NULL DEFAULT '0',
  PRIMARY KEY (`region_id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=gbk;

INSERT INTO `city` VALUES ( '����', '1', '0', '0');
INSERT INTO `city` VALUES ( '�Ϻ�', '1', '0', '0');
INSERT INTO `city` VALUES ( '���', '1', '0', '0');
INSERT INTO `city` VALUES ( '����', '1', '0', '0');
INSERT INTO `city` VALUES ( '������', '1', '0', '0');
INSERT INTO `city` VALUES ( '����', '1', '0', '0');
INSERT INTO `city` VALUES ( '����', '1', '0', '0');
INSERT INTO `city` VALUES ( '���ɹ�', '1', '0', '0');
INSERT INTO `city` VALUES ( '�ӱ�', '1', '0', '0');
INSERT INTO `city` VALUES ( 'ɽ��', '1', '0', '0');
INSERT INTO `city` VALUES ( '����', '1', '0', '0');
INSERT INTO `city` VALUES ( 'ɽ��', '1', '0', '0');
INSERT INTO `city` VALUES ( '�½�', '1', '0', '0');
INSERT INTO `city` VALUES ( '����', '1', '0', '0');
INSERT INTO `city` VALUES ( '�ຣ', '1', '0', '0');
INSERT INTO `city` VALUES ( '����', '1', '0', '0');
INSERT INTO `city` VALUES ( '����', '1', '0', '0');
INSERT INTO `city` VALUES ( '����', '1', '0', '0');
INSERT INTO `city` VALUES ( '����', '1', '0', '0');
INSERT INTO `city` VALUES ( '����', '1', '0', '0');
INSERT INTO `city` VALUES ( '�㽭', '1', '0', '0');
INSERT INTO `city` VALUES ( '����', '1', '0', '0');
INSERT INTO `city` VALUES ( '����', '1', '0', '0');
INSERT INTO `city` VALUES ( '����', '1', '0', '0');
INSERT INTO `city` VALUES ( '����', '1', '0', '0');
INSERT INTO `city` VALUES ( '����', '1', '0', '0');
INSERT INTO `city` VALUES ( '�Ĵ�', '1', '0', '0');
INSERT INTO `city` VALUES ( '�㶫', '1', '0', '0');
INSERT INTO `city` VALUES ( '����', '1', '0', '0');
INSERT INTO `city` VALUES ( '����', '1', '0', '0');
INSERT INTO `city` VALUES ( '����', '1', '0', '0');
INSERT INTO `city` VALUES ( '���', '1', '0', '0');
INSERT INTO `city` VALUES ( '����', '1', '0', '0');
INSERT INTO `city` VALUES ( '̨��', '1', '0', '0');


INSERT INTO `city` VALUES ( '����', '2', '1', '101010100');









