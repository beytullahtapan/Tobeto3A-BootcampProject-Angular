import { Observable } from "rxjs";
import { PageRequest } from "../../../core/models/page-request";
import { BootcampListDto } from "../../models/responses/bootcamp/bootcamp-list-item-dto";
import { Injectable } from "@angular/core";
import { ListBootcampResponse } from "../../../instructor/features/models/responses/bootcamp/listbootcampresponse";
import { ListBootcampRequest } from "../../models/requests/bootcamp/get-bootcamp-request";
import { GetbyIdBootcampResponse } from "../../../instructor/features/models/responses/bootcamp/getbyidbootcampresponse";
import { GetByContentRequest } from "../../../instructor/features/models/requests/lesson/content/getcontentrequest";
import { GetByContentResponse } from "../../../instructor/features/models/responses/lesson/content/getbycontentresponse";

@Injectable()
export abstract class ViewBootcampBaseService {
    abstract GetBootcamp(bootcampId: number): Observable<GetbyIdBootcampResponse>;
    abstract getlessoncontent(getByContentRequest: GetByContentRequest): Observable<GetByContentResponse>;
  }