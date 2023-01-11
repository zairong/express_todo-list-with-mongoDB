// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引入 home 模組程式碼
const home = require('./modules/home')
// 引入 todos 模組程式碼
const todos = require('./modules/todos')
// 引入 users 模組程式碼
const users = require('./modules/users')
// 掛載 middleware
const { authenticator } = require('../middleware/auth')  
const auth = require('./modules/auth')   // 引用模組


// 將網址結構符合 /todos 字串開頭的 request 導向 todos 模組 
router.use('/todos', authenticator,todos)

// 將網址結構符合 /users 字串開頭的 request 導向 users 模組 
router.use('/users', users)
//fb路由
router.use('/auth', auth)  

// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/',authenticator,home) // 加入驗證程序

// 匯出路由器
module.exports = router