const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const firebase = require('firebase');

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

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const io = require('socket.io')(server);
// create message log object for all rooms
var messages = {
    1: [],
    2: [],
    3: []
};
//create user list object for all rooms
var users = {
    1: [],
    2: [],
    3: []
}
// empty players object for all rooms, used for when users 'join game' as players, contains:
// their socket.id, username, 5 cards, their HP, and their confirmed selected card
var players = {
    1: [],
    2: [],
    3: []
};
//copy of players but with all cards info scrubbed
var publicPlayers = {
    1: [],
    2: [],
    3: []
}
//pushes players when they are ready for next rounds, in order to make the rounds consistent on both players sides.
var playersReady = {
    1: [],
    2: [],
    3: []
}
//the rounds for each room
var rounds = {
    1: null,
    2: null,
    3: null,
};
// the winners for each room
var winners = {
    1: null,
    2: null,
    3: null,
};
//firebase set-up, updating users/players when entering/leaving room
const config = {
      apiKey: "AIzaSyBeWljzW5mON5qnOPJ5_BEnuj79_kSG4mA",
      authDomain: "grandmaster-71126.firebaseapp.com",
      databaseURL: "https://grandmaster-71126.firebaseio.com",
      projectId: "grandmaster-71126",
      storageBucket: "",
      messagingSenderId: "760258177615"
    };
//some more firebase things...
firebase.initializeApp(config);

