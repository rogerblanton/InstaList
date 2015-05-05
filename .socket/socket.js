var
  config = {
    rethinkdb: {
      host: "172.17.0.16",
      port: 28015,
      authKey: "",
      db: "InstaList"
    },
    socket:{
      host:"52.24.106.53",
      port:8181
    }
  },
  io = require( "socket.io" ).listen( config.socket.port ),
  rdb = require( "rethinkdb" );

io.set( 'origins', '*:*' );

io.sockets.on( "connection", function ( socket )  {
  console.log( "Socket connection made with, the IP: ", socket.client.conn.remoteAddress );

  //handle incomming data / request
  socket.on( "transact", function ( data ) {
    rdb.connect( config.rethinkdb, function( er, conn ){
      if( er ) {
        console.log( "[ Error ]: with the connection" );
        console.log( er );
      }else{
        //use 'data' to figure out what table you're getting or... w/e
        rdb.table( "postings" ).without("postingAccountId").run( conn, function ( err, cursor ) {
          if ( err ){
            console.log( "[ Error ]: with the rdb table fetch" );
            console.log( err );
          }else{
            console.log( cursor );
            socket.emit( "postings", JSON.stringify( cursor.toArray() ) );
          }
          conn.close();
        });
      }
    });
  });

  /*

  var Model = {
    model:'loggedInUser', //data in raw, this is model name
    raw:{
      name:'Eric',
      profileImagePath:'/assets/images/profileImage.jpg',
    },
    action:null,
    communicationType:"[requested|update]"
  };

  var emit = function () {
    socket.emit('currentModel', {
      status:{
        code:null,
        msg:null,
      },
      data:Model,
      meta:{
        dataSource:"[redis|postgres]",
        expected: null, //format or data
        dateOfPush: null
      },
      referrer:{
        type:null,
        url:null,
        format:null
      },
      messages:{
        from:null,
        type:null,
        content:null,
        destination:null,
      }
    });
  }
  emit();
  */
  socket.on( "getMessages", function (data) {
    //sort out `data` it should have the other user, not the logged in user
    rdb.connect(config.rethinkdb, function(err, conn) {
      if (err) {
        console.log( "Could not open a connection to initialize the database" );
        console.log( err.message );
        process.exit( 1 );
      }
      rdb.table( "messages" ).indexWait( "fbId" ).run( conn ).then( function(er, result) {
        if (err) {
          console.log( "something happened" );
          console.log( er );
          process.exit( 1 );
        }else{
          console.log( "Table `accounts` with index fbId is available, starting koa..." );
        }
      }).error(function (e) {
        console.log( e );
      });
    });
  });
  /*
  socket.on('patch', function (data){
    var key;
    console.log("---Data---");
    console.log(data);
    if(Model.model == data.action.route){
      key = Object.keys(data.component)[0];
      Model.raw[key] = data.component[key];
    }
    console.log("---Model---");
    console.log(Model);
  });

  socket.on('refresh', function () {
    console.log("refresh");
    emit();
  });
  */
});

console.log( "Socket listening on " + config.socket.port );
