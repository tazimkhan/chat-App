const io=require('socket.io')(3000) 

io.on('connection', socket => {
    console.log('new connection made.');
    console.log('yes')


    socket.on('join', function(data){
      socket.join(data.room);
      console.log(data.user + ' joined the room : ' + data.room);
      socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'has joined this room.'});
    });
    
    socket.on('leave', function(data){
        //leaving the room
        socket.join(data.room);  
        console.log(data.user + ' left the room : ' + data.room);  
        socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'}); 
        socket.leave(data.room);
      });

      socket.on('message',data=>{
          io.in(data.room).emit('new message',{user:data.user,message:data.message})
      })
})