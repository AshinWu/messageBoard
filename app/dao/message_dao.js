const query = require('./mysql');

/**
 * 添加主题
 * @param {array} value 参数数组 
 */
let insertToMessageInfo = function (value) {
  let _sql = "INSERT INTO tbl_message_info(`mi_ul_id`, `mi_title`, `mi_content`, `mi_create_time`, `mi_modify_time`) VALUES (?,?,?,?,?)";
  return query(_sql, value);
}

/**
 * 查询主题列表分页
 * @param {string} author  默认all/用户名
 * @param {number} page 页面，默认1
 * @param {number} size 每页大小，默认10
 */
let findTopicList = function (author, page, size) {
  let _sql;
  if ('all' == author) {
    _sql = `SELECT tbmi.mi_id, tbmi.mi_title, tbmi.mi_content, tbmi.mi_create_time, tbmi.mi_modify_time, tbul.ul_account as author,
                tbul.ul_id, tbui.ui_nickname, tbui.ui_pic, tbui.ui_profile 
                FROM tbl_message_info tbmi
	            JOIN tbl_user_login tbul ON tbmi.mi_ul_id = tbul.ul_id
	            JOIN tbl_user_info tbui ON tbul.ul_id = tbui.ui_ul_id
                ORDER BY tbmi.mi_modify_time DESC
                limit ${page}, ${size}`;
  } else {
    _sql = `SELECT tbmi.mi_id, tbmi.mi_title, tbmi.mi_content, tbmi.mi_create_time, tbmi.mi_modify_time, tbul.ul_account as author,
                tbul.ul_id, tbui.ui_nickname, tbui.ui_pic, tbui.ui_profile 
                FROM tbl_message_info tbmi
                JOIN tbl_user_login tbul ON tbmi.mi_ul_id = tbul.ul_id
                JOIN tbl_user_info tbui ON  tbul.ul_id = tbui.ui_ul_id
                WHERE tbul.ul_account = "${author}"
                ORDER BY tbmi.mi_modify_time DESC
                limit ${page}, ${size}`;
  }
  return query(_sql);
}

/**
 * 计算主题总数
 * @param {string} author 发布者
 */
let countTopics = function (author) {
  let _sql;
  if ('all' == author) {
    _sql = `SELECT COUNT( 1 ) AS count FROM tbl_message_info tbmi JOIN tbl_user_login tbul ON tbmi.mi_ul_id = tbul.ul_id`;
  } else {
    _sql = `SELECT COUNT( 1 ) AS count FROM tbl_message_info tbmi JOIN tbl_user_login tbul ON tbmi.mi_ul_id = tbul.ul_id WHERE tbul.ul_account = "${author}"`;
  }
  return query(_sql);
}

/**
 * 根据id查找主题
 * @param {number} id 主题id
 */
let findTopicById = function (mid) {
  let _sql = `SELECT mi_id, mi_ul_id, mi_title, mi_content, mi_create_time, mi_modify_time FROM tbl_message_info WHERE mi_id = "${mid}"`;
  return query(_sql);
}

/**
 * 修改主题
 * @param {number} id 
 */
let updateTopic = function (mid, value) {
  let _sql = `UPDATE tbl_message_info SET mi_title = ?, mi_content = ?, mi_modify_time= ? WHERE mi_id = "${mid}"`;
  console.log(_sql)
  return query(_sql, value);
}

/**
 * 删除主题
 * @param {number} mid 主题id
 */
let deteteTopic = function (mid) {
  let _sql = `DELETE FROM tbl_message_info WHERE mi_id = "${mid}"`;
  console.log(_sql);
  return query(_sql);
}

module.exports = {
  insertToMessageInfo,
  findTopicList,
  countTopics,
  findTopicById,
  updateTopic,
  deteteTopic
}
