export class IL {
  constructor(state) {
    this.state = state && this.isState(state)? state : this.updateState();
  }
  isState(state){
    //take check this.state for integrity
  }
  updateState() {
    //Go Get main Model and build.
    return {};
  }
  patch(component = "main") {
    var keys = Object.keys(component.observe), model = component.model_, key, x;
    for(x=0;x<keys.length;x++){
      key = keys[x];
      if(!this.state[model]){this.state[model] = {};}
      component[key] = this.state[model][key];
      this.state[model].watch(key, function (id, oldVal, newVal) {
        if(component[id] != newVal){
          component[id] = newVal;
        }
        return newVal;
      });
    }
  }
}
