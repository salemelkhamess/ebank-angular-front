import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment.development';
import {jwtDecode} from 'jwt-decode';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isAuthenticated : boolean =false
  roles: any
  username : any
  token! : any
  constructor(private http:HttpClient , private router : Router) { }

  public login(username:string ,password : string){

    let options = {
      headers : new  HttpHeaders().set("Content-Type" , "application/x-www-form-urlencoded")
    }

    let params = new  HttpParams().set("username" , username).set("password" , password)
    return this.http.post(environment.apiUrl+"/auth/login" ,params ,options)
  }

  loadProfile(data: any) {

    this.token = data['access_token'];
    this.isAuthenticated = true
    let decodeJWT : any = jwtDecode(this.token)
    this.username = decodeJWT.sub
    this.roles = decodeJWT.scope
    window.localStorage.setItem('token',this.token)

  }

  logout() {
    this.isAuthenticated=false;
    this.token =undefined
    this.roles=undefined
    this.username=undefined
    window.localStorage.removeItem("token")
    this.router.navigateByUrl("/login")
  }

  loadJWTFromLocalStorage() {
    let token = window.localStorage.getItem('token')
    if (token){
      this.loadProfile({access_token : token})
      this.router.navigateByUrl("/admin/customers")
    }
  }
}
