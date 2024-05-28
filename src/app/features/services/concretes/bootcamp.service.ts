import { Injectable } from '@angular/core';
import { BootcampBaseService } from '../abstracts/bootcamp-base.service';
import { Observable, map } from 'rxjs';
import { PageRequest } from '../../../core/models/page-request';
import { BootcampListDto } from '../../models/responses/bootcamp/bootcamp-list-item-dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BootcampService extends BootcampBaseService {
  
  private readonly apiUrl:string = `${environment.API_URL}/Bootcamps`
  constructor(private httpClient:HttpClient) {super() }

  override getList(pageRequest: PageRequest): Observable<BootcampListDto> {
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.page,
      pageSize: pageRequest.pageSize
    };

    return this.httpClient.get<BootcampListDto>(this.apiUrl, {
      params: newRequest
    }).pipe(
      map((response)=>{
        const newResponse:BootcampListDto={
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

   override getBootcampListByInstructorId(pageRequest: PageRequest, instructorId: string): Observable<BootcampListDto> {
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.page,
      pageSize: pageRequest.pageSize,
      instructorId: instructorId,
    };
  
    return this.httpClient.get<BootcampListDto>(`${this.apiUrl}/getbootcampbyinstructorid`, {
      params: newRequest
    }).pipe(
      map((response)=>{
        const newResponse:BootcampListDto={
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
  
}