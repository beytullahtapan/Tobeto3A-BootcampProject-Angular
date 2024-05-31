import { Injectable } from '@angular/core';
import { BootcampBaseService } from '../abstracts/bootcamp-base.service';
import { Observable, catchError, map } from 'rxjs';
import { PageRequest } from '../../../core/models/page-request';
import { BootcampListDto } from '../../models/responses/bootcamp/bootcamp-list-item-dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { ListBootcampResponse } from '../../models/responses/bootcamp/get-bootcamps-response';
import { ListBootcampRequest } from '../../models/requests/bootcamp/get-bootcamp-request';
import { GetbyidBootcampResponse } from '../../models/responses/bootcamp/getbyid-bootcamp-response';

@Injectable({
  providedIn: 'root'
})
export class BootcampService extends BootcampBaseService {
  
  getBootcampListByBootcampId(pageRequest: PageRequest, bootcampId: string): Observable<BootcampListDto> {
    const url = `${this.apiUrl}/bootcamps/bootcamp/${bootcampId}?page=${pageRequest.page}&size=${pageRequest.pageSize}`;
    return this.httpClient.get<BootcampListDto>(url);
  }
  
  override getListByBootcampSearch(pageRequest: PageRequest, search: string, instructorId: string): Observable<BootcampListDto> {
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.page,
      pageSize: pageRequest.pageSize,
      search: search,
      instructorId: instructorId
    };

    return this.httpClient.get<BootcampListDto>(`${this.apiUrl}/getbootcampListByBootcampNameSearch`, {
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
    );
  }
  
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
  
    return this.httpClient.get<BootcampListDto>
    (`${this.apiUrl}/instructor/${instructorId}?PageIndex=${pageRequest.page}&PageSize=${pageRequest.pageSize}`)
    .pipe(
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




    override GetBootcamp(listBootcampRequest:ListBootcampRequest): Observable<ListBootcampResponse> {
      const url = `${this.apiUrl}`;
     const params = { PageIndex: listBootcampRequest.pageIndex.toString(), PageSize: listBootcampRequest.pageSize.toString() };
      return this.httpClient.get<ListBootcampResponse>(url, { params }).pipe(
        map(response => response),
        catchError(responseError => {
          throw responseError;
        })
      );
    }   
  
}