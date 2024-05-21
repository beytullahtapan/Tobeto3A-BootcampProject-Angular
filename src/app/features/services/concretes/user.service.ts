import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { environment } from '../../../../environments/environment';
import { UserBaseService } from '../abstracts/user-base.service';
import { UserForInfoRequest } from '../../models/requests/users/user-info-request';
import { UserForInfoResponse } from '../../models/responses/users/user-info-response';
import { Observable, catchError, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService extends UserBaseService {
  
    private readonly apiUrl: string = `${environment.API_URL}/Users`;
    
    constructor(private httpClient: HttpClient, private storageService: LocalStorageService) {
      super();
    }
  
    userinfo(userForInfoRequest: UserForInfoRequest): Observable<UserForInfoResponse> {
        return this.httpClient.get<UserForInfoResponse>(`${this.apiUrl}/${userForInfoRequest.ıd}`).pipe(
            map(response => {
                return response;
            }),
            catchError(error => {
                throw error;
            })
        );
    }
      
  }
