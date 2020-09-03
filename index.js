// const express = require('express');
// const app = express();
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { port } = require('./config');
const Sequelize = require('./utill/database');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
  }
app.use('/auth',cors(corsOptions),authRoute);
app.use('/allUsers',cors(corsOptions),userRoute);

app.use(cors());

app.get('/',(req,res,next) => {
    res.send("hello world");
});

Sequelize.sync().then(
    (data) => {
        console.log(data);
    }
).catch(
    (error) => {
        console.log(error);
    }
)

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('add new user',(data) => {
    console.log(data);
    socket.join(data.id);
  });
  socket.on('my message',(data) => {
    console.log(data);
    socket.broadcast.to(data.recid).emit('new-message',data.message);
  })
});  
http.listen(port,() => {
    console.log(`server started on port number ${port}`)
});
