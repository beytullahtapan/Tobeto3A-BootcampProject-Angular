import { Injectable } from '@angular/core';
import { InstructorApplicationBaseService } from '../abstracts/instructor-application-base.service';
import { Observable, catchError, map } from 'rxjs';
import { CreateInstructorApplicationRequest } from '../../models/requests/instructor-application/create-instructor-application-request';
import { CreateInstructorApplicationResponse } from '../../models/responses/instructor-application/create-instructor-application-response';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstructorApplicationService extends InstructorApplicationBaseService {
  private readonly apiUrl:string = `${environment.API_URL}/InstructorApplications`

  constructor(private httpClient:HttpClient) {
    super();
  }

  override create(createInstructorApplicationRequest: CreateInstructorApplicationRequest): Observable<CreateInstructorApplicationResponse> {
    return this.httpClient.post<CreateInstructorApplicationResponse>(`${this.apiUrl}`,createInstructorApplicationRequest).pipe(map(response=>{
      return response;
    }),catchError(responseError=>{
      throw responseError;
    })
    );
  }


}
