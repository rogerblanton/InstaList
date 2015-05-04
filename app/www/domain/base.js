// start loader, manage socket
// get initial data
// populate data
// remove loader
try{
  System.baseURL = "domain/";
  System.import( "il.main" ).then( function ( module ) {
    System.app = new module.IL();
    System.import( "il.socket" ).then( function ( module ) {
      Socket = new module.Socket();
    }).catch( console.error.bind( console ) );
  }).catch( console.error.bind( console ) );
} catch ( e ) {
  alert( "Error[base.js]:" + e.message );
}
