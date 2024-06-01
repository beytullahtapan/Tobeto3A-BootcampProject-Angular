import { PageResponse } from "../../../../../core/models/page-response";
import { StudentListItem } from "./student-list-response";


export interface StudentListItemDto extends PageResponse {
    items: StudentListItem[];
}