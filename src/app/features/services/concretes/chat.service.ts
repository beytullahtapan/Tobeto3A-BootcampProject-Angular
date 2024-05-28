import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { ChatBaseService } from '../abstracts/chat-base.service';
import { Observable } from 'rxjs';
import { PaginatedList } from '../../../core/models/paginated-list';
import { SendMessageRequest } from '../../models/requests/chat/send-message-request';
import { ChatUserResponse } from '../../models/responses/chat/chat-user-response';
import { MessageResponse } from '../../models/responses/chat/send-message-response';
import { GetChatRequest } from '../../models/requests/chat/get-chat-request';
import { DeleteChatRequest } from '../../models/requests/chat/delete-chat-request';
import { DeleteChatResponse } from '../../models/responses/chat/delete-chat-response';
import { DeleteMessageResponse } from '../../models/responses/chat/delete-message-response';

@Injectable({
  providedIn: 'root'
})
export class ChatService extends ChatBaseService{

  private readonly apiUrl:string = `${environment.API_URL}/Chats`;

  constructor(private httpClient:HttpClient,private storageService:LocalStorageService) {super() }

  override getChatUsers(userId: string): Observable<PaginatedList<ChatUserResponse>> {
    return this.httpClient.get<PaginatedList<ChatUserResponse>>(`${this.apiUrl}/GetChatHistory?UserId=${userId}`);
  }
  
  override sendMessage(sendMessageRequest: SendMessageRequest): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse>(`${this.apiUrl}/SendMessage`, sendMessageRequest);
  }

  override getChats(getChatRequest: GetChatRequest): Observable<PaginatedList<MessageResponse>> {

    return this.httpClient.get<PaginatedList<MessageResponse>>(
      `${this.apiUrl}/GetChats?SenderId=${getChatRequest.senderId}&ReceiverId=${getChatRequest.receiverId}&PageRequest.PageIndex=${getChatRequest.pageRequest.page}&PageRequest.PageSize=${getChatRequest.pageRequest.pageSize}`);
  }

  override deleteChat(deleteChatRequest:DeleteChatRequest): Observable<DeleteChatResponse>{
    return this.httpClient.post<DeleteChatResponse>(`${this.apiUrl}/DeleteChat`, deleteChatRequest);
  }

  override deleteMessage(id:number): Observable<DeleteMessageResponse>{
    return this.httpClient.delete<DeleteMessageResponse>(`${this.apiUrl}/DeleteMessage/${id}`);
  }
}
