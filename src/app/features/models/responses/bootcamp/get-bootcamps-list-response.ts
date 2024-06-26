export interface GetBootcampsListResponse {
    id:number;
    name:string;
    description:string;
    instructorId:string;
    instructorName:string;
    startDate:Date;
    endDate:Date;
    bootcampState: Boolean;
    bootcampImage: string;
    createdDate: Date;
    updatedDate: Date;
    isRegistered:boolean;
}
