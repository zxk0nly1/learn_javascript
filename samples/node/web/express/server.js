const express = require('express');
const app = express();
app.listen(5000, () => {
    console.log('server listening in http://127.0.0.1:5000');
})

const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    'password': '',
    database: 'demo'
});

const bodyParse = require('body-parser');
app.use(bodyParse.urlencoded({ extended: false }));
// 获取功能
app.get('/api/getheros', (req, res) => {
    const id = req.query.id;
    const sqlStr = 'Select * from user where id = ?';
    conn.query(sqlStr, id, (err, results) => {
        console.log(results);
        if (err) return res.json({ err_code: 1, message: '获取数据失败', affectedRows: 0 });
        if (results.length !== 1) return res.json({ err_code: 1, message: '数据不存在', affectedRows: 0 })
        res.json({ err_code: 0, message: results[0], affectedRows: 0 })
    })
});
// 删除功能
app.get('/api/delhero', (req, res) => {
        const id = req.query.id;
        console.log("affectedRow is ", req.query);
        const sqlStr = 'update user set isDel = 1 where id =?';
        conn.query(sqlStr, id, (err, results) => {
            if (err) return res.json({ err_code: 1, message: '删除人物失败', affectedRows: 0 });
            if (results.affectedRows !== 1) return res.json({ err_code: 1, message: '删除人物失败', affectedRows: 0 });
            res.json({ err_code: 0, message: '删除人物成功', affectedRows: results.affectedRows })
        })
    })
    // 添加功能
app.post('/api/addhero', (req, res) => {
    const hero = req.body;
    console.log("affectedRow is", hero);
    const sqlStr = 'insert into user set ?';
    conn.query(sqlStr, hero, (err, results) => {
        if (err) return res.json({ err_code: 1, message: '添加人物失败', affectedRows: 0 });
        if (results.affectedRows !== 1) return res.json({ err_code: 1, message: '添加人物失败', affectedRows: 0 });
        res.json({ err_code: 0, message: '添加人物成功', affectedRows: results.affectedRows })
    })
})

// 修改功能
app.post('/api/updatehero', (req, res) => {
    const hero = req.body;
    console.log("affectedRow is", hero);
    const sqlStr = 'update user set ? where id = ?';
    conn.query(sqlStr, [req.body, req.body.id], (err, results) => {
        if (err) return res.json({ err_code: 1, message: '更新人物失败', affectedRows: 0 });
        if (results.affectedRows !== 1) return res.json({ err_code: 1, message: '更新人物不存在', affectedRows: 0 });
        res.json({ err_code: 0, message: '更新人物成功', affectedRows: results.affectedRows })
    })
})