const rootRef = firebase.database().ref();
const lobbyRef = rootRef.child('lobby');
//socket connection activity
io.on('connection', (socket) => {
    console.log(`${socket.id} connected`);
    //socket join room receive data from front end
    socket.on('join room', (data) => {
        socket.join(data.room);
        console.log(`${data.username} joined room ${data.room}`);
        let notification = {message: {message: `${data.username} joined the room! :`}};
        //socket emits publicPlayers
        socket.emit('load players', publicPlayers[data.room]);

        users[data.room].push({
            socketId: socket.id,
            username: data.username, 
            displayName: data.displayName, 
        })

        console.log(users[data.room]);

        io.sockets.in(data.room).emit('load users', users[data.room]);
        socket.broadcast.to(data.room).emit('receive message', notification);
        messages[data.room].push(notification.message);
        socket.emit('load messages', messages[data.room]);
        if(players[data.room].length === 2){
            socket.emit('players full')
        }
        lobbyRef.child('users').child(data.room).set(users[data.room].length);
    });

    // sends out incoming message, adds message to message log for room, 
    // removes earliest message(s) if log goes over 100 messages
    socket.on('message', (data) => {
        console.log(data.message, data.room);
        io.sockets.in(data.room).emit('receive message', data);
        messages[data.room].push(data.message);
        while (messages[data.room].length > 100) {
            messages[data.room].pop()
        };
    })

    //socket detects the join game activity
    socket.on('join game', (data) => {
        console.log(`${data.username} has joined the game!`)
        // creates set of blank cards to send out to users
        // client side will disregard if they are one of the players
        let publicCards = [];
        for (let i = 0; i < 5; i++) {
            publicCards.push({
                id: null,
                card_id: null,
                name: null,
                class: null,
                attack: null,
                defense: null,
                image_url: '/images/back_card.png'
            });
        };
        if(players[data.room].length < 2) {
            players[data.room].push({
                socketId: socket.id,
                username: data.username,
                userCards: data.userCards,
                userHp: 20,
                userSelection: null,
            });
            publicPlayers[data.room].push({
                socketId: socket.id,
                username: data.username,
                userCards: publicCards,
                userHp: 20,
                userSelection: false,
            });
            lobbyRef.child('players').child(data.room).set(players[data.room].length);
        }
        if(players[data.room].length === 2){
            rounds[data.room] = 1;
            io.sockets.in(data.room).emit('players full', rounds[data.room]);
        }
        // updates everyone in the room as to who is playing and how many cards they have
        io.sockets.in(data.room).emit('load players', publicPlayers[data.room]);

        // lets room know in chatbox who joined the game, adds to message log
        let notification = {message: {message: `${data.username} ready for battle! :`}};
        io.sockets.in(data.room).emit('receive message', notification);
        messages[data.room].push(notification.message);
    });
    //confirm selection fires the user's selection of cards, when the two players all confirmed, do the fighting function
    socket.on('confirm selection', data=>{
        players[data.room].forEach((player)=>{
            if(player.username === data.username){
                player.userSelection = data.selection;
            };
        });
        publicPlayers[data.room].forEach((player)=>{
            if(player.username === data.username){
                player.userSelection = {
                    id: null,
                    card_id: null,
                    name: null,
                    class: null,
                    attack: null,
                    defense: null,
                    image_url: '/images/back_card.png'
                };
                player.userCards.pop();
                io.sockets.in(data.room).emit('load cards', player);
            };
        });
        io.sockets.in(data.room).emit('load players', publicPlayers[data.room]);
        let cardsReadyCount = players[data.room].filter((player) => {
            return player.userSelection!==null;
        });
        if(cardsReadyCount.length === 2){
            if (!rounds[data.room]) {
                rounds[data.room] = 1;
            }
            fightFunction(data.room);
            // io.sockets.in(data.room).emit('fight', publicPlayers[data.room]);
            setTimeout(()=>players[data.room].forEach((player)=>{
                player.userSelection = null;
            }),1);
            setTimeout(()=>publicPlayers[data.room].forEach((player)=>{
                player.userSelection = null;
            }),1);
        };
    });
    
    //the fight function including the game logics, fighting calculation and user hp changes
    const fightFunction = (room) => {
        let playerOne = players[room][0];
        let playerTwo = players[room][1];
        let attackOne = playerOne.userSelection.attack;
        let attackTwo = playerTwo.userSelection.attack;
        let defenseOne = playerOne.userSelection.defense;
        let defenseTwo = playerTwo.userSelection.defense;
        let hpOne = playerOne.userHp;
        let hpTwo = playerTwo.userHp;
        if(playerOne.userSelection.class === 'King' && playerTwo.userSelection.class === 'Queen'){
            hpTwo = hpTwo - 10;
        } else if(playerTwo.userSelection.class === 'King' && playerOne.userSelection.class === 'Queen'){
            hpOne = hpOne - 10;
        } else if(defenseOne < attackTwo
           && attackOne > defenseTwo){
               hpOne = hpOne - (attackTwo - defenseOne);
               hpTwo = hpTwo - (attackOne - defenseTwo);
        } else if(defenseOne < attackTwo
                 && attackOne <= defenseTwo) {
               hpOne = hpOne - (attackTwo - defenseOne);
        } else if(defenseOne >= attackTwo
                 && attackOne > defenseTwo) {
               hpTwo = hpTwo - (attackOne - defenseTwo);
        }
        playerOne.userHp = hpOne;
        playerTwo.userHp = hpTwo;
        publicPlayers[room][0].userHp = hpOne;
        publicPlayers[room][1].userHp = hpTwo;
        publicPlayers[room][0].userSelection = playerOne.userSelection;
        publicPlayers[room][1].userSelection = playerTwo.userSelection;
        if((playerOne.userHp === 0 && playerTwo.userHp === 0) || 
           (rounds[room] === 5 && playerOne.userHp === playerTwo.userHp)) {
            winners[room] = 'Stalemate! Nobody'
            io.sockets.in(room).emit('game over', {playerData: publicPlayers[room], winner: winners[room], round: rounds[room]});
        } else if ((playerOne.userHp === 0) ||
                   (rounds[room] === 5 && playerTwo.userHp > playerOne.userHp)) {
            winners[room] = playerTwo.username;
            io.sockets.in(room).emit('game over', {playerData: publicPlayers[room], winner: winners[room], round: rounds[room]});
        } else if ((playerTwo.userHp === 0) ||
                   (rounds[room] === 5 && playerOne.userHp > playerTwo.userHp)) {
            winners[room] = playerOne.username;
            io.sockets.in(room).emit('game over', {playerData: publicPlayers[room], winner: winners[room], round: rounds[room]});
        } else {
            rounds[room]++;
            io.sockets.in(room).emit('round over', {playerData: publicPlayers[room], round: rounds[room]});
        };
    };

    //changes rounds to make the rounds consistent on both user sides
    socket.on('next round', (data) => {
        playersReady[data.room].push(data.username);
        if (playersReady[data.room].length === 2) {
            io.sockets.in(data.room).emit('next round');
            playersReady[data.room] = [];
        };
    });

    socket.on('no rematch', (data) => {
        console.log(data.username + ' is bowing out!');
        let notification = {message: {message: `${data.username} is bowing out!`}};
        players[data.room] = [];
        publicPlayers[data.room] = [];
        rounds[data.room] = null;
        io.sockets.in(data.room).emit('end game');
        io.sockets.in(data.room).emit('load players', publicPlayers[data.room]);
        io.sockets.in(data.room).emit('receive message', notification);
        messages[data.room].push(notification.message);
        // update firebase with player count (hint: it's should be zero)
        lobbyRef.child('players').child(data.room).set(players[data.room].length);
    })

    socket.on('rematch', (data) => {
        console.log(data.username + ' wants a rematch!');
        playersReady[data.room].push(data.username);
        players[data.room].forEach((player) => {
            if (player.username === data.username) {
                player.userCards = data.userCards
                player.userHp = 20;
                player.userSelection = null;
            };
        });
        publicPlayers[data.room].forEach((player) => {
            if (player.username === data.username) {
                let publicCards = [];
                for (let i = 0; i < 5; i++) {
                    publicCards.push({
                        id: null,
                        card_id: null,
                        name: null,
                        class: null,
                        attack: null,
                        defense: null,
                        image_url: '/images/back_card.png'
                    });
                };
                player.userCards = publicCards;
                player.userHp = 20;
                player.userSelection = false;
            };
        });
        if (playersReady[data.room].length === 2) {
            console.log(`resetting game for ${playersReady[data.room][0]} and ${playersReady[data.room][1]}!`);
            let notification = {message: {message: `${playersReady[data.room][0]} and ${playersReady[data.room][1]} are game for a rematch!`}};
            rounds[data.room] = 1;
            io.sockets.in(data.room).emit('reset game', {round: rounds[data.room], winner: null});
            io.sockets.in(data.room).emit('load players', publicPlayers[data.room]);
            io.sockets.in(data.room).emit('receive message', notification);
            messages[data.room].push(notification.message);
            playersReady[data.room] = [];
        };
    });
    
    //reaction on leave room activity, changes the players list
    socket.on('leave room', (data) => {
        console.log(`${data.username} left room ${data.room}`);
        socket.leave(data.room);

        let notification = {message: {message: `${data.username} left the room! :`}};

        players[data.room] = players[data.room].filter((player) => {
            if (player.username === data.username) {
                rounds[data.room] = null;
            };
            return player.username !== data.username;
        });
        publicPlayers[data.room] = publicPlayers[data.room].filter((player) => {
            return player.username !== data.username;
        });
        users[data.room] = users[data.room].filter((user) => {
            return user.username !== data.username;
        });

        console.log(publicPlayers[data.room]);

        socket.broadcast.to(data.room).emit('load players', publicPlayers[data.room]);
        socket.broadcast.to(data.room).emit('load users', users[data.room]);
        socket.broadcast.to(data.room).emit('receive message', notification);
        messages[data.room].push(notification.message);
        
        lobbyRef.child('users').child(data.room).set(users[data.room].length);
        lobbyRef.child('players').child(data.room).set(players[data.room].length);
    });
    //disconnect activity detects when players close the window instead of exit game room
    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);

        let disconnectedUserRoom;
        let disconnectedUsername;
        
        for (let room in players) {
            players[room] = players[room].filter((player) => {
                if (player.socketId === socket.id) {
                    rounds[room] = null;
                };
                return player.socketId !== socket.id;
            });
        }
        for (let room in publicPlayers) {
            publicPlayers[room] = publicPlayers[room].filter((player) => {
                return player.socketId !== socket.id;
            });
        }
        for (let room in users) {
            users[room] = users[room].filter((user) => {
                if (user.socketId === socket.id) {
                    disconnectedUsername = user.username;
                    disconnectedUserRoom = room;
                    console.log(`removed ${disconnectedUsername} from room ${disconnectedUserRoom}`);
                }
                return user.socketId !== socket.id;
            });
        }
        if (disconnectedUsername) {
            let notification = {message: {message: `${disconnectedUsername} left the room! :`}};
            socket.broadcast.to(disconnectedUserRoom).emit('load players', publicPlayers[disconnectedUserRoom]);
            socket.broadcast.to(disconnectedUserRoom).emit('load users', users[disconnectedUserRoom]);
            socket.broadcast.to(disconnectedUserRoom).emit('receive message', notification);
            messages[disconnectedUserRoom].push(notification.message);
            lobbyRef.child('users').child(disconnectedUserRoom).set(users[disconnectedUserRoom].length);
            lobbyRef.child('players').child(disconnectedUserRoom).set(players[disconnectedUserRoom].length);
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
app.use('/usercard', usercardRoutes);

app.use('*',(req,res) => {
    res.status(400).json({
        message:'Not found!',
    });
})
