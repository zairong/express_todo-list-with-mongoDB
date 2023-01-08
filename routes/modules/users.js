const express = require('express')
const router = express.Router()
// 引用 User model
const User = require('../../models/user')

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
//傳送註冊資料的路由
router.post('/register', (req, res) => {
  // 取得註冊表單參數
  const { name, email, password, confirmPassword } = req.body
  // 檢查使用者是否已經註冊
  User.findOne({ email }).then(user => {
    // 如果已經註冊：退回原本畫面
    if (user) {
      console.log('User already exists.')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      // 如果還沒註冊：寫入資料庫
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
  .catch(err => console.log(err))
})

module.exports = router