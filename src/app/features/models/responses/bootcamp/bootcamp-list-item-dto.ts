import { PageResponse } from "../../../../core/models/page-response";
import { GetBootcampsListResponse } from "./get-bootcamps-list-response";

export interface BootcampListDto extends PageResponse{
    items:GetBootcampsListResponse[]

}