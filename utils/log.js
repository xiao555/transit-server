import log4js from 'log4js'
import path from 'path'
const env = process.env.NODE_ENV
if(env == 'production') {
  log4js.configure({
    appenders: [
      { type: 'console' }, //控制台输出
      {
        type: 'file', //文件输出
        filename: 'log/cheese.log', 
        maxLogSize: 1024,
        backups:3,
        category: 'normal' 
      }
    ]
  });
}

export default log4js.getLogger('TRANSIT')
