import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddLessonContentRequest } from '../../models/requests/lesson/addlessoncontentrequest';
import { AddLessonContentResponse } from '../../models/responses/lesson/addlessoncontentresponse';
import { GetByContentRequest } from '../../models/requests/lesson/content/getcontentrequest';
import { GetByContentResponse } from '../../models/responses/lesson/content/getbycontentresponse';
import { UpdateContentRequest } from '../../models/requests/lesson/content/updatecontentrequest';
import { UpdateContentResponse } from '../../models/responses/lesson/content/updatecontentresponse';


@Injectable()
export abstract class InstructorLessonContentBaseService {
    abstract add(addLessonContentRequest: AddLessonContentRequest): Observable<AddLessonContentResponse>;
    abstract getcontent(getByContentRequest: GetByContentRequest): Observable<GetByContentResponse>;
    abstract updatecontent(updateContentRequest: UpdateContentRequest): Observable<UpdateContentResponse>;
    abstract deletelessoncontent(lessonId: number): Observable<string>;
}
