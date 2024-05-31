import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { InstructorLessonBaseService } from '../abstracts/lesson-base.service';
import { AddLessonRequest } from '../../models/requests/lesson/addlessonrequest';
import { AddLessonResponse } from '../../models/responses/lesson/addlessonresponse';
import { ListLessonRequest } from '../../models/requests/lesson/listlessonrequest';
import { ListLessonResponse } from '../../models/responses/lesson/listlessonresponse';
import { GetByidLessonRequest } from '../../models/requests/lesson/getbyidrequest';
import { GetByidLessonResponse } from '../../models/responses/lesson/getbyidresponse';
import { UpdateLessonRequest } from '../../models/requests/lesson/updatelessonrequest';
import { UpdateLessonResponse } from '../../models/responses/lesson/updatelessonresponse';
import { AddLessonContentRequest } from '../../models/requests/lesson/addlessoncontentrequest';
import { LessonListDto } from '../../../../features/models/responses/viewbootcamp/lesson-list-item-dto';
import { PageRequest } from '../../../../core/models/page-request';

@Injectable({
  providedIn: 'root'
})
export class InstructorLessonService extends InstructorLessonBaseService {
  private readonly apiUrl: string = `${environment.API_URL}/Lessons`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  override add(addLessonRequest: AddLessonRequest): Observable<AddLessonResponse> {
    return this.httpClient.post<AddLessonResponse>(`${this.apiUrl}`, addLessonRequest).pipe(
      map(response => response),
      catchError(responseError => {
        throw responseError;
      })
    );
  }

  override list(listLessonRequest: ListLessonRequest): Observable<ListLessonResponse> {
    const url = `${this.apiUrl}/bootcamp/${listLessonRequest.BootcampId}`;
    const params = { PageIndex: listLessonRequest.pageIndex.toString(), PageSize: listLessonRequest.pageSize.toString() };
  
    return this.httpClient.get<ListLessonResponse>(url, { params }).pipe(
      map(response => response),
      catchError(responseError => {
        throw responseError;
      })
    );
  }


  getLessonlist(pageRequest: PageRequest, bootcampId: number): Observable<LessonListDto> {
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.page,
      pageSize: pageRequest.pageSize
    };

    return this.httpClient.get<LessonListDto>(`${this.apiUrl}/bootcamp/${bootcampId}`, {
      params: newRequest
    }).pipe(
      map((response)=>{
        const newResponse:LessonListDto={
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

  override getbyid(getByidLessonRequest: GetByidLessonRequest): Observable<GetByidLessonResponse> {
    const url = `${this.apiUrl}/${getByidLessonRequest.LessonId}`;
    return this.httpClient.get<GetByidLessonResponse>(url).pipe(
      map(response => response),
      catchError(responseError => {
        throw responseError;
      })
    );
  }


  updateLesson(updateLessonRequest: UpdateLessonRequest): Observable<UpdateLessonResponse> {
    return this.httpClient.put<UpdateLessonResponse>(`${this.apiUrl}`, updateLessonRequest).pipe(
      map(response => {
        return response;
      }),
      catchError(responseError => {
        throw responseError;
      })
    );
  }

  override deletelesson(lessonId: number): Observable<string> {
    return this.httpClient.delete<string>(`${this.apiUrl}/${lessonId}`).pipe(
      map(response => response),
      catchError(responseError => {
        throw responseError;
      })
    );
  }
 
}
