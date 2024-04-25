import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AccessTokenModel } from "../../models/responses/users/acces-token-model";
import { TokenModel } from "../../models/responses/users/token-model";
import { UserForRegisterRequest } from "../../models/requests/users/user-register-request";
import { UserForLoginRequest } from "../../models/requests/users/user-login-request";


@Injectable()
export abstract class AuthBaseService{

    abstract login(userLoginRequest:UserForLoginRequest):Observable<AccessTokenModel<TokenModel>>;

    abstract register(userForRegisterRequest:UserForRegisterRequest):Observable<AccessTokenModel<TokenModel>>;

    abstract getDecodedToken():void;
    abstract loggedIn():boolean;
    abstract getUserName():string;
    abstract getCurrentUserId():string;
    abstract logOut():void;
    abstract getRoles():string[];
    abstract isAdmin():boolean;
    abstract hasRole(role:string):boolean;
}