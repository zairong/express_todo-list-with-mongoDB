const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  isDone: { 
    type: Boolean,              
    default: false  // 預設完成狀態為 false
  }
})
//Todo為model名
//mongoose會依據Todo.create()建立database的collection名稱 Todo=>todos
module.exports = mongoose.model('Todo', todoSchema)