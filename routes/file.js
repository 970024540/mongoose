const Router = require('koa-router');
let router = new Router();
var File = require("../schema/file.js");


router.post('/upload', async (ctx) => {
  console.log(ctx.request.files);
  let body=ctx.request.body;
  let files=new File(ctx.request.files[body.name])
  await files.save().then((res)=>{
    ctx.body={
      code:200,
      data:res,
      message:'上传成功'
    }
  }).catch(error=>{
    ctx.body={
      code:500,
      message:error
    }
  })
})


module.exports = router