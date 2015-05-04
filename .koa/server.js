var fs = require('fs'),
    koa = require('/usr/local/lib/node_modules/koa'),
    app = koa(),
    readFileThunk = function(src) {
      return new Promise(function (resolve, reject) {
        fs.readFile(src, {'encoding': 'utf8'}, function (err, data) {
          if(err) return reject(err);
          resolve(data);
        });
      });
    },

    stat = function (file){
      return function (done) {
        fs.stat(file, done);
      };
    },
    config = {
      koa:{
        port:8000
      }
    };

// logger
app.use( logger );
// response
app.use( router );

function* logger( next ){
  var start = new Date;
  console.log("---------------------------");
  console.log("Date - Time  %s - %s", start.getMonth()+"/"+start.getDay()+"/"+start.getYear(), start.getHours()+":"+start.getMinutes()+":"+start.getSeconds());
  console.log("IP %s", this.ip.split(/:/)[3]);
  console.log("%s %s - %s",  this.method, this.url,  new Date - start);

  yield next;

  console.log("--------------------------");
};

function* router( next ){
  var type;
  if ( /\.js/.test( this.path ) ) { this.type = "text/javascript"; }
  if ( /\.css/.test( this.path ) ) { this.type = "text/css"; }
  if ( /\.jpg/.test( this.path ) ) { this.type = "image/jpeg"; }
  if ( /\.png/.test( this.path ) ) { this.type = "image/png"; }
  if ( /\.html|\.htm/.test( this.path ) ) {
    this.type = "text/html";
    this.body = yield readFileThunk( __dirname + "/../app/build/www" + this.path );
  } else {
    this.body = fs.createReadStream( __dirname + "/../app/build/www" + this.path );
  }
  yield next;
};

//Kick off server
app.listen( config.koa.port );
console.log( "Server listening at port:" + config.koa.port );
