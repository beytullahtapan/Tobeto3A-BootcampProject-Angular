import { PageResponse } from "../../../../../core/models/page-response";
import { AplicantItemListResponse } from "./ApplicantInfoResponse";

export interface ApplicantListDto extends PageResponse {
    items: AplicantItemListResponse[];
}