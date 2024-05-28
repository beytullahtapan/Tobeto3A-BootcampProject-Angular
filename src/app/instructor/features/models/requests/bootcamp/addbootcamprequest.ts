export interface AddBootcampRequest {
    Name:string,
    Description:string,
    InstructorId:string,
    BootcampState:boolean,
    BootcampImageFile: File;
    BootcampImage:string;
}
