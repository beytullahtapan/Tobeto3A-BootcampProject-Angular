import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddLessonRequest } from '../../models/requests/lesson/addlessonrequest';
import { AddLessonResponse } from '../../models/responses/lesson/addlessonresponse';
import { ListLessonRequest } from '../../models/requests/lesson/listlessonrequest';
import { ListLessonResponse } from '../../models/responses/lesson/listlessonresponse';
import { GetByidLessonRequest } from '../../models/requests/lesson/getbyidrequest';
import { GetByidLessonResponse } from '../../models/responses/lesson/getbyidresponse';
import { LessonListDto } from '../../../../features/models/responses/viewbootcamp/lesson-list-item-dto';
import { PageRequest } from '../../../../core/models/page-request';


@Injectable()
export abstract class InstructorLessonBaseService {
    abstract add(addlessonrequest: AddLessonRequest): Observable<AddLessonResponse>;
    abstract list(listLessonRequest: ListLessonRequest): Observable<ListLessonResponse>;
    abstract getLessonlist(pageRequest: PageRequest, bootcampId: number): Observable<LessonListDto>
    abstract getbyid(getByidLessonRequest: GetByidLessonRequest): Observable<GetByidLessonResponse>;
    abstract deletelesson(lessonId: number): Observable<string>;
}
