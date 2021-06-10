const mongoose=require('mongoose');
const db='mongodb://localhost:27017/test';


exports.connect = ()=>{
  mongoose.connect(db);
  const coll=mongoose.connection;
  let maxConnectTimes = 0;

  return new Promise((resolve,reject)=>{

    coll.on('open',function(){
      console.log('**********************数据库连接成功**********************');
      resolve();
    })
    
    coll.on('error',function(){
      console.log('**********************数据库连接错误**********************');
      if(maxConnectTimes==3){
        maxConnectTimes+=1;
        mongoose.connect(db);
      }else{
        reject();
        throw new Error('数据库出现问题，程序无法搞定，请联系管理员.')
      }
    })
    
    coll.on('disconnected',function(){
      console.log('**********************数据库连接中断**********************');
      if(maxConnectTimes==3){
        maxConnectTimes+=1;
        mongoose.connect(db);
      }else{
        reject();
        throw new Error('数据库出现问题，程序无法搞定，请联系管理员.')
      }
    })

  })
}


