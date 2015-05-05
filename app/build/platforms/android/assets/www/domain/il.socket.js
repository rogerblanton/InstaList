System.register("il.socket", [], function($__export) {
  "use strict";
  var __moduleName = "il.socket";
  var Socket;
  return {
    setters: [],
    execute: function() {
      Socket = $__export("Socket", (function() {
        var Socket = function Socket() {
          this.connection = io('http://52.24.106.53:8181');
          this.connection.emit('transact');
          this.events();
        };
        return ($traceurRuntime.createClass)(Socket, {
          refreshClient: function() {
            this.connection.emit('refresh');
          },
          updateServer: function(component, key, priority) {
            var type = "PUT",
                state = System.app.state,
                update = {
                  action: {
                    route: model,
                    priotity: priority
                  },
                  component: {},
                  head: {http: type}
                };
            update.component[key] = component[key];
            System.app.state[component.model_][key] = component[key];
            if (this.connection) {
              this.connection.emit('patch', update);
            } else {
              delete update.head;
            }
          },
          events: function() {
            var state = System.app.state;
            this.connection.on( "postings", function ( data ) {
              console.log( "Postings", JSON.parse( data ).fulfillmentValue );
              var arr = JSON.parse( data ).fulfillmentValue,
                  template = document.querySelector( ".browse" ).innerHTML, html="";

              arr.forEach( function ( item, index ) {
                html += template;
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
              });
              document.querySelector( ".browse" ).innerHTML = html;

	          });
	          this.connection.on('currentModel', function(data) {
              var model = data.data.model,
                  raw = data.data.raw,
                  x;
              for (x in raw) {
                if (raw.hasOwnProperty(x)) {
                  if (!state[model]) {
                    state[model] = {};
                    state[model][x] = null;
                  }
                  state[model][x] = raw[x];
                }
              }
            });
          }
        }, {});
      }()));
    }
  };
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8zIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzIiLCJAdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIkB0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwiQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzQiLCJlZC5zb2NrZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsS0FBSyxTQUFTLEFBQUMsaUJBQXVDLFVBQVMsU0FBUTs7QUNBdkUsQUFBSSxJQUFBLENBQUEsWUFBVyxjQUFvQixDQUFDOztBQ0FwQyxPQUFPO0FBQ0QsVUFBTSxJQUFtQjtBQUN6QixVQUFNO2FDRlksQ0FBQSxTQUFRLEFBQUMsWUNBakMsU0FBUSxBQUFDO0FBQ0MsQUFBSSxVQUFBLFNDRFAsU0FBTSxPQUFLLENBQ0wsQUFBQyxDQUFDO0FBQ1gsYUFBRyxXQUFXLEVBQUksQ0FBQSxFQUFDLEFBQUMsQ0FBQyxpQkFBZ0IsQ0FBQyxDQUFDO0FBQ3ZDLGFBQUcsT0FBTyxBQUFDLEVBQUMsQ0FBQztRREZpQyxBQ0doRCxDREhpRDtBQUN6QyxhQUFPLENBQUEsQ0FBQyxlQUFjLFlBQVksQ0FBQyxBQUFDO0FDRzVDLHNCQUFZLENBQVosVUFBYSxBQUFDLENBQUU7QUFDZCxlQUFHLFdBQVcsS0FBSyxBQUFDLENBQUMsU0FBUSxDQUFDLENBQUM7VUFDakM7QUFDQSxxQkFBVyxDQUFYLFVBQWEsU0FBUSxDQUFHLENBQUEsR0FBRSxDQUFHLENBQUEsUUFBTyxDQUFFO0FBQ3BDLEFBQUksY0FBQSxDQUFBLElBQUcsRUFBSSxNQUFJO0FBQ1gsb0JBQUksRUFBSSxDQUFBLE1BQUssSUFBSSxNQUFNO0FBQ3ZCLHFCQUFLLEVBQUk7QUFDUCx1QkFBSyxDQUFHO0FBQUMsd0JBQUksQ0FBRSxNQUFJO0FBQUcsMkJBQU8sQ0FBRSxTQUFPO0FBQUEsa0JBQUM7QUFDdkMsMEJBQVEsQ0FBRSxHQUFDO0FBQ1gscUJBQUcsQ0FBRSxFQUFDLElBQUcsQ0FBRSxLQUFHLENBQUM7QUFBQSxnQkFDakIsQ0FBQztBQUNMLGlCQUFLLFVBQVUsQ0FBRSxHQUFFLENBQUMsRUFBSSxDQUFBLFNBQVEsQ0FBRSxHQUFFLENBQUMsQ0FBQztBQUV0QyxpQkFBSyxJQUFJLE1BQU0sQ0FBRSxTQUFRLE9BQU8sQ0FBQyxDQUFFLEdBQUUsQ0FBQyxFQUFJLENBQUEsU0FBUSxDQUFFLEdBQUUsQ0FBQyxDQUFDO0FBQ3hELGVBQUcsSUFBRyxXQUFXLENBQUU7QUFDakIsaUJBQUcsV0FBVyxLQUFLLEFBQUMsQ0FBQyxPQUFNLENBQUcsT0FBSyxDQUFDLENBQUM7WUFDdkMsS0FBSztBQUNILG1CQUFPLE9BQUssS0FBSyxDQUFDO1lBRXBCO0FBQUEsVUFDRjtBQUNBLGVBQUssQ0FBTCxVQUFNLEFBQUMsQ0FBRTtBQUNQLEFBQUksY0FBQSxDQUFBLEtBQUksRUFBSSxDQUFBLE1BQUssSUFBSSxNQUFNLENBQUM7QUFDNUIsZUFBRyxXQUFXLEdBQUcsQUFBQyxDQUFDLGNBQWEsQ0FBRyxVQUFVLElBQUcsQ0FBRztBQUNqRCxBQUFJLGdCQUFBLENBQUEsS0FBSSxFQUFJLENBQUEsSUFBRyxLQUFLLE1BQU07QUFDdEIsb0JBQUUsRUFBSSxDQUFBLElBQUcsS0FBSyxJQUFJO0FBQUcsa0JBQUEsQ0FBQztBQUMxQixrQkFBSSxDQUFBLEdBQUssSUFBRSxDQUFFO0FBQ1gsbUJBQUcsR0FBRSxlQUFlLEFBQUMsQ0FBQyxDQUFBLENBQUMsQ0FBRTtBQUN2QixxQkFBRyxDQUFDLEtBQUksQ0FBRSxLQUFJLENBQUMsQ0FBRTtBQUFDLHdCQUFJLENBQUUsS0FBSSxDQUFDLEVBQUksR0FBQyxDQUFDO0FBQUMsd0JBQUksQ0FBRSxLQUFJLENBQUMsQ0FBRSxDQUFBLENBQUMsRUFBRSxLQUFHLENBQUM7a0JBQUM7QUFBQSxBQUN6RCxzQkFBSSxDQUFFLEtBQUksQ0FBQyxDQUFFLENBQUEsQ0FBQyxFQUFJLENBQUEsR0FBRSxDQUFFLENBQUEsQ0FBQyxDQUFDO2dCQUMxQjtBQUFBLGNBQ0Y7QUFBQSxZQUNGLENBQUMsQ0FBQztVQUNKO0FBQUEsYURuQzhELENBQUM7TUFDekQsQUFBQyxFQUFDLEVESjREO0lERXZDO0VBQzNCLENBQUE7QUZESSxDQUFDLENBQUM7QUtzQ1YiLCJmaWxlIjoiZWQuc29ja2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiU3lzdGVtLnJlZ2lzdGVyKCRfX3BsYWNlaG9sZGVyX18wLCAkX19wbGFjZWhvbGRlcl9fMSwgZnVuY3Rpb24oJF9fZXhwb3J0KSB7XG4gICAgICAgICAgJF9fcGxhY2Vob2xkZXJfXzJcbiAgICAgICAgfSk7IiwidmFyIF9fbW9kdWxlTmFtZSA9ICRfX3BsYWNlaG9sZGVyX18wOyIsInJldHVybiB7XG4gICAgICBzZXR0ZXJzOiAkX19wbGFjZWhvbGRlcl9fMCxcbiAgICAgIGV4ZWN1dGU6ICRfX3BsYWNlaG9sZGVyX18xXG4gICAgfSIsInZhciAkX19wbGFjZWhvbGRlcl9fMCA9ICRfX2V4cG9ydCgkX19wbGFjZWhvbGRlcl9fMSwgJF9fcGxhY2Vob2xkZXJfXzIpOyIsImZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciAkX19wbGFjZWhvbGRlcl9fMCA9ICRfX3BsYWNlaG9sZGVyX18xO1xuICAgICAgICAgIHJldHVybiAoJHRyYWNldXJSdW50aW1lLmNyZWF0ZUNsYXNzKSgkX19wbGFjZWhvbGRlcl9fMiwgJF9fcGxhY2Vob2xkZXJfXzMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRfX3BsYWNlaG9sZGVyX180KTtcbiAgICAgICAgfSgpIiwiZXhwb3J0IGNsYXNzIFNvY2tldCB7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy5jb25uZWN0aW9uID0gaW8oJzU0LjY5LjYyLjEyODo4MScpO1xuICAgIHRoaXMuZXZlbnRzKCk7XG4gIH1cbiAgcmVmcmVzaENsaWVudCgpIHtcbiAgICB0aGlzLmNvbm5lY3Rpb24uZW1pdCgncmVmcmVzaCcpO1xuICB9XG4gIHVwZGF0ZVNlcnZlcihjb21wb25lbnQsIGtleSwgcHJpb3JpdHkpe1xuICAgIHZhciB0eXBlID0gXCJQVVRcIixcbiAgICAgICAgc3RhdGUgPSBTeXN0ZW0uYXBwLnN0YXRlLFxuICAgICAgICB1cGRhdGUgPSB7XG4gICAgICAgICAgYWN0aW9uOiB7cm91dGU6bW9kZWwsIHByaW90aXR5OnByaW9yaXR5fSxcbiAgICAgICAgICBjb21wb25lbnQ6e30sXG4gICAgICAgICAgaGVhZDp7aHR0cDp0eXBlfVxuICAgICAgICB9O1xuICAgIHVwZGF0ZS5jb21wb25lbnRba2V5XSA9IGNvbXBvbmVudFtrZXldO1xuXG4gICAgU3lzdGVtLmFwcC5zdGF0ZVtjb21wb25lbnQubW9kZWxfXVtrZXldID0gY29tcG9uZW50W2tleV07XG4gICAgaWYodGhpcy5jb25uZWN0aW9uKXtcbiAgICAgIHRoaXMuY29ubmVjdGlvbi5lbWl0KCdwYXRjaCcsIHVwZGF0ZSk7XG4gICAgfWVsc2V7XG4gICAgICBkZWxldGUgdXBkYXRlLmhlYWQ7XG4gICAgICAvL3RoaXMuc29ja2V0RmFsbEJhY2soe3VybDphcGkuZWFyZGlzaC5jb20vYXBpLCB0eXBlOnR5cGUsIGRhdGE6dXBkYXRlfSlcbiAgICB9XG4gIH1cbiAgZXZlbnRzKCkge1xuICAgIHZhciBzdGF0ZSA9IFN5c3RlbS5hcHAuc3RhdGU7XG4gICAgdGhpcy5jb25uZWN0aW9uLm9uKCdjdXJyZW50TW9kZWwnLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgdmFyIG1vZGVsID0gZGF0YS5kYXRhLm1vZGVsLFxuICAgICAgICAgIHJhdyA9IGRhdGEuZGF0YS5yYXcsIHg7XG4gICAgICBmb3IoeCBpbiByYXcpe1xuICAgICAgICBpZihyYXcuaGFzT3duUHJvcGVydHkoeCkpe1xuICAgICAgICAgIGlmKCFzdGF0ZVttb2RlbF0pe3N0YXRlW21vZGVsXSA9IHt9O3N0YXRlW21vZGVsXVt4XT1udWxsO31cbiAgICAgICAgICBzdGF0ZVttb2RlbF1beF0gPSByYXdbeF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
