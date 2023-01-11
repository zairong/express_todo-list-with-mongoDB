const express = require('express')
const router = express.Router()
// 引用 User model
const User = require('../../models/user')
// 引用 passport
const passport = require('passport')
const bcrypt = require('bcryptjs')  // 載入套件

//登入頁面路由
router.get('/login', (req, res) => {
  res.render('login')
})
//傳送登入資料路由,加入 middleware，驗證 request 登入狀態
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

//註冊頁面路由
router.get('/register', (req, res) => {
  res.render('register')
})
//傳送註冊資料的路由
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt
    .genSalt(10) // 產生「鹽」，並設定複雜度係數為 10
    .then(salt => bcrypt.hash(password, salt)) // 為使用者密碼「加鹽」，產生雜湊值
    .then(hash => User.create({
      name,
      email,
      password: hash // 用雜湊值取代原本的使用者密碼
    }))
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
  })

})
//登出路由
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router