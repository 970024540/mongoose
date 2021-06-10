const Koa = require('koa');
const bodyparse = require('koa-body');  // 支持识别form-data类型
const path = require('path');
const util = require('util');
const fs = require('fs');
const Router = require('koa-router');
const cors = require('koa2-cors')
const { connect } = require('./initMongo.js')

const app = new Koa();

app.use(bodyparse({
  multipart: true, // 支持文件上传
  formidable: {
    uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
    keepExtensions: true, // 保持文件的后缀
    maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小，缺省2M
    onFileBegin: (name, file) => { // 文件上传前的设置
      const fp = path.join(__dirname, '/public');
      if (!fs.existsSync(fp)) { // 检查是否有“public/upload/”文件夹
        fs.mkdirSync(fp)        // 没有就创建
        fs.mkdirSync('public/upload/'); 
      }
      console.log(`上传key:${name}; 文件信息:${util.inspect(file)}`);
    }
  }
}));
app.use(cors())

let router = new Router;
// 装载所有子路由
const user = require('./routes/user.js');
router.use('/user', user.routes());
const file = require('./routes/file.js');
router.use('/file', file.routes());

app.use(router.routes());
app.use(router.allowedMethods());

(async () => {
  await connect();
})();

app.use(async (ctx) => {
  ctx.body = '<h1>Hello Koa2</h1>'
})

var port = 3333;

app.listen(port, function () {
  console.log(`监听${port}端口中。。。`)
})