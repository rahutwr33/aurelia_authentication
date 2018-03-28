import { SharedState } from './../../shared/sharedstate/sharedstate';
import { JwtService } from './../../shared/services/jwtservice';
import { autoinject, bindable } from 'aurelia-framework';

@autoinject(SharedState)
export class DashBoard{
 
constructor(private jwtservice:JwtService,private sharedstate:SharedState){
 
}
attached() {
 
  if(this.jwtservice.getToken()){
    this.sharedstate.isAuthenticated = true;
  }else{
    this.sharedstate.isAuthenticated = false;
  } 
}

}
