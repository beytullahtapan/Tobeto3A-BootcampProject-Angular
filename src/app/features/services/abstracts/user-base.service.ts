import { Injectable } from "@angular/core";
import { UserForInfoRequest } from "../../models/requests/users/user-info-request";
import { UserForInfoResponse } from "../../models/responses/users/user-info-response";
import { Observable } from "rxjs";



@Injectable()
export abstract class UserBaseService{
    abstract userinfo(userForInfoRequest: UserForInfoRequest): Observable<UserForInfoResponse>;
   
}