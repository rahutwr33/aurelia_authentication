import { SharedState } from './../../shared/sharedstate/sharedstate';
import { JwtService } from './../../shared/services/jwtservice';
import { autoinject, bindable } from 'aurelia-framework';
import { Router, activationStrategy, Redirect } from 'aurelia-router';

@autoinject(SharedState)
export class Home{
  subscription
  constructor(
    private jwtservice:JwtService,
    private sharedstate:SharedState,
    private router:Router
  ){
    
  }
  
  attached() {
 
    if(this.jwtservice.getToken()){
      this.sharedstate.isAuthenticated = true;
      this.router.history.navigate('/#/dashboard')
    }else{
      this.sharedstate.isAuthenticated = false;

    } 
  }
 
}
