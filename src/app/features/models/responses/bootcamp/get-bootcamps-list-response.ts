export interface GetBootcampsListResponse {
    id:number;
    name:string;
    instructorId:string;
    instructorFirstName:string;
    instructorLastName:string;
    startDate:Date;
    endDate:Date;
    bootcampStateId: number;
    bootcampStateName: string;
    bootcampImageId: number;
    bootcampImageImagePath: string;
    createdDate: Date;
    updatedDate: Date;
}
