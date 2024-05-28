export interface GetBootcampsListResponse {
    id:number;
    name:string;
    instructorId:string;
    instructorFirstName:string;
    instructorLastName:string;
    startDate:Date;
    endDate:Date;
    bootcampState: Boolean;
    bootcampImage: string;
    createdDate: Date;
    updatedDate: Date;
}
