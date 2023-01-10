// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const Todo = require('../../models/todo')


//new路由
router.get('/new', (req, res) => {
  return res.render('new')
})
//new路由(送出資料)
router.post('/', (req, res) => {
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  const userId = req.user._id
  Todo.create({ name, userId })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})
//detail路由(渲染頁面)
router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Todo.findOne({ _id, userId })
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})
//edit路由(渲染頁面)
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Todo.findOne({ _id, userId })
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch(error => console.log(error))
})
//edit路由(送出資料)
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const { name, isDone } = req.body
  Todo.findOne({ _id, userId })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      todo.save()
    })
    .then(() => res.redirect(`/todos/${_id}`))
    .catch(error => console.log(error))
})
//delete路由(送出資料)
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Todo.findOne({ _id, userId })
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
