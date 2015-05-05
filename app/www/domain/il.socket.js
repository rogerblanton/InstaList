export class Socket {
  constructor(){
    this.connection = io( "http://52.24.106.53:8181" );
    //this.connection = io( "http://192.168.1.69:8181" );
    this.events();
  }
  refreshClient() {
    this.connection.emit('refresh');
  }
  updateServer(component, key, priority){
    var type = "PUT",
        state = System.app.state,
        update = {
          action: {route:model, priotity:priority},
          component:{},
          head:{http:type}
        };
    update.component[key] = component[key];

    System.app.state[component.model_][key] = component[key];
    if(this.connection){
      this.connection.emit('patch', update);
    }else{
      delete update.head;
      //this.socketFallBack({url:api.eardish.com/api, type:type, data:update})
    }
  }
  events() {
    var state = System.app.state;
    this.connection.emit('transact');

    this.connection.on( "postings", function ( data ) {
      var arr = JSON.parse( data ).fulfillmentValue,
          html = document.querySelector( ".browse .item" ).innerHTML;

      arr.forEach( function ( item, index ) {
        for( var prop in item ) {
          var regEx = new RegExp( "{{" + prop + "}}" );
          if( prop === "postingTags"){
            var arr = item[prop].split(",");
            item[prop] = "";
            for ( var tag in arr ) {
              item[prop] += "<span class='tag'>#" + arr[tag] + "</span>";
            }
          }
          html = html.replace( regEx, item[prop]);
        }
        return;
      });

      document.querySelector( ".browse .item" ).innerHTML = html;
      return;
    });
    this.connection.on('currentModel', function (data) {
      var model = data.data.model,
          raw = data.data.raw, x;
      for(x in raw){
        if(raw.hasOwnProperty(x)){
          if(!state[model]){state[model] = {};state[model][x]=null;}
          state[model][x] = raw[x];
        }
      }
    });
  }
}
