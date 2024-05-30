export interface DeleteChatResponse{
    senderId: string;
    receiverId: string;
    messageCount: number;
    deletedDate: Date;
}