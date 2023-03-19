import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {


 public loginStatusSubject = new Subject<boolean>();


  constructor(private http:HttpClient ) { }
  //to make a request to server we required http client


  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }
  //generate token - call the backend and return token.
  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  //login user:set token in localstorage
  public loginUser(token:any){
    localStorage.setItem('token',token);

    return true;

  }
  // islogin: user is logged in or not
  public isloggedIn(){
    let tokenStr = localStorage.getItem("token")
    if(tokenStr==undefined || tokenStr==null || tokenStr==''){
      return false;
    }else{
      return true;
    }
  }
 
  //logout: remove token from localstorage
  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem('user');
    return true;
  }

  //get token 
  public getToken(){
    return localStorage.getItem('token');
  }
  //set user details in localstorage
  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  //get user
  public getUser(){
    let userStr=localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  //get user role
  public getUserRole(){
    let user=this.getUser();
    return user.authorities[0].authority;
  }
}
