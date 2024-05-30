import { PageResponse } from "../../../../core/models/page-response";
import { GetlistApplicantResponse } from "./getlist-applicant-response";

export interface ApplicantListDto extends PageResponse{
    items:GetlistApplicantResponse[];
}
