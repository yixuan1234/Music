// 搭建服务器
let express = require('express');
// 引入path
let path = require('path')
// 引入ejs
let ejs = require('ejs')
// 引入fs
let fs = require('fs')
// 引入http 
let http = require('http')
// 引入https
let https = require('https')
//创建服务器
let app = express()
// 静态化目录
app.use('/static/',express.static(path.join(process.cwd(),'./static/')))
app.use('/favicon.ico',express.static(path.join(process.cwd(),'./static/favicon.ico')))
// 配置html扩展名
app.engine('.html',ejs.__express)
// 路由
app.get('/',(req,res) => {
    // res.render('demo.html')
    res.render('home.html')
})
// 端口号
// app.listen(3000)
// http和https
// 端口号
let httpPort = 3000;
let httpsPort = 3001;
// 引入密钥
let key = fs.readFileSync(path.join(process.cwd(),'./ssl/private.pem'))
let cert = fs.readFileSync(path.join(process.cwd(),'./ssl/file.crt'))
// 监听端口号
http.createServer(app)
        .listen(httpPort,() => console.log('http port listen at' + httpPort))
https.createServer({key,cert},app)
        .listen(httpsPort,() => console.log('https port listen at' + httpsPort))