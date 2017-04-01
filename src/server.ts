import * as http from 'http';
import * as express from 'express';
import * as WebSocket from 'ws';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as ejwt from 'express-jwt';

import { JWT_SECRET } from './constants';
import * as authApi from './api/auth';
import * as usersApi from './api/users';
import * as conversationsApi from './api/conversations';


let app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server: server, path: "/chat" });

let ejwtHelper = ejwt({ secret: JWT_SECRET });

wss.on('connection', function connection(ws) {
  //const location = url.parse(ws.upgradeReq.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
  console.log("Conectadoooooooo");
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});


app.set('port', (process.env.PORT || 4499));
app.use(cors());

app.use(authApi.endPoint, authApi.router);
app.use(usersApi.endPoint, ejwtHelper, usersApi.router);
app.use(conversationsApi.endPoint, conversationsApi.router);

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
})

app.use((req, res) => {
  res.status(404).send();
})

server.listen(4499, function listening() {
  console.log('Listening on %d', server.address().port);
});