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
import { StudentBaseService } from '../abstracts/student-base.service';
import { AplicantItemListResponse } from '../../models/responses/student/ApplicantInfoResponse';


@Injectable({
  providedIn: 'root'
})
export class StudentService extends StudentBaseService {
  private readonly apiUrl: string = `${environment.API_URL}`;

  constructor(private httpClient: HttpClient) {
    super();
  }
  override getBootcampById(pageRequest: PageRequest, bootcampId: number): Observable<AplicantItemListResponse> {
    const url = `${this.apiUrl}/ApplicationInformations/Bootcamps/${bootcampId}`;
    const newRequest: {[key: string]: string | number} = {
      pageIndex: pageRequest.page,
      pageSize: pageRequest.pageSize
    };
    return this.httpClient.get<AplicantItemListResponse>(url, { params: newRequest }).pipe(
      map((response: AplicantItemListResponse) => {
        return response; // Direkt olarak response döndürülüyor
      })
    );
  }
  


 
}
