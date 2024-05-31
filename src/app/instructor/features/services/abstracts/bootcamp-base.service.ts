import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBootcampRequest } from '../../models/requests/bootcamp/addbootcamprequest';
import { AddBootcampResponse } from '../../models/responses/bootcamp/addbootcampresponse';
import { ListBootcampRequest } from '../../models/requests/bootcamp/listbootcamprequest';
import { ListBootcampResponse } from '../../models/responses/bootcamp/listbootcampresponse';
import { GetbyIdBootcampResponse } from '../../models/responses/bootcamp/getbyidbootcampresponse';
import { UpdateBootcampRequest } from '../../models/requests/bootcamp/updatebootcamprequest';
import { UpdateBootcampResponse } from '../../models/responses/bootcamp/updatebootcampresponse';
import { DeleteBootcampImageRequest } from '../../models/requests/bootcamp/deletebootcampımagerequest';
import { DeleteBootcampImageResponse } from '../../models/responses/bootcamp/deletebootcampımageresponse';
import { ListLessonRequest } from '../../models/requests/lesson/listlessonrequest';
import { ListLessonResponse } from '../../models/responses/lesson/listlessonresponse';
import { PageRequest } from '../../../../core/models/page-request';
import { BootcampListDto } from '../../../../features/models/responses/bootcamp/bootcamp-list-item-dto';


@Injectable()
export abstract class InstructorBootcampBaseService {
    abstract add(addBootcampRequest: AddBootcampRequest): Observable<AddBootcampResponse>;
    abstract list(pageRequest: PageRequest, instructorId: String): Observable<BootcampListDto>;
    abstract getBootcampById(bootcampId: number): Observable<GetbyIdBootcampResponse>;
    abstract updateBootcamp(updateBootcampRequest: UpdateBootcampRequest): Observable<UpdateBootcampResponse>;
    abstract deleteimage(deleteBootcampImageRequest: DeleteBootcampImageRequest): Observable<DeleteBootcampImageResponse>;
    abstract deletebootcamp(bootcampId: number): Observable<string>;
}
