export interface UpdateBootcampRequest {
    id:number,
    name:string,
    instructorId:string,
    bootcampState:boolean,
    bootcampImage:string;
    BootcampImageFile: File;
}
