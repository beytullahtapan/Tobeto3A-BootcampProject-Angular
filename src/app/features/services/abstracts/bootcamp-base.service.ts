import { Observable } from "rxjs";
import { PageRequest } from "../../../core/models/page-request";
import { BootcampListDto } from "../../models/responses/bootcamp/bootcamp-list-item-dto";
import { Injectable } from "@angular/core";
import { GetbyidBootcampResponse } from "../../models/responses/bootcamp/getbyid-bootcamp-response";
import { CreateBootcampResponse } from "../../models/responses/bootcamp/create-bootcamp-response";
import { DeleteBootcampResponse } from "../../models/responses/bootcamp/delete-bootcamp-response";
import { UpdateBootcampResponse } from "../../models/responses/bootcamp/update-bootcamp-response";

@Injectable()
export abstract class BootcampBaseService{
  abstract getList(pageRequest:PageRequest):Observable<BootcampListDto>;
  abstract getBootcampListByInstructorId(pageRequest:PageRequest,instructorId:string):Observable<BootcampListDto>;
   
}