import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { InstructorLessonContentBaseService } from '../abstracts/lessoncontent-base.service';
import { AddLessonContentRequest } from '../../models/requests/lesson/addlessoncontentrequest';
import { AddLessonContentResponse } from '../../models/responses/lesson/addlessoncontentresponse';
import { catchError, map, Observable, throwError } from 'rxjs'; 
import { GetByContentRequest } from '../../models/requests/lesson/content/getcontentrequest';
import { GetByContentResponse } from '../../models/responses/lesson/content/getbycontentresponse';
import { UpdateContentRequest } from '../../models/requests/lesson/content/updatecontentrequest';
import { UpdateContentResponse } from '../../models/responses/lesson/content/updatecontentresponse';

@Injectable({
  providedIn: 'root'
})
export class InstructorLessonContentService extends InstructorLessonContentBaseService {
  private readonly apiUrl: string = `${environment.API_URL}/LessonContents`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  override add(addLessonContentRequest: AddLessonContentRequest): Observable<AddLessonContentResponse> {
    return this.httpClient.post<AddLessonContentResponse>(`${this.apiUrl}`, addLessonContentRequest).pipe(
      map(response => response),
      catchError(responseError => {
        throw responseError;
      })
    );
  }

  override getcontent(getByContentRequest: GetByContentRequest): Observable<GetByContentResponse> {
    const url = `${this.apiUrl}/lesson/${getByContentRequest}`;
    return this.httpClient.get<GetByContentResponse>(url).pipe(
      map(response => response),
      catchError(responseError => {
        throw responseError;
      })
    );
  }

  updatecontent(updateContentRequest: UpdateContentRequest): Observable<UpdateContentResponse> {
    return this.httpClient.put<UpdateContentResponse>(`${this.apiUrl}`, updateContentRequest).pipe(
      map(response => {
        return response;
      }),
      catchError(responseError => {
        throw responseError;
      })
    );
  }

  override deletelessoncontent(lessonId: number): Observable<string> {
    return this.httpClient.delete<string>(`${this.apiUrl}/${lessonId}`).pipe(
      map(response => response),
      catchError(responseError => {
        throw responseError;
      })
    );
  }
 
 
}
