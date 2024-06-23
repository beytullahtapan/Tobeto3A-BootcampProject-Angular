export interface CreateInstructorApplicationResponse{
    id:number;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date | null;
    nationalIdentity?: string;
    companyName: string;
    additionalInformation?: string;
    isApproved?: boolean;
}