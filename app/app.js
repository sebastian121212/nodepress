define(['gnd'], function(Gnd){
  'use strict';

  //
  // Establish a socket.io connection.
  //
  var socket = io.connect();

  //
  // Configure the sync manager.
  //
  Gnd.use.syncManager(socket);

  //
  // Create Local and Remote storages
  //
  var localStorage = new Gnd.Storage.Local();
  var remoteStorage = new Gnd.Storage.Socket(socket);

  //
  // Configure the synchronization queue.
  //
  Gnd.use.storageQueue(localStorage, remoteStorage);

  //
  // Initialize models
  //
  var Post = Gnd.Model.extend('posts');

  // 
  // Listen to available routes. Only used for selecting filters
  //
  Gnd.Route.listen(function(req) {
    req.get(function() {
      //
      // Admin routes
      //
      req.get('admin',function(){
        req.render('views/admin/index.html',function(){
          req.redirect('/admin/home');
        });
        req.get('posts','.admin-content','controllers/admin/post');
        req.get('home','.admin-content',function(){
          req.render('views/admin/home.html',function(){

          });
        })
      });
    });
  });
});