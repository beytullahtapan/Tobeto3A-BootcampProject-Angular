import { Observable } from "rxjs";
import { PageRequest } from "../../../core/models/page-request";
import { BootcampListDto } from "../../models/responses/bootcamp/bootcamp-list-item-dto";
import { Injectable } from "@angular/core";
import { ListBootcampResponse } from "../../../instructor/features/models/responses/bootcamp/listbootcampresponse";
import { ListBootcampRequest } from "../../models/requests/bootcamp/get-bootcamp-request";
import { BootcampApplicationResponse } from "../../models/responses/bootcampapplication/bootcamp-application-response";
import { BootcampApplicationRequest } from "../../models/requests/bootcampapplication/bootcamp-application-request";
import { CheckRegisteredRequest } from "../../models/requests/bootcampapplication/check-registered-request";
import { CheckRegisteredResponse } from "../../models/responses/bootcampapplication/check-registered-response";

@Injectable()
export abstract class BootcampApplicationBaseService{
    abstract apply(bootcampApplicationRequest:BootcampApplicationRequest):Observable<BootcampApplicationResponse>;
    abstract CheckRegistered(checkRegisteredRequest: CheckRegisteredRequest):Observable<Boolean>;
    abstract CheckBootcamp(BootcampId: Number):Observable<BootcampApplicationResponse>;
}