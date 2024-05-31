export interface GetlistApplicantResponse {
    id: string; 
    userName: string;
    firstName:string;
    lastName:string;
    about:string;
    dateOfBirth: Date;
    nationalIdentity:string;
    email:string;
    password:string;
    createdDate:Date;
    updatedDate:Date;
    isBlackListed:boolean;
}
