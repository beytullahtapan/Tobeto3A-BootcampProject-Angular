import { PageResponse } from "../../../../core/models/page-response";
import { GetListAnnouncementResponse } from "./get-list-announcement-response";

export interface AnnouncementListDto extends PageResponse{
    items:GetListAnnouncementResponse[]
}
