import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageRequest } from '../../../../core/models/page-request';
import { AplicantItemListResponse } from '../../models/responses/student/ApplicantInfoResponse';



@Injectable()
export abstract class StudentBaseService {
    abstract getBootcampById(pageRequest:PageRequest, bootcampId: number): Observable<AplicantItemListResponse>;
}
