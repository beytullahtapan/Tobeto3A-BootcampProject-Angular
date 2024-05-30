import { Injectable } from '@angular/core';
import { PaginatedList } from '../../../core/models/paginated-list';
import { SendMessageRequest } from '../../models/requests/chat/send-message-request';
import { Observable } from 'rxjs';
import { MessageResponse } from '../../models/responses/chat/send-message-response';
import { ChatUserResponse } from '../../models/responses/chat/chat-user-response';
import { GetChatRequest } from '../../models/requests/chat/get-chat-request';
import { DeleteChatRequest } from '../../models/requests/chat/delete-chat-request';
import { DeleteChatResponse } from '../../models/responses/chat/delete-chat-response';
import { DeleteMessageResponse } from '../../models/responses/chat/delete-message-response';

@Injectable()
export abstract class ChatBaseService {

  abstract sendMessage(sendMessageRequest: SendMessageRequest): Observable<MessageResponse>;

  abstract getChatUsers(userId: string): Observable<PaginatedList<ChatUserResponse>>;

  abstract getChats(getChatRequest:GetChatRequest): Observable<PaginatedList<MessageResponse>>;

  abstract deleteChat(deleteChatRequest:DeleteChatRequest): Observable<DeleteChatResponse>;

  abstract deleteMessage(id:number): Observable<DeleteMessageResponse>;
}
