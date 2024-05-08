import { Observable } from "rxjs";
import { PageRequest } from "../../../core/models/page-request";
import { BootcampListDto } from "../../models/responses/bootcamp/bootcamp-list-item-dto";
import { Injectable } from "@angular/core";

@Injectable()
export abstract class BootcampBaseService{
    abstract getList(pageRequest:PageRequest):Observable<BootcampListDto>
    abstract getBootcampListByInstructorId(pageRequest:PageRequest,instructorId:string)
    :Observable<BootcampListDto>
}