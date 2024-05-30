import { PageResponse } from "../../../../core/models/page-response";
import { GetlistApplicationinformationResponse } from "./getlist-applicationinformation-response";

export interface ApplicationInformatinListDto extends PageResponse{
    items:GetlistApplicationinformationResponse[];
}
