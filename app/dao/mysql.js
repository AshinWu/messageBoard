const mysql = require('mysql2');
const config = require('../../config/db');

//数据库连接池
var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
});


/**
 * 通用查询
 * @param {string} sql 
 * @param {array} value 
 */
var query = function (sql, value) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, value, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          connection.release();
        })
      }
    })
  })
}

module.exports = query;
