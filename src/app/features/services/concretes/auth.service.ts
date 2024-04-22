import { Injectable } from '@angular/core';
import { AuthBaseService } from '../abstracts/auth-base.service';
import { Observable, catchError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserForLoginRequest } from '../../models/requests/users/user-login-request';
import { UserForRegisterRequest } from '../../models/requests/users/user-register-request';
import { AccessTokenModel } from '../../models/responses/users/acces-token-model';
import { TokenModel } from '../../models/responses/users/token-model';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends AuthBaseService {
  fullname!:string;
  userId!:string;
  token:any;
  jwtHelper:JwtHelperService = new JwtHelperService;
  claims:string[]=[];
  
  private readonly apiUrl:string = `${environment.API_URL}/Auth`;
  constructor(private httpClient:HttpClient,private storageService:LocalStorageService) {super() }

  override login(userForLoginRequest: UserForLoginRequest): Observable<AccessTokenModel<TokenModel>> {
    return this.httpClient.post<AccessTokenModel<TokenModel>>(`${this.apiUrl}/Login`,userForLoginRequest).pipe(map(response=>{
      this.storageService.setToken(response.accessToken.token);
      alert("Giriş yapıldı");
      return response;
    }),catchError(responseError=>{
      alert(responseError.error)
      throw responseError;
    })
    )
  }

  override register(userForRegisterRequest: UserForRegisterRequest): Observable<AccessTokenModel<TokenModel>> {
    return this.httpClient.post<AccessTokenModel<TokenModel>>(`${this.apiUrl}/RegisterApplicant`,userForRegisterRequest);
  }


  override getDecodedToken(){
    try{
      this.token=this.storageService.getToken();
      return this.jwtHelper.decodeToken(this.token)
    }
    catch(error){
      return error;
    }
  }

  override loggedIn():boolean{
    this.token=this.storageService.getToken();
    let isExpired = this.jwtHelper.isTokenExpired(this.token);
    return !isExpired;
    
  }

  override getUserName():string{
    var decoded = this.getDecodedToken();
    var propUserName = Object.keys(decoded).filter(x=>x.endsWith("/name"))[0]
    return this.fullname=decoded[propUserName];
  }

  // getUserName():string{
  //   console.log(this.fullname)
  //   return this.fullname;
  // }
  

  override getCurrentUserId():string{
    var decoded = this.getDecodedToken();
    var propUserId = Object.keys(decoded).filter(x=>x.endsWith("/nameidentifier"))[0]
    return this.userId=decoded[propUserId]
  }


  override logOut(){
    this.storageService.removeToken();
    alert("Çıkış yapıldı");
    setTimeout(function(){
      location.reload()
    },400)
  }

  override getRoles():string[]{
    if(this.storageService.getToken()){
      var decoded = this.getDecodedToken();
      var role = Object.keys(decoded).filter(x=>x.endsWith("/role"))[0];
      this.claims=decoded[role];
    }
    return this.claims;
  }

  override isAdmin():boolean{
    if(this.claims.includes("admin")){
      return true;
    }
    return false;
    
  }

  
  
}
