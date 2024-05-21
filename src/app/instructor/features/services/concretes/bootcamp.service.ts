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


  override list(listBootcampRequest: ListBootcampRequest): Observable<ListBootcampResponse> {
    const url = `${this.apiUrl}/instructor/${listBootcampRequest.InstructorId}`;
    const params = { PageIndex: listBootcampRequest.pageIndex.toString(), PageSize: listBootcampRequest.pageSize.toString() };
  
    return this.httpClient.get<ListBootcampResponse>(url, { params }).pipe(
      map(response => response),
      catchError(responseError => {
        throw responseError;
      })
    );
  }


  override getBootcampById(bootcampId: number): Observable<GetbyIdBootcampResponse> {
    return this.httpClient.get<GetbyIdBootcampResponse>(`${this.apiUrl}/bootcamp/${bootcampId}`).pipe(
      map((response) => {
        const newResponse: GetbyIdBootcampResponse = {
         id: response.id,
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
