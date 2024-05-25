import { Injectable } from '@angular/core';
import { GetBootcampCountRequest } from '../../models/requests/homepage/getbootcampcountrequest';
import { GetBootcampCountResponse } from '../../models/responses/homepage/getbootcampcountresponse';
import { Observable } from 'rxjs';


@Injectable()
export abstract class InstructorHomePageBaseService {
    abstract getbootcampcount(getBootcampCountRequest: GetBootcampCountRequest): Observable<GetBootcampCountResponse>;
}
