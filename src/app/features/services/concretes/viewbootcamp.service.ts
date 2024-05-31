import { Injectable } from '@angular/core';
import { BootcampBaseService } from '../abstracts/bootcamp-base.service';
import { Observable, catchError, map } from 'rxjs';
import { PageRequest } from '../../../core/models/page-request';
import { BootcampListDto } from '../../models/responses/bootcamp/bootcamp-list-item-dto';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { ListBootcampResponse } from '../../models/responses/bootcamp/get-bootcamps-response';
import { ListBootcampRequest } from '../../models/requests/bootcamp/get-bootcamp-request';
import { ViewBootcampBaseService } from '../abstracts/viewbootcamp-base.service';
import { GetbyIdBootcampResponse } from '../../../instructor/features/models/responses/bootcamp/getbyidbootcampresponse';
import { GetByContentRequest } from '../../../instructor/features/models/requests/lesson/content/getcontentrequest';
import { GetByContentResponse } from '../../../instructor/features/models/responses/lesson/content/getbycontentresponse';

@Injectable({
  providedIn: 'root'
})
export class ViewBootcampService extends ViewBootcampBaseService {
  
  private readonly apiUrl:string = `${environment.API_URL}`
  constructor(private httpClient:HttpClient) {super() }

  override GetBootcamp(bootcampId: number): Observable<GetbyIdBootcampResponse> {
    return this.httpClient.get<GetbyIdBootcampResponse>(`${this.apiUrl}/Bootcamps/bootcamp/${bootcampId}`).pipe(
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

  override getlessoncontent(getByContentRequest: GetByContentRequest): Observable<GetByContentResponse> {
    const url = `${this.apiUrl}/LessonContents/lesson/${getByContentRequest.LessonId}`;
    return this.httpClient.get<GetByContentResponse>(url).pipe(
      map(response => response),
      catchError(responseError => {
        throw responseError;
      })
    );
  }
  
}