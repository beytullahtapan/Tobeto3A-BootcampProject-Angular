import { Injectable } from '@angular/core';
import { CreateInstructorApplicationRequest } from '../../models/requests/instructor-application/create-instructor-application-request';
import { Observable } from 'rxjs';
import { CreateInstructorApplicationResponse } from '../../models/responses/instructor-application/create-instructor-application-response';

@Injectable()
export abstract class InstructorApplicationBaseService {

  abstract create(createInstructorApplicationRequest:CreateInstructorApplicationRequest):Observable<CreateInstructorApplicationResponse>;
}
