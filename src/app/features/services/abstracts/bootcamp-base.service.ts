import { Observable } from "rxjs";
import { PageRequest } from "../../../core/models/page-request";
import { BootcampListDto } from "../../models/responses/bootcamp/bootcamp-list-item-dto";
import { Injectable } from "@angular/core";
import { ListBootcampResponse } from "../../../instructor/features/models/responses/bootcamp/listbootcampresponse";
import { ListBootcampRequest } from "../../models/requests/bootcamp/get-bootcamp-request";

@Injectable()
export abstract class BootcampBaseService{
  abstract getList(pageRequest:PageRequest):Observable<BootcampListDto>;
  abstract getBootcampListByInstructorId(pageRequest:PageRequest,instructorId:string):Observable<BootcampListDto>;
  abstract GetBootcamp(listBootcampRequest:ListBootcampRequest):Observable<ListBootcampResponse>;
   
}