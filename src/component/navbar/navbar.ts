import { SharedState } from './../../shared/sharedstate/sharedstate';
import {inject} from 'aurelia-dependency-injection';
import {bindable, bindingMode} from 'aurelia-framework';

@inject(SharedState)
export class Navbar {
  activeRoute = '';
  @bindable({defaultBindingMode: bindingMode.twoWay}) routerConfig;
  
  constructor(private sharedState:SharedState) {
    this.sharedState = sharedState;
    
  }
  
  
  routerConfigChanged(newValue, oldValue) {
    this.activeRoute = newValue.name;
  }

}
