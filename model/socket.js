
var deleteFile = require('./delete').deleteFolderRecursive
var {Head} = require('../untils/config.js')


module.exports = function(io){
  var socketList ={};
  var member = 0;
  var users=[]

  

  //socket链接 即url链接到该服务器
  io.sockets.on('connection',function(socket){
    console.log("链接成功")
    // console.log(socket)

    //加入方法
    socket.on('join',(info)=>{
      console.log('加入')
      // console.log(socket)
      console.log()
      socket.name = info.name
      socketList[info.name]=socket.id
      if(Head.filename){
        socket.head=Head.filename
        console.log(socket.head)


      }
      member++

      //广播不能发送给发送者 所以要单独发送
      socket.emit('myself',users,socket.id,member)

      let user={name:info.name,head:info.head,selecthead:info.selecthead,id:socket.id,count:0}
      users.push(user)
      //广播
      socket.broadcast.emit('welcome',user.name,users,member);
      
    })

    //接收信息广播
    socket.on('message',data=>{

      //广播
      socket.broadcast.emit('sendMsg',data);
    })

    //一对一消息
    socket.on('sendOne',data=>{
      console.log(data)
      socket.to(data.tid).emit('receiveOne',data)
    })

    //一对一输入
    socket.on('inputing',data=>{
      console.log(data)
      socket.to(data.tid).emit('getInputing',data)
    })

    //用户离开
    socket.on('disconnecting',function(){
      if(socketList.hasOwnProperty(socket.name)){
        console.log('删除用户')
        //删除该用户
        const id=socketList[socket.name]

        for(var i=0;i<users.length;i++){
          // console.log(users)
          if(users[i].id == id){
            console.log('退出被删除的用户')
            console.log(users[i])
            users.splice(i,1)
          }
        }

        delete socketList[socket.name]
        if(socket.head){
          delete socketList[socket.head]
          deleteFile('public/upload/'+socket.head);
          Head.filename=''
        }
        
        
        member--;
        //广播用户退出
        console.log("退出")
        socket.broadcast.emit('exit',socket.name,users,member,id);
      }
    })
  })

}


