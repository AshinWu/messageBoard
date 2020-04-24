/**
 * API错误名称
 */
var ApiErrorNames = {};

ApiErrorNames.UNKNOW_ERROR = "unknowError";
ApiErrorNames.USER_NOT_EXIST = "userNotExist";
ApiErrorNames.USER_ALREADY_EXIST = "userAlreadyExist";
ApiErrorNames.USER_LOGIN_ERROR = "userLoginError";
ApiErrorNames.PASS_WORD_ERROR = "passworderror";
ApiErrorNames.NOT_SIGNED_IN = "notSignedin";

ApiErrorNames.ADD_TOPIC_ERROR = "addTopicError";
ApiErrorNames.UPDATE_TOPIC_ERROR = "updateTopicError";
ApiErrorNames.DELETE_TOPIC_ERROR = "deleteTopicError";

ApiErrorNames.TOPIC_NOT_EXIST = "topicNotExise";

/**
 * API错误名称对应的错误信息
 */
const error_map = new Map();

error_map.set(ApiErrorNames.UNKNOW_ERROR, { code: -1, message: '未知错误' });
error_map.set(ApiErrorNames.USER_NOT_EXIST, { code: 101, message: '用户不存在' });
error_map.set(ApiErrorNames.USER_ALREADY_EXIST, { code: 102, message: '用户已存在' });
error_map.set(ApiErrorNames.USER_LOGIN_ERROR, { code: 103, message: '用户名密码错误' });
error_map.set(ApiErrorNames.NOT_SIGNED_IN, { code: 110, message: '未登录' });
error_map.set(ApiErrorNames.PASS_WORD_ERROR, { code: 111, message: '两次输入的密码不一致' });

error_map.set(ApiErrorNames.ADD_TOPIC_ERROR, { code: 201, message: '添加主题失败' });
error_map.set(ApiErrorNames.UPDATE_TOPIC_ERROR, { code: 202, message: '修改主题失败' });
error_map.set(ApiErrorNames.DELETE_TOPIC_ERROR, { code: 203, message: '删除主题失败' });

error_map.set(ApiErrorNames.TOPIC_NOT_EXIST, { code: 211, message: '主题不存在' });


//根据错误名称获取错误信息
ApiErrorNames.getErrorInfo = (error_name) => {

  var error_info;

  if (error_name) {
    error_info = error_map.get(error_name);
  }

  //如果没有对应的错误信息，默认'未知错误'
  if (!error_info) {
    error_name = UNKNOW_ERROR;
    error_info = error_map.get(error_name);
  }

  return error_info;
}

module.exports = ApiErrorNames;