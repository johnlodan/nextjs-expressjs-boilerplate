
import app from '../app'
interface IServer {
  socket?: {
    emit?: (channel?: string, data?: any) => void
  },
  address?: () => void,
  listen?: (port: string) => void,
  on?: (type: any, cb: any) => void
}

var debug = require('debug')('api:server');
var http = require('http');
var https = require('https');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var port = normalizePort(process.env.APP_PORT || '8000');
var server: IServer;
app.set('port', port);



if (process?.env?.APP_ENV === 'production') {
  server = https.createServer({
    key: fs.readFileSync(process?.env?.SSL_KEY, 'utf8'),
    cert: fs.readFileSync(process?.env?.SSL_CERT, 'utf8')
  }, app).listen(port, function () {
    console.log("Express server listening on port " + port);
  })
} else {
  server = http.createServer(app)
  if (server.listen) {
    server.listen(port);
  }
}
console.log("Express server listening on port " + port);

if (server.on) {
  server.on('error', onError);
  server.on('listening', onListening);
}

const io = require("socket.io")(server, { cors: { origin: '*' } });
io.use(function (socket: any, next: any) {
  if (socket.handshake.query && socket.handshake.query.token) {
    jwt.verify(socket.handshake.query.token, process.env.APP_SECRET_KEY, function (err: any, decoded: any) {    //
      if (err) return next(new Error('JWT Authentication error'));
      socket.decoded = decoded;
      next();
    });
  } else next(new Error('JWT Authentication error'));
}).on('connection', function (_socket: any) { });

function normalizePort(val: any) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  if (!server.address) return
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr;
  // : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

