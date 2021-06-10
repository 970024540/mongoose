var mongoose=require('mongoose');
var schema=mongoose.Schema;

var fileSchema=new schema({
  size:{ type:Number },
  path:{ type:String },
  name:{ type:String },
  type:{ type:String },
  lastModifiedDate:{ type:String },
})

module.exports = mongoose.model('file',fileSchema,'file'); // 第三个参数为重命名表名，不重命名会自动加上s
