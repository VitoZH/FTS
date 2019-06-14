// 引入express模块
const express = require('express')
// 创建服务器
const app = express()
// 启动服务器
app.listen(3000,()=>{
    console.log('kirov reporting...')
})
// 加载path模块
const path = require('path')
// 引入db.js
const db = require('./db.js')
// 启动express-art-template引擎
app.engine('html',require('express-art-template'))
// 监听并响应浏览器请求
app.get('/index',(req,res)=>{
    db.query('select * from student',(err,data)=>{
        if(err){
            console.log(err)
            return res.send('处理失败')
        }
        const obj = {list:data}
        res.render(path.join(__dirname,'view','index.html'),obj)
    })
})