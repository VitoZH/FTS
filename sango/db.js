// 加载mysql模块
const mysql = require('mysql')
// 创建连接对象
const conn = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    database:'school'
})
// 连接服务器
conn.connect()
// 导入conn对象
module.exports = conn;