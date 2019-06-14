// 加载express模块
const express = require('express');
// 创建服务器
const app = express();
// 启动服务器
app.listen(3000,()=>{
    console.log('kirov reporting...');
})
// 加载path模块
const path = require('path')
// 加载bd.js
const db = require('./db.js')
// 启动template引擎
app.engine('html',require('express-art-template'))
// 监听并响应浏览器请求
app.get('/index',(req,res)=>{
    // 设置查找
    db.query('select * from student',(err,data)=>{
        if(err){
            console.log(err)
            return res.send('加载失败')
        }
        // 结合数据返回到浏览器
        const obj = {list:data}
        res.render(path.join(__dirname,'view','index.html'),obj)
    })
})
// 点击添加按钮显示添加界面
app.get('/add',(req,res)=>{
    res.sendFile(path.join(__dirname,'view','add.html'))
})
// 加载body-parser模块
const bp = require('body-parser')
// 注册中间件
app.use(bp.urlencoded({extended:false}))
// 点击添加按钮添加数据
app.post('/addstudent',(req,res)=>{
    // 获取要添加的数据
    const obj = req.body
    // 将数据加入到数据库
    db.query('insert into student set ?',obj,(err,data)=>{
        if(err){
            return console.log(err)
        }
        console.log(data)
        // 刷新页面
        db.query('select * from student',(err,data)=>{
            if(err){
                console.log(err)
                return res.send('加载失败')
            }
            const obj = {list:data}
            res.render(path.join(__dirname,'view','index.html'),obj)
        })
    })
})
// 点击编辑按钮显示编辑页面
app.get('/update',(req,res)=>{
    res.sendFile(path.join(__dirname,'view','update.html'))
})
// 点击删除按钮删除当前数据
app.get('/delete/:sno',(req,res)=>{
    db.query('delete from student where sno=?',req.params.sno,(err,data)=>{
        if(err){
            return console.log(err)
        }
        db.query('select * from student',(err,data)=>{
            if(err){
                console.log(err)
                return res.send('加载失败')
            }
            const obj = {list:data}
            res.render(path.join(__dirname,'view','index.html'),obj)
        })
    })
})
// 点击修改按钮修改数据
app.get('/update/:sno',(req,res)=>{
    const sno = req.params.sno;
    res.sendFile(path.join(__dirname,'view','update.html'))
    app.post('/updateStudent',(req,res)=>{
        const obj = req.body
        db.query('update student set ? where sno=?',[obj,sno],(err,data)=>{
            if(err){
                return console.log(err)
            }
            console.log(data)
            db.query('select * from student',(err,data)=>{
                if(err){
                    console.log(err)
                    return res.send('加载失败')
                }
                const obj = {list:data}
                res.render(path.join(__dirname,'view','index.html'),obj)
            })
        })
    })
})