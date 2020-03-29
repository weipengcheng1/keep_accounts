let path = require('path');
let Service = require('node-windows').Service;
 
// Create a new service object
let svc = new Service({
  name:'node windows server test', //名称
  description: 'The socket.io nodejs server test ',//描述
  script:  path.resolve('/app.js'),//node执行入口
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
});
 
// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});
svc.install();