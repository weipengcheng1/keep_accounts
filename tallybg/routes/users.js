var express = require('express');
const mysql = require("mysql");
const Page = require("../public/javascripts/page.class");
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "accounting"
});
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(req.query);
  const op = req.query.op;
  if (op == 'getBill') {
    const openid = req.query.openid, nowPage = req.query.page;
    const sort_pages = 5;
    //获取总条数
    const countsql = `select count(*) as 'total' from jz_bill where  openid='${openid}'`;
    db.query(countsql, (err, data) => {
      if (err) {
        res.send(JSON.stringify({ code: 10001, msg: "服务器繁忙，请稍后重试" }));
      }
      const count = data[0].total;
      const page = new Page(+nowPage, +sort_pages, +count);
      const startRow = page.getStartRow(), pageInfo = page.getPageInfo();
      const sql = `select * from jz_bill where openid='${openid}'  order by create_time desc limit ${startRow},${sort_pages}`;
      db.query(sql, (err, data) => {
        if (err) {
          res.send(JSON.stringify({ code: 10001, msg: "服务器繁忙，请稍后重试" }));
        }
        for (let i = 0; i < data.length; i++) {
          const time = new Date(+(data[i].create_time));
          data[i].create_time = time.getFullYear() + "年" + (time.getMonth() + 1) + "月" + time.getDate() + '日';
          data[i].month = time.getMonth() + 1;
          data[i].day = time.getDate();
        }
        res.send(JSON.stringify({ code: 0, msg: "查询结果", info: data, pageInfo: pageInfo }));
      })
    });
  } else if (op === 'getdetail') {
    const id = req.query.id ? req.query.id : "";
    if (id == '' || id == null) {
      res.send(JSON.stringify({ code: 10001, msg: "账单信息错误" }));
    }
    const sql = `select * from jz_bill where id=${+id}`;
    db.query(sql, (err, data) => {
      if (err) {
        res.send(JSON.stringify({ code: 10002, msg: "账单信息错误" }));
      }
      if (data.length === 0) {
        res.send(JSON.stringify({ code: 10004, msg: "账单信息错误" }));
      }
      const time = new Date(+(data[0].create_time));
      const month = time.getMonth() + 1 <= 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
      const date = time.getDate() <= 9 ? '0' + (time.getDate()) : time.getDate();
      const hours = time.getHours() <= 9 ? '0' + (time.getHours()) : time.getHours();
      const minutes = time.getMinutes() <= 9 ? '0' + (time.getMinutes()) : time.getMinutes();
      data[0].create_time = time.getFullYear() + "年" + (month) + "月" + date + '日' + '  ' + hours + ':' + minutes;
      res.send(JSON.stringify({ code: 0, msg: '查询结果', info: data }));
    })
  } else if (op === 'deteleBill') {
    const id = req.query.id ? req.query.id : "";
    if (id == '' || id == null) {
      res.send(JSON.stringify({ code: 10001, msg: "账单信息错误" }));
    }
    const sql = `delete from  jz_bill where id=${+id}`;
    db.query(sql, (err, data) => {
      if (err) {
        res.send(JSON.stringify({ code: 10003, msg: "账单信息错误" }));
      }
      res.send(JSON.stringify({ code: 0, msg: '删除成功' }));
    })
  }
});

//post请求
router.post("/", (req, res, next) => {
  console.log(req.body);
  const openid = req.body.openid,
    typeOf = req.body.typeOf,
    money = req.body.money,
    type = req.body.type,
    note = req.body.note,
    icon = req.body.icon;
  time = new Date().getTime();
  console.log(new Date().getTime());
  const sql = `insert into jz_bill (openid,type,money,typeOf,note,create_time,icon) 
    values('${openid}','${type}','${money}','${typeOf}','${note}','${time}','${icon}')`;
  db.query(sql, (err, data) => {
    if (err) {
      res.send(JSON.stringify({ code: 10001, msg: "服务器繁忙，请稍后重试" }));
    }
    res.send(JSON.stringify({ code: 0, msg: "添加成功" }));
  });
});
module.exports = router;
