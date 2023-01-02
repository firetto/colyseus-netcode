// Colyseus + Express
import { Server } from "colyseus";
import { createServer } from "http";
import express from "express";
const port = Number(process.env.port) || 3000;
import * as path from "path";

import { GameRoom } from "./room";

const app = express();
app.use(express.json());

const gameServer = new Server({
  server: createServer(app)
});

gameServer
    .define("battle", GameRoom);


// THIS IS WHERE THE DELAY IS
let delay = 200;

gameServer.simulateLatency(delay);


app.set('port', 8000);
app.use('/static', express.static(__dirname + '/../static')); // should be /../../static in production
app.use(express.static('public'));

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, '/../index.html'));
});


gameServer.listen(port);