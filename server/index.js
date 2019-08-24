const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const WebSocketServer = require('ws').Server;
const database = require('./database/database.js');
const cors = require('cors');
const Models = require('./models/Models.js');
const userRoute = require('./api/route/userRoute.js');
const roomRoute = require('./api/route/roomRoute.js');

// create server
var app = express();
app.server = http.createServer(app);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.wss = new WebSocketServer({
    server: app.server,
})
app.models = new Models(app);

// database
database.connect().then((db) => {
    console.log("connect database success!");
    app.db = db;
}).catch((err) => {
    throw(err);
})

// routes
userRoute.login(app);
userRoute.register(app);
userRoute.user(app);
userRoute.top(app);
userRoute.demo(app);
roomRoute.rooms(app);
roomRoute.allroom(app);

app.server.listen(process.env.PORT || 3001, () => {
    console.log(`App running on port: ${app.server.address().port}`);
});


module.exports = app;