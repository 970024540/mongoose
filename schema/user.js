var mongoose=require('mongoose');
var schema=mongoose.Schema;

var userSchema=new schema({
  userName: { type:String,index:true},            // 用户账号
  userWord : { type:String },  // 用户密码
  userAge : { type:String },   // 年龄
  loginDate : { type:Date },   // 上一次的登录时间
})

module.exports = mongoose.model('user',userSchema,'user'); // 第三个参数为重命名表名，不重命名会自动加上s
