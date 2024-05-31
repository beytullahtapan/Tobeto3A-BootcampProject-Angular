import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { AddBootcampRequest } from '../../models/requests/bootcamp/addbootcamprequest';
import { AddBootcampResponse } from '../../models/responses/bootcamp/addbootcampresponse';
import { ListBootcampRequest } from '../../models/requests/bootcamp/listbootcamprequest';
import { ListBootcampResponse } from '../../models/responses/bootcamp/listbootcampresponse';
import { InstructorBootcampBaseService } from '../abstracts/bootcamp-base.service';
import { GetbyIdBootcampResponse } from '../../models/responses/bootcamp/getbyidbootcampresponse';
import { UpdateBootcampRequest } from '../../models/requests/bootcamp/updatebootcamprequest';
import { UpdateBootcampResponse } from '../../models/responses/bootcamp/updatebootcampresponse';
import { DeleteBootcampImageRequest } from '../../models/requests/bootcamp/deletebootcampımagerequest';
import { DeleteBootcampImageResponse } from '../../models/responses/bootcamp/deletebootcampımageresponse';
import { ListLessonRequest } from '../../models/requests/lesson/listlessonrequest';
import { ListLessonResponse } from '../../models/responses/lesson/listlessonresponse';
import { PageRequest } from '../../../../core/models/page-request';
import { BootcampListDto } from '../../../../features/models/responses/bootcamp/bootcamp-list-item-dto';
@Injectable({
  providedIn: 'root'
})
export class InstructorBootcamp extends InstructorBootcampBaseService {
  private readonly apiUrl: string = `${environment.API_URL}/Bootcamps`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  override add(addBootcampRequest: AddBootcampRequest): Observable<AddBootcampResponse> {
    return this.httpClient.post<AddBootcampResponse>(`${this.apiUrl}`, addBootcampRequest).pipe(
      map(response => response),
      catchError(responseError => {
        throw responseError;
      })
    );
  }


  override list(pageRequest: PageRequest, instructorId: String): Observable<BootcampListDto> {
    const url = `${this.apiUrl}/instructor/${instructorId}`;
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.page,
      pageSize: pageRequest.pageSize
    };
    return this.httpClient.get<BootcampListDto>(url, { params: newRequest }).pipe(
      map((response) => {
        const newResponse: BootcampListDto = {
          index: pageRequest.page,
          size: pageRequest.pageSize,
          count: response.count,
          hasNext: response.hasNext,
          hasPrevious: response.hasPrevious,
          items: response.items,
          pages: response.pages
        };
        return newResponse;
      })
    );
  }
  

  

  override getBootcampById(bootcampId: number): Observable<GetbyIdBootcampResponse> {
    return this.httpClient.get<GetbyIdBootcampResponse>(`${this.apiUrl}/bootcamp/${bootcampId}`).pipe(
      map((response) => {
        const newResponse: GetbyIdBootcampResponse = {
         id: response.id,
         description: response.description,
         instructorId: response.instructorId,
         name: response.name,
         bootcampState: response.bootcampState,
         bootcampImage: response.bootcampImage
        };
        return newResponse;
      })
    );
  }

  override deleteimage(deleteBootcampImageRequest: DeleteBootcampImageRequest): Observable<DeleteBootcampImageResponse> {
    return this.httpClient.post<DeleteBootcampImageResponse>(`${this.apiUrl}/DeleteImage`, deleteBootcampImageRequest).pipe(
      map(response => response),
      catchError(responseError => {
        throw responseError;
      })
    );
  }

  updateBootcamp(updateBootcampRequest: UpdateBootcampRequest): Observable<UpdateBootcampResponse> {
    return this.httpClient.put<UpdateBootcampResponse>(`${this.apiUrl}`, updateBootcampRequest).pipe(
      map(response => {
        return response;
      }),
      catchError(responseError => {
        throw responseError;
      })
    );
  }

  override deletebootcamp(bootcampId: number): Observable<string> {
    return this.httpClient.delete<string>(`${this.apiUrl}/${bootcampId}`).pipe(
      map(response => response),
      catchError(responseError => {
        throw responseError;
      })
    );
  }

}
