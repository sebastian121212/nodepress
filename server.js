"use strict";

var Gnd = require('gnd')
  , express = require('express')
  , http = require('http')
  , app = express()
  , server = http.createServer(app)
  , config = require('./config')
  , cabinet = require('cabinet')
  , sio = require('socket.io').listen(server)
  , redis = require('redis')
  , mongoose = require('mongoose')
  , path = require('path')
  , Posts = require('./models/posts')
  
server.listen(config.APP_PORT);
console.log("Started server at port: %d in %s mode", server.address().port, config.MODE);

app.configure(function() {
  app.use(express.static(__dirname+'/lib'));
  app.use(cabinet(path.join(__dirname, 'app'), {
    ignore: ['.git', 'node_modules', '*~'],
    files: {
      '/lib/gnd.js': Gnd.debug,
    }
  }));
})

mongoose.connect(config.MONGODB_URI);

var models = {
  'posts':Posts
}
var mongooseStorage = new Gnd.MongooseStorage(models, mongoose, true)
  , pubClient = redis.createClient(config.REDIS_PORT, config.REDIS_ADDR)
  , subClient = redis.createClient(config.REDIS_PORT, config.REDIS_ADDR)
  , syncHub = new Gnd.Sync.Hub(pubClient, subClient, sio.sockets)
  , sessionManager =  new Gnd.SessionManager()
  , gndServer = new Gnd.Server(mongooseStorage, sessionManager, syncHub);
                               
var socketServer = new Gnd.SocketBackend(sio.sockets, gndServer);