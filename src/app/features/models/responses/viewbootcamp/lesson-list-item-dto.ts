import { PageResponse } from "../../../../core/models/page-response";
import { GetByidLessonResponse } from "../../../../instructor/features/models/responses/lesson/getbyidresponse";

export interface LessonListDto extends PageResponse{
    items:GetByidLessonResponse[]
}