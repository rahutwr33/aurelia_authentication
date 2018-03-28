import {Cookies} from 'aurelia-plugins-cookies';

export class JwtService {
  
  getToken() {
    return Cookies.get('token'); 
    //localStorage.getItem('token')
  }
  
  saveToken(token) {
    Cookies.putObject('token', token,{ expires: 'Fri, 28 Mar 2018 12:00:01 GMT' });
    //localStorage.setItem('token', token);
  }
  
  destroyToken() {
    Cookies.removeAll();
    //localStorage.clear(); 
  }
  
  setHeaders() {
    var token = Cookies.get('token');
    
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*'
    };
    if(token){
      headersConfig['authorization']= token.substring(1, token.length-1);
    } 
    
      return headersConfig
    
  }
}
