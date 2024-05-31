import { Injectable } from '@angular/core';
import { ApplicantListDto } from '../../models/responses/applicant/applicant-list-dto';
import { DeleteApplicantResponse } from '../../models/responses/applicant/delete-applicant-response';
import { GetbyidApplicantResponse } from '../../models/responses/applicant/getbyid-applicant-response';
import { PageRequest } from '../../../core/models/page-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class ApplicantBaseService {
  abstract getList(pageRequest:PageRequest):Observable<ApplicantListDto>;
  abstract getApplicantById(applicantId:string):Observable<GetbyidApplicantResponse>;
  abstract delete(id:string):Observable<DeleteApplicantResponse>;
}
