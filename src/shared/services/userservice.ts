import {autoinject} from 'aurelia-framework';
import {JwtService} from './jwtservice'
import {User} from '../model/usermodel';
import {HttpClient,json} from 'aurelia-fetch-client';
import { Router } from 'aurelia-router';
import global from '../global'
import {SharedState} from '../sharedstate/sharedstate'

@autoinject(JwtService)
export class UserService {
  client
  constructor(
    private http: HttpClient,
    private sharedstate:SharedState,
    private jwtservices:JwtService,
    private router:Router,
    ) {
    
  }
  
   populate(){     
    if (this.jwtservices.getToken()) { 
   
                 this.http
                  .fetch(global.base_url+'authentication/checklogin', {
                    method: 'GET',
                    headers:this.jwtservices.setHeaders()                 
                  })
                  .then(response => response.json())
                  .then(data => { 
                    let token = this.jwtservices.getToken();
                    data.user.token = token.substring(1, token.length-1);
                    this.setAuth(data.user)   
                  })
                  .catch(error => {
                    this.purgeAuth();
                    
                  });
              
    }else{
      this.purgeAuth();
    }
  }

  checklogin(){
   var status = this.http
              .fetch(global.base_url+'authentication/checklogin', {
                method: 'GET',
                headers:this.jwtservices.setHeaders()                 
              })
              .then(response => response.json())
              .then(data => { 
                if(data.success){
                  this.sharedstate.isAuthenticated = true;
                 // this.setAuth(data.user)
                  return true;
                }   
              })
              .catch(error => {
                return false; 
              }); 
            return status;
  }
  
  setAuth(data) {
    this.jwtservices.saveToken(data.token);
    this.sharedstate.currentUser = data.user;
    this.sharedstate.isAuthenticated = true;
  }
  
  purgeAuth() {
    this.jwtservices.destroyToken();
    this.sharedstate.currentUser = new User();
    this.sharedstate.isAuthenticated = false;
    
  }

  

  login(user){
 var logindata =  this.http
                  .fetch(global.base_url+'authentication/login', {
                    method: 'POST',
                    body: json(user)
                  })
                  .then(response => response.json())
                  .then(data => {
                  if(data.success){
                    
                     this.setAuth(data);

                   }
                   return data;
                  })
                  .catch(error => {
                    return error
                  });
  return logindata;
  }
  
  register(newuser) {
   
    var subscribe =   this.http
                    .fetch(global.base_url+'authentication/register', {
                      method: 'POST',
                      body: json(newuser)
                    })
                    .then(response => response.json())
                    .then(user => {                  
                      return  user;
                    })
                    .catch(error => {
                      return error;
                    });
      return subscribe;
    
  }
  
  // update(user) {
  //   return this.apiService.put('/user', { user })
  //     .then(data => {
  //       this.sharedState.currentUser = data.user;
  //       return data.user;
  //     });
    
  // }
}
