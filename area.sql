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

INSERT INTO `city` VALUES ( '北京', '1', '0', '0');
INSERT INTO `city` VALUES ( '上海', '1', '0', '0');
INSERT INTO `city` VALUES ( '天津', '1', '0', '0');
INSERT INTO `city` VALUES ( '重庆', '1', '0', '0');
INSERT INTO `city` VALUES ( '黑龙江', '1', '0', '0');
INSERT INTO `city` VALUES ( '吉林', '1', '0', '0');
INSERT INTO `city` VALUES ( '辽宁', '1', '0', '0');
INSERT INTO `city` VALUES ( '内蒙古', '1', '0', '0');
INSERT INTO `city` VALUES ( '河北', '1', '0', '0');
INSERT INTO `city` VALUES ( '山西', '1', '0', '0');
INSERT INTO `city` VALUES ( '陕西', '1', '0', '0');
INSERT INTO `city` VALUES ( '山东', '1', '0', '0');
INSERT INTO `city` VALUES ( '新疆', '1', '0', '0');
INSERT INTO `city` VALUES ( '西藏', '1', '0', '0');
INSERT INTO `city` VALUES ( '青海', '1', '0', '0');
INSERT INTO `city` VALUES ( '甘肃', '1', '0', '0');
INSERT INTO `city` VALUES ( '宁夏', '1', '0', '0');
INSERT INTO `city` VALUES ( '河南', '1', '0', '0');
INSERT INTO `city` VALUES ( '江苏', '1', '0', '0');
INSERT INTO `city` VALUES ( '湖北', '1', '0', '0');
INSERT INTO `city` VALUES ( '浙江', '1', '0', '0');
INSERT INTO `city` VALUES ( '安徽', '1', '0', '0');
INSERT INTO `city` VALUES ( '福建', '1', '0', '0');
INSERT INTO `city` VALUES ( '江西', '1', '0', '0');
INSERT INTO `city` VALUES ( '湖南', '1', '0', '0');
INSERT INTO `city` VALUES ( '贵州', '1', '0', '0');
INSERT INTO `city` VALUES ( '四川', '1', '0', '0');
INSERT INTO `city` VALUES ( '广东', '1', '0', '0');
INSERT INTO `city` VALUES ( '云南', '1', '0', '0');
INSERT INTO `city` VALUES ( '广西', '1', '0', '0');
INSERT INTO `city` VALUES ( '海南', '1', '0', '0');
INSERT INTO `city` VALUES ( '香港', '1', '0', '0');
INSERT INTO `city` VALUES ( '澳门', '1', '0', '0');
INSERT INTO `city` VALUES ( '台湾', '1', '0', '0');


INSERT INTO `city` VALUES ( '北京', '2', '1', '101010100');









