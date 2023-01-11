// 載入 express 並建構應用程式伺服器
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const app = express()
const routes = require('./routes')
const bodyParser = require('body-parser')
const methodOverride = require('method-override') 
// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
const flash = require('connect-flash')   // 引用套件
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose')

//設定樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
//存cookie
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

//驗證使用者登入狀態
usePassport(app)
app.use(flash())  // 掛載套件
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})

// 將 request 導入路由器
app.use(routes)


// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})

