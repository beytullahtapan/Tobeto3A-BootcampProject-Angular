import { Injectable } from '@angular/core';
import { DeleteApplicantResponse } from '../../models/responses/applicant/delete-applicant-response';
import { ApplicantBaseService } from '../abstracts/applicant-base.service';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PageRequest } from '../../../core/models/page-request';
import { ApplicantListDto } from '../../models/responses/applicant/applicant-list-dto';
import { GetbyidApplicantResponse } from '../../models/responses/applicant/getbyid-applicant-response';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService extends ApplicantBaseService {
  private readonly apiUrl:string = `${environment.API_URL}/applicants`
  
  constructor(private httpClient:HttpClient) {super() } 
  

  override getList(pageRequest:PageRequest): Observable<ApplicantListDto> {
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.page,
      pageSize: pageRequest.pageSize
    };

    return this.httpClient.get<ApplicantListDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response)=>{
        const newResponse:ApplicantListDto={
          index:pageRequest.page,
          size:pageRequest.pageSize,
          count:response.count,
          hasNext:response.hasNext,
          hasPrevious:response.hasPrevious,
          items:response.items,
          pages:response.pages
        };
        
        return newResponse;
      })
    )
  }
  
  override getApplicantById(applicantId:string): Observable<GetbyidApplicantResponse> {
    return this.httpClient.get<GetbyidApplicantResponse>(`${this.apiUrl}/`+applicantId);
  }

  override delete(id: string): Observable<DeleteApplicantResponse> {
    return this.httpClient.delete<DeleteApplicantResponse>(`${this.apiUrl}/`+id);
  }
}
