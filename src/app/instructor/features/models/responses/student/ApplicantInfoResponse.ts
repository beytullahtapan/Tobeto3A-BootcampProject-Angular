export interface AplicantItemListResponse {
    items: AplicantItemList[];
    index: number;
    size: number;
    count: number;
    pages: number;
    hasPrevious: boolean;
    hasNext: boolean;
}
export interface  AplicantItemList {
    id: number;
    applicantId: string;
    bootcampId: number;
}