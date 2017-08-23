const express=require('express');
const logger=require('morgan');
const path=require('path');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const passport=require('passport');

const app=express();
const server = require('http').createServer(app);
require('dotenv').config();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(
    session({
        key:process.env.SECRET_KEY,
        secret:process.env.SECRET_KEY,
        resave:false,
        saveUninitialized:true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

const PORT=process.env.PORT||3001;
server.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`~Dream~Team~ up in here running on dat port ${PORT}! Sup~?`)
    }
});


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','build','index.html'));
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log(`${socket.id} connected`);
    
    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
    })
})

const authRoutes=require('./routes/auth-routes');
app.use('/auth',authRoutes);
const userRoutes=require('./routes/user-routes');
app.use('/user',userRoutes);
const cardRoutes=require('./routes/card-routes');
app.use('/cards', cardRoutes);
const usercardRoutes=require('./routes/usercard-routes');
app.use('/usercard',usercardRoutes);

app.use('*',(req,res)=>{
    res.status(400).json({
        message:'Not found!',
    });
})
