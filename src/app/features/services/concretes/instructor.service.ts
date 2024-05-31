import { Injectable } from '@angular/core';
import { InstructorBaseService } from '../abstracts/instructor-base.service';
import { Observable, map } from 'rxjs';
import { PageRequest } from '../../../core/models/page-request';
import { GetbyidInstructorResponse } from '../../models/responses/instructor/getbyid-instructor-response';
import { InstructorListDto } from '../../models/responses/instructor/instructor-list-dto';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstructorService extends InstructorBaseService {
  private readonly apiUrl:string = `${environment.API_URL}/Instructors`
  apiGetByIdUrl=""

  constructor(private httpClient:HttpClient) {
    super();
  }
  override GetListAll(): Observable<InstructorListDto> {
    const newRequest: {[key: string]: string | number} = {
      page: 0,
      pageSize: 100
    };

    return this.httpClient.get<InstructorListDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response)=>{
        const newResponse:InstructorListDto={
          index:0,
          size:100000,
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
  override GetList(pageRequest: PageRequest): Observable<InstructorListDto> {
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.page,
      pageSize: pageRequest.pageSize
    };

    return this.httpClient.get<InstructorListDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response)=>{
        const newResponse:InstructorListDto={
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
  override getInstructorById(instructorId: string): Observable<GetbyidInstructorResponse> {
    return this.httpClient.get<GetbyidInstructorResponse>(`${this.apiUrl}/${instructorId}`);
  }

 
}
