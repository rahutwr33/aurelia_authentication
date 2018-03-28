import { SharedState } from './shared/sharedstate/sharedstate';
import {NavigationInstruction, Next, PipelineStep, Redirect, Router, RouterConfiguration, RouteConfig, NavModel} from 'aurelia-router';
import {autoinject, PLATFORM,bindable, observable} from 'aurelia-framework';
import {UserService} from './shared/services/userservice';
import { settings } from 'cluster';
@autoinject(UserService)
export class App {
  bindable;
  router: Router;
 
  constructor(private userservice:UserService,private sharedstate:SharedState) {
   
  }
  
  attached() {
    this.userservice.checklogin().then(data=>{   
      if (data) {
        this.sharedstate.isAuthenticated = true;
        this.router.navigateToRoute('dashboard')
      }else{
        this.router.navigateToRoute('login')
      }       
    })  
   
  }

  logout(){
   this.userservice.purgeAuth();
   this.router.navigateToRoute('login');
   this.sharedstate.isAuthenticated = false;
  }


  configureRouter(config: RouterConfiguration, router: Router):void {
    config.title = 'Aurelia';
    //config.addAuthorizeStep(AuthorizeStep);
    config.options.pushState = true;
    config.map([
      { route: ['','home'],moduleId: PLATFORM.moduleName('component/home/home'), nav: true, name: 'home' ,title: 'home' },
      { route: 'login',moduleId: PLATFORM.moduleName('component/login/login'), nav: true,  name: 'login', title: 'login' },
      { route: 'register',moduleId: PLATFORM.moduleName('component/register/register'), nav: true, name: 'register' ,title: 'register'},
      { route: 'dashboard',moduleId: PLATFORM.moduleName('component/dashboard/dashboard'), nav: true, name: 'dashboard' ,title: 'dashboard'},
      { route: 'profile',moduleId: PLATFORM.moduleName('component/profile/profile'), nav: true, name: 'profile' ,title: 'profile'} 

    ]);
   
    this.router = router;
   
  }
  

  
}


// @autoinject(UserService)
// class AuthorizeStep implements PipelineStep {
//   constructor(private userservice:UserService,private router:Router){}
//   run(navigationInstruction, next) {
   
//     let currentRoute = navigationInstruction.config;
    
//     let loginRequired = currentRoute.settings && currentRoute.settings.auth === true;
  
//     //  this.userservice.checklogin().then(data=>{
     
//   //     if (!data) {
//   //       this.router.navigate('login')
//   //     }
       
//   //   })   
    
//     return next();
//   }
// }
