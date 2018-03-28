import { SharedState } from './../../shared/sharedstate/sharedstate';
import {autoinject} from 'aurelia-framework';
import {HttpClient,json} from 'aurelia-fetch-client';
import {ValidationControllerFactory, ValidationRules} from 'aurelia-validation';
import { Router,activationStrategy } from 'aurelia-router';
import {UserService} from '../../shared/services/userservice';
import {EventAggregator} from 'aurelia-event-aggregator';

@autoinject(ValidationControllerFactory)
export class Register{
  username:string='';
  email:string='';
  password:string='';
  confirm_password:string='';
  errors:string = null
  validatecontrollers
  type:string='register'
  constructor(
    private userservice:UserService,
    private http: HttpClient,
    private router:Router,
    private controller:ValidationControllerFactory,
    private sharedstate:SharedState
  ) { 
    this.validatecontrollers = controller.createForCurrentScope();
    ValidationRules
    .ensure('email').required().email()
    .ensure('password').required().minLength(8)
    .ensure('username').required()
    .on(this);
   }


  determineActivationStrategy() {
   
    return activationStrategy.replace;
  }
  
  activate(params, routeConfig) {
    this.type = routeConfig.name;
    
  }

  
   get canSave() {
      return this.username !== '' && this.email !== '' && this.password !== '' && this.password==this.confirm_password; 
    }
 
  register(){
    let newuser = {
      username:this.username,
      email:this.email,
      password:this.password
    };
    this.validatecontrollers.validate()
      .then(result => {
      
        if (result.valid) {
          this.userservice.register(newuser).then(data=>{
            if(data.success){
              this.router.navigateToRoute('login')
            }else{
              this.router.navigateToRoute('register')
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
