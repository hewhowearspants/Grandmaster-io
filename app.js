const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const app = express();
const server = require('http').createServer(app);
require('dotenv').config();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(
    session({
        key: process.env.SECRET_KEY,
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
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


app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'client','build','index.html'));
});

const io = require('socket.io')(server);

var messages = {
    1: [],
    2: [],
    3: []
};
var users = {
    1: [],
    2: [],
    3: []
}
var userSelected = {};
var userHP = {};
var userCards = {};
var players = {
    1: [],
    2: [],
    3: []
};
var round = {};



io.on('connection', (socket) => {
    console.log(`${socket.id} connected`);
    
    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
    });

    socket.on('join room', (data) => {
        socket.join(data.room);
        console.log(`${data.username} joined room ${data.room}`);
        socket.emit('load messages', messages[data.room]);
        const playerData = [...players[data.room]];
        playerData.forEach((player) => {
            player.userCards.forEach((usercard) => {
                usercard.id = null,
                usercard.card_id = null,
                usercard.name = null,
                usercard.class = null,
                usercard.attack = null,
                usercard.defense = null,
                usercard.image_url = '/images/back_card.png'
            })
        })
        socket.emit('load players', playerData);
        users[data.room].push({
            username: data.username, 
            displayName: data.displayName, 
        })
        io.sockets.in(data.room).emit('load users', users[data.room]);
        if(players[data.room].length === 2){
                socket.emit('players full')
        }
    });

    socket.on('join game', (data) => {
        console.log(`${data.username} has joined the game!`)
        console.log(users[data.room]);
        console.log(players[data.room]);
        if(players[data.room].length < 2) {
            players[data.room].push({
                username: data.username,
                userCards: data.userCards,
            })
            if(players[data.room].length === 2){
                io.sockets.in(data.room).emit('players full')
            }
        }
        const playerData = [...players[data.room]];
        playerData.forEach((player) => {
            player.userCards.forEach((usercard) => {
                usercard.id = null,
                usercard.card_id = null,
                usercard.name = null,
                usercard.class = null,
                usercard.attack = null,
                usercard.defense = null,
                usercard.image_url = '/images/back_card.png'
            })
        })
        io.sockets.in(data.room).emit('load players', players[data.room]);
        // console.log(data)
    })

    socket.on('message', (data) => {
        console.log(data.message, data.room);
        io.sockets.in(data.room).emit('receive message', data);
        messages[data.room].push(data.message);
        console.log(messages[data.room]);
        // console.log(data)
    })

    socket.on('leave room', (data) => {
        socket.leave(data.room);
        console.log(`${data.username} left room ${data.room}`);
        if(data.opponame){
            console.log(`${data.opponame} won the game`);
        }else{
            console.log('Game over')
        }
    });
});

const authRoutes = require('./routes/auth-routes');
app.use('/auth',authRoutes);
const userRoutes = require('./routes/user-routes');
app.use('/user',userRoutes);
const cardRoutes = require('./routes/card-routes');
app.use('/cards', cardRoutes);
const usercardRoutes = require('./routes/usercard-routes');
app.use('/usercard',usercardRoutes);

app.use('*',(req,res) => {
    res.status(400).json({
        message:'Not found!',
    });
})
