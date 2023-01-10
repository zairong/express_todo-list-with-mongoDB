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
  },
  //這組設定代表「去參照 User 的 ObjectId」
  userId: { 
    //定義 userId 這個項目是一個 ObjectId，也就是它會連向另一個資料物件
    type: Schema.Types.ObjectId,
    ref: 'User',//定義參考對象是 User model
    index: true,//把 userId 設定成「索引」,，使用索引來查詢資料能夠增加讀取效能
    required: true
  }
})
//Todo為model名
//mongoose會依據Todo.create()建立database的collection名稱 Todo=>todos
module.exports = mongoose.model('Todo', todoSchema)