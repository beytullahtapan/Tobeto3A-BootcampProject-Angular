import { PageRequest } from "../../../../core/models/page-request";

export interface GetChatRequest{
    senderId: string;
    receiverId: string ;
    pageRequest: PageRequest;
}