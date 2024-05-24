import { Observable } from "rxjs";
import { InstructorListDto } from "../../models/responses/instructor/instructor-list-dto";
import { PageRequest } from "../../../core/models/page-request";
import { GetbyidInstructorResponse } from "../../models/responses/instructor/getbyid-instructor-response";

export abstract class InstructorBaseService {
    abstract GetListAll():Observable<InstructorListDto>;
    abstract GetList(pageRequest:PageRequest):Observable<InstructorListDto>;
    abstract getInstructorById(instructorId:string):Observable<GetbyidInstructorResponse>;

}
