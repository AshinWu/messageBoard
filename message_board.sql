/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50710
 Source Host           : localhost:3306
 Source Schema         : message_board

 Target Server Type    : MySQL
 Target Server Version : 50710
 File Encoding         : 65001

 Date: 07/05/2019 14:41:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tbl_message_info
-- ----------------------------
DROP TABLE IF EXISTS `tbl_message_info`;
CREATE TABLE `tbl_message_info`  (
  `mi_id` int(11) NOT NULL AUTO_INCREMENT,
  `mi_ul_id` int(11) NOT NULL,
  `mi_title` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `mi_content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `mi_read_count` int(10) NULL DEFAULT 0,
  `mi_create_time` timestamp(0) NULL DEFAULT NULL,
  `mi_modify_time` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`mi_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 91 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_message_info
-- ----------------------------
INSERT INTO `tbl_message_info` VALUES (50, 28, '全新测试', '柯南柯南', 0, '2019-05-05 15:59:02', '2019-05-05 15:59:02');
INSERT INTO `tbl_message_info` VALUES (51, 28, '清空数据', '重新插入数据', 0, '2019-05-05 15:59:18', '2019-05-05 15:59:18');
INSERT INTO `tbl_message_info` VALUES (52, 28, '现在开始', 'lets go go go ', 0, '2019-05-05 15:59:30', '2019-05-05 15:59:30');
INSERT INTO `tbl_message_info` VALUES (53, 28, '有点无聊', '哈哈哈哈哈哈哈哈哈', 0, '2019-05-05 15:59:42', '2019-05-05 15:59:42');
INSERT INTO `tbl_message_info` VALUES (54, 29, '大家好', '我叫root', 0, '2019-05-05 16:00:04', '2019-05-05 16:00:04');
INSERT INTO `tbl_message_info` VALUES (55, 29, '头像数据', '头像数据，测试通过', 0, '2019-05-05 16:00:17', '2019-05-05 16:00:17');
INSERT INTO `tbl_message_info` VALUES (56, 29, '应该可以了', '接下来做用户个人留言列表', 0, '2019-05-05 16:00:34', '2019-05-05 16:00:34');
INSERT INTO `tbl_message_info` VALUES (57, 30, 'test', 'testtestest', 0, '2019-05-05 16:42:18', '2019-05-05 16:42:18');
INSERT INTO `tbl_message_info` VALUES (58, 30, '青年榜样习近平', '“广大青年要牢记‘空谈误国、实干兴邦’，立足本职、埋头苦干，从自身做起，从点滴做起，用勤劳的双手、一流的业绩成就属于自己的人生精彩。”习近平用自己的火热青春，为这句寄语写下生动注脚。', 0, '2019-05-05 16:44:27', '2019-05-05 16:44:27');
INSERT INTO `tbl_message_info` VALUES (59, 30, '搭乘波音737 MAX', '据英国《每日邮报》5月4日报道，波音737 MAX系列客机在5个月内发生两起致命空难，引发安全疑虑，各国纷纷宣布停飞。不过，美国亿万富翁巴菲特4日表示，如要搭乘波音737 MAX飞机，他不会多做犹豫。', 0, '2019-05-05 16:44:46', '2019-05-05 16:44:46');
INSERT INTO `tbl_message_info` VALUES (64, 30, '测试11', '11122', 0, '2019-05-06 11:55:16', '2019-05-06 12:00:19');
INSERT INTO `tbl_message_info` VALUES (65, 30, '完成80%', '舒服的', 0, '2019-05-06 11:55:33', '2019-05-06 11:55:33');
INSERT INTO `tbl_message_info` VALUES (66, 30, '测试用户数据', '111', 0, '2019-05-06 14:10:03', '2019-05-06 14:10:03');
INSERT INTO `tbl_message_info` VALUES (67, 30, '测试', '111', 0, '2019-05-06 14:10:21', '2019-05-06 17:14:46');
INSERT INTO `tbl_message_info` VALUES (68, 30, '努力游泳队画', '还要年里感冒', 0, '2019-05-06 14:10:37', '2019-05-06 14:10:37');
INSERT INTO `tbl_message_info` VALUES (69, 30, '测试详情 1', '好用的，确认以后才能打开下载地址页面。原理也比较清晰。主要用于删除单条信息确认。', 0, '2019-05-06 14:10:55', '2019-05-06 16:55:58');
INSERT INTO `tbl_message_info` VALUES (70, 30, '世园会“北京扶贫馆”开门迎客', '五一小长假，令人瞩目的北京世园会吸引了众多游客。在世园会脱贫攻坚展区，占地160平方米的北京扶贫馆5月2日开门迎客。\n\n', 0, '2019-05-06 14:11:31', '2019-05-06 14:11:31');
INSERT INTO `tbl_message_info` VALUES (71, 30, '投资2000万', '投资2000万狂赚1400亿美元，这个人被马云视为导师，如今富可敌国', 0, '2019-05-06 14:12:06', '2019-05-06 14:12:06');
INSERT INTO `tbl_message_info` VALUES (72, 28, '微信、支付宝的新对手来了', '前几日，央行宣布“2019版第五套人民币”即将在8月发售的消息在朋友圈刷屏，听到这个消息之时，突然想起自己上一次使用纸币还是半年前，随着移动支付风靡全国，以支付宝和微信支付为代表的便捷支付方式被更多人接受，一部手机就可以完成超市商铺，公交出行等支付问题，这种便捷安全的支付方式很快就替代现金交易，成为生活中的一种常态', 0, '2019-05-06 14:12:44', '2019-05-06 14:12:44');
INSERT INTO `tbl_message_info` VALUES (73, 28, '创业要抓住未来新的项目趋势', '未来5年的创业机会是什么样的呢，这也是很多人都在不断探索中，往往那些有远见的创业者就能根据当下市场趋势，能够感觉到一些新的行业潜力，他们就会在接下来的时间内去准备。因此，谁能早点发现这里的机会，那么就能早一步去研究，这样就能快人一步。好的项目就是这样一步步来的，当浮现在大众眼前时，再开始去做的话，市场份额就少了很多，也没有那么容易去做了', 0, '2019-05-06 14:13:26', '2019-05-06 14:13:26');
INSERT INTO `tbl_message_info` VALUES (74, 30, '最后一个功能', '测试登录！', 0, '2019-05-06 19:06:50', '2019-05-06 19:06:50');
INSERT INTO `tbl_message_info` VALUES (75, 30, 'j接口测试', '涉及基金', 0, '2019-05-06 19:48:07', '2019-05-06 19:48:07');
INSERT INTO `tbl_message_info` VALUES (77, 34, '缺乏创新的模仿都是浮云', '我们学习了非常多的成功案例，拜读了很多成功者的自传，听取了许多成功人士的演讲。可是为什么在我们听了那么多成功的故事后，依然还在失败的边缘苦苦挣扎呢？', 0, '2019-05-06 20:11:39', '2019-05-06 20:11:51');
INSERT INTO `tbl_message_info` VALUES (80, 38, '111', '1222', 0, '2019-05-07 09:55:38', '2019-05-07 09:55:38');

-- ----------------------------
-- Table structure for tbl_user_info
-- ----------------------------
DROP TABLE IF EXISTS `tbl_user_info`;
CREATE TABLE `tbl_user_info`  (
  `ui_id` int(11) NOT NULL AUTO_INCREMENT,
  `ui_ul_id` int(11) NOT NULL,
  `ui_nickname` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `ui_pic` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ui_profile` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `ui_create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`ui_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_user_info
-- ----------------------------
INSERT INTO `tbl_user_info` VALUES (15, 27, '', 'default.png', NULL, '2019-05-05 15:55:23');
INSERT INTO `tbl_user_info` VALUES (16, 28, '', '8631n2vtdk01557043131196.png', NULL, '2019-05-05 15:58:51');
INSERT INTO `tbl_user_info` VALUES (17, 29, '', '7jjah87b1b1557043196266.png', NULL, '2019-05-05 15:59:56');
INSERT INTO `tbl_user_info` VALUES (18, 30, '', '3rc96htekz1557045730308.png', NULL, '2019-05-05 16:42:10');
INSERT INTO `tbl_user_info` VALUES (21, 33, '', 'default.png', NULL, '2019-05-06 17:53:36');
INSERT INTO `tbl_user_info` VALUES (22, 34, '', '5lc8e6fjmv1557144592713.png', NULL, '2019-05-06 20:09:52');
INSERT INTO `tbl_user_info` VALUES (23, 37, '', 'default.png', NULL, '2019-05-06 20:40:46');
INSERT INTO `tbl_user_info` VALUES (24, 38, '', '4nkufrwrjk1557146587453.png', NULL, '2019-05-06 20:43:07');
INSERT INTO `tbl_user_info` VALUES (30, 44, '', '3tri30xdie1557200798323.png', NULL, '2019-05-07 11:46:38');

-- ----------------------------
-- Table structure for tbl_user_login
-- ----------------------------
DROP TABLE IF EXISTS `tbl_user_login`;
CREATE TABLE `tbl_user_login`  (
  `ul_id` int(11) NOT NULL AUTO_INCREMENT,
  `ul_account` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ul_password` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ul_status` tinyint(4) NULL DEFAULT NULL COMMENT '0:登出；1:登录',
  `ul_last_login_time` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`ul_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 45 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_user_login
-- ----------------------------
INSERT INTO `tbl_user_login` VALUES (28, 'wzs', 'e10adc3949ba59abbe56e057f20f883e', 0, '2019-05-05 15:58:51');
INSERT INTO `tbl_user_login` VALUES (29, 'root', '63a9f0ea7bb98050796b649e85481845', 0, '2019-05-05 15:59:56');
INSERT INTO `tbl_user_login` VALUES (30, 'test', '098f6bcd4621d373cade4e832627b4f6', 1, '2019-05-05 16:42:10');
INSERT INTO `tbl_user_login` VALUES (33, 'test2', 'e10adc3949ba59abbe56e057f20f883e', 0, '2019-05-06 17:53:36');
INSERT INTO `tbl_user_login` VALUES (34, 'ashin', 'e10adc3949ba59abbe56e057f20f883e', 0, '2019-05-06 20:09:52');
INSERT INTO `tbl_user_login` VALUES (35, 'ttt', '698d51a19d8a121ce581499d7b701668', 1, '2019-05-06 20:35:39');
INSERT INTO `tbl_user_login` VALUES (36, 'rrr', '44f437ced647ec3f40fa0841041871cd', 1, '2019-05-06 20:36:19');
INSERT INTO `tbl_user_login` VALUES (37, 'zhangsan', 'e10adc3949ba59abbe56e057f20f883e', 0, '2019-05-06 20:40:46');
INSERT INTO `tbl_user_login` VALUES (38, 'lisi', 'e10adc3949ba59abbe56e057f20f883e', 0, '2019-05-06 20:43:07');
INSERT INTO `tbl_user_login` VALUES (44, 'wuzishen', 'e10adc3949ba59abbe56e057f20f883e', 0, '2019-05-07 11:46:38');

SET FOREIGN_KEY_CHECKS = 1;
