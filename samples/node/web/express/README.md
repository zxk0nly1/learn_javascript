# 用node写后台接口  --后端篇

# 第一步 先下载express 

### *- npm install express  -S 

# 引入express  创建服务器

```shell
const express = require('express')
const app = express()
app.listen(5000, ()=>{
    // 打印一下
    console.log('http://127.0.0.1:5000')
})
```

# 第二步 连接数据库

### 连接数据库需要下载  **mysql**

### - *npm install* **mysql** -S **-**

### 然后引入mysql  另外req.body需要对表单数据进行解析 所以还需引入body-parser

```shell
// 创建数据库连接
const mysql = require('mysql')
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'test'
})
// 祖册 解析表单的body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
```

### 接下来就开始做接口了

### 先获取数据

```shell
// 获取所有的数据
app.get('/api/getheros',(req,res) => {
    // 定义SQL语句
    const sqlStr = 'select * from text where isdel=0'
    conn.query(sqlStr,(err,results) => {
        console.log(results)
        if(err) return res.json({err_code:1,message:'获取失败',affectedRows:0})
        res.json({
            err_code:0,message:results,affectedRows:0
        })
    })
})
```

字码完后 先运行看看

 ![node](https://img-blog.csdn.net/20180904194937622?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1hsNDI3Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

在**Postman**(推荐)或者浏览器输入API接口 （http://127.0.0.1:5000/api/getheros)

![getheros](https://img-blog.csdn.net/20180904201027382?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1hsNDI3Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)



### 欧了，我们第一步 获取数据 也算完成了  喝杯茶~~~~

### OK 茶喝完了我们继续



<!--more-->

### 接下来我们要做的是根据ID获取对应ID的数据

### 不多比比 看代码

```javascript

// 根据ID 获取相关数据
app.get('/api/gethero',(req,res) => {
    const id = req.query.id
    const sqlStr = 'select * from text where id = ?' 
    conn.query(sqlStr,id,(err,results) => {
        if(err) return res.json({err_code:1,message:'获取数据失败',affectedRows:0})
        if(results.length !== 1) return res.json({err_code:1,message:'数据不存在',affectedRows:0})
        res.json({
            err_code:0,
            message:results[0],
            affectedRows:0
        })
    })
}）
```

### 我们再来试一下 比如我们传一个 id=1

![id](https://img-blog.csdn.net/20180904201410963?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1hsNDI3Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

### 哎呀呀 也是非常顺利呀 对应的数据获取到了 OK 缓一缓

接下来我们做删除 

```javascript

// 根据ID 删除数据
app.get('/api/delhero',(req,res) => {
    const id = req.query.id
    const sqlStr = 'update text set isdel = 1 where id=?'
    conn.query(sqlStr,id,(err,results) => {
        if(err) return res.json({err_code:1,message:'删除英雄失败',affectedRows:0})
        if(results.affectedRows !== 1) return res.json({err_code:1,message:'删除英雄失败',affectedRows:0})
        res.json({err_code:0,message:'删除英雄成功',affectedRows:results.affectedRows})
    })
})
```

![del](https://img-blog.csdn.net/20180904204144268?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1hsNDI3Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

### OK 删除成功 我们在看看本地数据库 里

![delmysql](https://img-blog.csdn.net/2018090420490614?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1hsNDI3Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

###  欧了  数据库里面变样了 删除成功

 

### 然后我们再来完成添加的功能 看代码

```javascript

// 添加数据
app.post('/api/addhero',(req,res) => {
    const hero = req.body
    console.log(hero)
    const sqlStr = 'insert into text set ?'
    conn.query(sqlStr,hero,(err,results) => {
        if(err) return res.json({err_code:1,message:'添加失败',affectedRows:0})
        if(results.affectedRows !== 1) return res.json({err_code:1,message:'添加失败',affectedRows:0})
        res.json({err_code:0,message:'添加成功',affectedRows:results.affectedRows})
    })
})
```

### 写入数据 我们可以看到再次成功了

![add](https://img-blog.csdn.net/20180905094932632?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1hsNDI3Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

### 可以看到 数据库里面的数据也添加成功了

![addmysql](https://img-blog.csdn.net/20180905095048755?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1hsNDI3Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

![addmysql1](https://img-blog.csdn.net/2018090509512235?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1hsNDI3Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

### 还有最后一个  修改的功能  需要获得修改后的数据 

```javascript
app.post('/api/updatehero',(req,res) => {
     const sqlStr = 'update text set ? where id = ?'
     conn.query(sqlStr,[req.body,req.body.id],(err,results) => {
         if(err) return res.json({err_code:1,message:'更新英雄失败',affevtedRows:0})
         //影响行数不等于1
         if(results.affectedRows !== 1) return res.json({err_code:1,message:'更新的英雄不存在',affectedRows:0})
         res.json({err_code:0,message:'更新成功',affectedRows:results.affectedRows})
     })
}
```

### 我们可以看到 我们修改的id为3  下面一看得到 更新成功 

![update](https://img-blog.csdn.net/20180904212745189?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1hsNDI3Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

### 再来看看数据库里的数据 这是更新前的

![update1](https://img-blog.csdn.net/20180904212957686?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1hsNDI3Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

### 更新后如下

![update2](https://img-blog.csdn.net/20180904213225954?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1hsNDI3Nw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

### 美滋滋  OKOKOK  追后一步搞完鸟  GG 

### OK 今天我们就做到这里了 后台管理系统的接口差不多就这么多 本宝宝也是刚入手 有什么错的地方 不全的地方 谢谢各位大牛补充