export interface MessageResponse{
    id: string;
    senderId: string ;
    receiverId: string ;
    createdDate: Date ;
    content: string ;
    isRead: boolean;
}