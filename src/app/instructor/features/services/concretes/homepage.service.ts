import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InstructorHomePageBaseService } from '../abstracts/homepage-base.service';
import { environment } from '../../../../../environments/environment';
import { GetBootcampCountRequest } from '../../models/requests/homepage/getbootcampcountrequest';
import { GetBootcampCountResponse } from '../../models/responses/homepage/getbootcampcountresponse';
@Injectable({
  providedIn: 'root'
})
export class HomepageService extends InstructorHomePageBaseService {
  private readonly apiUrl: string = `${environment.API_URL}/Bootcamps`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  
  override getbootcampcount(getBootcampCountRequest: GetBootcampCountRequest): Observable<GetBootcampCountResponse> {
    const url = `${this.apiUrl}/instructor/${getBootcampCountRequest.InstructorId}`;
    return this.httpClient.get<GetBootcampCountResponse>(url).pipe(
      map(response => response),
      catchError(responseError => {
        throw responseError;
      })
    );
  }



}
