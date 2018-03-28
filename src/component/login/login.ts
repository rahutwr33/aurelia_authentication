import { SharedState } from './../../shared/sharedstate/sharedstate';
import { JwtService } from './../../shared/services/jwtservice';
import {autoinject} from 'aurelia-framework';
import {HttpClient,json} from 'aurelia-fetch-client';
import { Router,activationStrategy } from 'aurelia-router';
import {ValidationControllerFactory, ValidationRules} from 'aurelia-validation';
import global from '../../shared/global'
import {UserService} from '../../shared/services/userservice';
import {EventAggregator} from 'aurelia-event-aggregator';

@autoinject(ValidationControllerFactory)
export class Login{
  email:string='';
  password:string='';
  confirm_password:string='';
  errors:string = null
  validatecontrollers
  type:string='login'
  constructor(
    private http: HttpClient,
    private router:Router,
    private controller:ValidationControllerFactory,
    private userservice:UserService,
    private jwtservce:JwtService,
    private sharedstate:SharedState
  ) {
    this.validatecontrollers = controller.createForCurrentScope();
    ValidationRules
    .ensure('email').required().email()
    .ensure('password').required().minLength(8)
    .on(this);
   }

    

   get canSave() {
    return this.email !== '' && this.password !== ''; 
  }
 
  login(){
    let user = {
      email:this.email,
      password:this.password
    };

    this.validatecontrollers.validate()
    .then(result => {  
       if (result.valid) {  
        this.userservice.login(user).then(data=>{
          if(data.success){
            this.sharedstate.isAuthenticated= true;
            this.router.navigateToRoute('dashboard')
          }else{
            this.router.navigateToRoute('login')
          }
         })
      }
   })
  }
  bind() {  
    if(this.sharedstate.isAuthenticated){
      this.router.navigateToRoute('dashboard')
    }
  }
}
