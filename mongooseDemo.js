const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

const coll=mongoose.connection;


var User = require("./schema/user.js");


coll.on('open',function(){
  console.log('连接成功');
  add();
  // update();
  // del();
  // find();
  // count();
  getByPager();
})

coll.on('error',function(){
  console.log('连接异常')
})

coll.on('disconnected',function(){
  console.log('连接中断')
})

function add(){
  var initUser=new User({
    userName:'李ser',
    userWord:'mall123456',
    userAge:'25',
    loginDate:new Date()
  })
  initUser.save(function(err,res){
    if(err) console.log('Error:'+err)
    if(res){
      console.log('保存成功:'+res)
    }
  })
}

function update(){
  // var whereStr={'userName':'2233'}
  // User.update(whereStr,{userName:'4455'},function(err,res){
  //   if(err) console.log('Error:'+err)
  //   if(res){
  //     console.log('更新成功:'+JSON.stringify(res))
  //   }
  // })
  // 根据id,查找第一个并更新
  User.findByIdAndUpdate('5fe048ed8cc53707a0f10a6f',{'userAge':'27'},function(err,res){
    if(err) console.log('Error:'+err)
    if(res){
      console.log('更新成功:'+JSON.stringify(res))
    }
  })
}

function del(){
  var delKey={'userName':'4455'}
  User.remove(delKey,function(err,res){
    if(err) console.log('Error:'+err)
    if(res){
      console.log('删除成功:'+JSON.stringify(res))
    }
  })
}

function find(){
  var wherestr = {'userName' : 'admin'};

  var opt = {"userName": 1 ,'userWord':1, "_id": 0}; // 要返回的字段 1:输出  0：不输出

  User.find(wherestr,opt, function(err, res){
      if (err) console.log("Error:" + err);
      if(res) console.log("Res:" + res);
  })
}

// 查询数量
function count(){
  User.countDocuments({userName:'admin'},function(err,res){
    if(err) console.log('Error:'+err)
    if(res){
      console.log('数量:'+JSON.stringify(res))
    }
  })
}

// 分页查询
function getByPager(){

  var pageSize=5;                          // 一页多少条
  var currentPage=1;                       // 当前第几页
  var sort={'loginDate':-1};               // 排序（按登录时间倒序）
  var skipnum=(currentPage-1)*pageSize;    // 跳过的数
  var findKey={};                          // 查询条件
  
  User.find(findKey).skip(skipnum).limit(pageSize).sort(sort).exec(function(err,res){
    if(err) console.log('Error:'+err)
    if(res){
      console.log('res:'+JSON.stringify(res))
    }
  })
}

module.exports=mongoose;