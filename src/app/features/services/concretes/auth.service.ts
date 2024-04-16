import { Injectable } from '@angular/core';
import { AuthBaseService } from '../abstracts/auth-base.service';
import { Observable, catchError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends AuthBaseService {
  fullname!:string;
  userId!:string;
  token:any;
  jwtHelper:JwtHelperService = new JwtHelperService;


  constructor(private httpClient:HttpClient,private storageService:LocalStorageService) {super() }

  getDecodedToken(){
    try{
      this.token=this.storageService.getToken();
      return this.jwtHelper.decodeToken(this.token)
    }
    catch(error){
      return error;
    }
  }

  loggedIn():boolean{
    this.token=this.storageService.getToken();
    let isExpired = this.jwtHelper.isTokenExpired(this.token);
    return !isExpired;
    
  }

  getUserName():string{
    var decoded = this.getDecodedToken();
    var propUserName = Object.keys(decoded).filter(x=>x.endsWith("/name"))[0]
    return this.fullname=decoded[propUserName];
  }

  // getUserName():string{
  //   console.log(this.fullname)
  //   return this.fullname;
  // }
  

  getCurrentUserId():string{
    var decoded = this.getDecodedToken();
    var propUserId = Object.keys(decoded).filter(x=>x.endsWith("/nameidentifier"))[0]
    return this.userId=decoded[propUserId]
  }


  logOut(){
    this.storageService.removeToken();
    alert("Çıkış yapıldı");
    setTimeout(function(){
      location.reload()
    },400)
  }

  
  
}
