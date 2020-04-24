const query = require('./mysql');

/**
 * 注册用户
 * @param {array} value 参数数组 
 */
let registerUser = function (value) {
  let _sql = "INSERT INTO tbl_user_login(`ul_account`, `ul_password`, `ul_status`, `ul_last_login_time`) VALUES (?,?,?,?)";
  return query(_sql, value);
};

/**
 * 查找根据id查找用户
 * @param {number} id  用户id
 */
let findUserById = function (id) {
  let _sql = `SELECT tbui.ui_id, tbui.ui_nickname, tbui.ui_pic, tbui.ui_profile FROM tbl_user_info tbui WHERE tbui.ui_id = "${id}"`;
  return query(_sql);
};

/**
 * 查找根据name查找用户
 * @param {string} name 用户名
 */
let findUserByName = function (name) {
  let _sql = `SELECT tbul.ul_id, tbul.ul_account, tbul.ul_password as token, tbul.ul_status, tbul.ul_last_login_time, tbui.ui_nickname, tbui.ui_pic, tbui.ui_profile, tbui.ui_create_time 
                FROM tbl_user_login tbul 
                JOIN tbl_user_info tbui 
                ON tbul.ul_id = tbui.ui_ul_id 
                WHERE tbul.ul_account = "${name}"`;
  return query(_sql);
};

/**
 * 注册同时写入信息表
 * @param {*} value 参数数组
 */
let insertToUserInfo = function (value) {
  let _sql = "INSERT INTO tbl_user_info(`ui_ul_id`, `ui_pic`, `ui_create_time`) VALUES (?,?,?)";
  return query(_sql, value);
};

/**
 * 修改登录状态
 * @param {string} name 用户名
 */
let updateLoginStatus = function (name, value) {
  let _sql = `UPDATE tbl_user_login SET ul_status = ? WHERE ul_account = "${name}";`;
  return query(_sql, value);
};

/**
 * 测试用户是否登录
 * @param {string} name  用户名
 */
let checkIsLogin = function (name) {
  let _sql = `SELECT ul_id FROM tbl_user_login WHERE ul_account="${name}" AND ul_status = 1`;
  return query(_sql);
}

module.exports = {
  registerUser,
  findUserById,
  findUserByName,
  insertToUserInfo,
  updateLoginStatus,
  checkIsLogin
}
