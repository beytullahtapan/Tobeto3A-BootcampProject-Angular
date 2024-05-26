import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ChatUserResponse } from '../../models/responses/chat/chat-user-response';
import { MessageResponse } from '../../models/responses/chat/send-message-response';
import { SignalRBaseService } from '../abstracts/signalr-base.service';

@Injectable({
  providedIn: 'root'
})
export class ChatHubService extends SignalRBaseService{
  
  constructor() {
    super(`${environment.SIGNALR_URL}/ChatHub`); 
  }
  

  connect(userId: string) {
    this.startConnection().then(() => {
      this.invoke('Connect', userId);
    });
  }

  onUsers(callback: (res: ChatUserResponse) => void) {
    this.on('Users', callback);
  }

  onSendMessage(callback: (res: MessageResponse) => void) {
    this.on('SendMessage', callback);
  }
}
