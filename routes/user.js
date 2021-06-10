const Router=require('koa-router');
let router=new Router();

var User = require("../schema/user.js");

router.post('/register',async(ctx)=>{
  let newUser = new User(ctx.request.body)
  let data=ctx.request.body||{};
  let text='';
  if(data.userName&&data.userWord){
    await newUser.save().then(()=>{
      ctx.body={
        code:200,
        message:'注册成功'
      }
    }).catch(error=>{
      ctx.body={
        code:500,
        message:error
      }
    })
  }else if(!data.userName){
    text='userName字段不能为空';
  }else if(!data.userWord){
    text='userWord字段不能为空';
  }
  if(text) ctx.body={
    code:400,
    message:text
  }
})

router.post('/userList',async (ctx)=>{ 
  // post 请求获取参数 => ctx.request.body 
  await User.find(ctx.request.body,(err,res)=>{
    if(err) {
      ctx.body={
        code:400,
        message:err
      }   
    }else{
      ctx.body={
        code:200,
        message:'查询成功',
        list:res
      }
    }
  })
})  
router.get('/userList',async (ctx)=>{ 
  // get 请求获取参数 => ctx.request.query
  await User.find(ctx.request.query,(err,res)=>{
    if(err) {
      ctx.body={
        code:400,
        message:err
      }   
    }else{
      ctx.body={
        code:200,
        message:'查询成功',
        list:res
      }
    }
  })
})  


module.exports =router