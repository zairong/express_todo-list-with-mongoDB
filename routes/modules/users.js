const express = require('express')
const router = express.Router()

//登入頁面路由
router.get('/login', (req, res) => {
  res.render('login')
})
//傳送登入資料路由
router.post('/login', (req, res) => {
})
//註冊頁面路由
router.get('/register', (req, res) => {
  res.render('register')
})
module.exports = router