import { PageResponse } from "../../../../core/models/page-response";
import { GetlistInstructorResponse } from "./getlist-instructor-response";

export interface InstructorListDto extends PageResponse {
    items:GetlistInstructorResponse[];
}
