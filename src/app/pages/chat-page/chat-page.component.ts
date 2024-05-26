import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthBaseService } from '../../features/services/abstracts/auth-base.service';
import { FormsModule } from '@angular/forms';
import { ChatHubService } from '../../features/services/concretes/chat-hub.service';
import { ChatUserResponse } from '../../features/models/responses/chat/chat-user-response';
import { MessageResponse } from '../../features/models/responses/chat/send-message-response';
import { SendMessageRequest } from '../../features/models/requests/chat/send-message-request';
import { GetChatRequest } from '../../features/models/requests/chat/get-chat-request';
import { ChatBaseService } from '../../features/services/abstracts/chat-base.service';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent implements OnInit{
  users: ChatUserResponse[] = [];
  chats: MessageResponse[] = [];
  selectedUserId: string = "";
  selectedUser: ChatUserResponse = {id:"", userName: "", firstName: "", lastName:"", email: ""};
  senderUser: ChatUserResponse = {id:"", userName: "", firstName: "", lastName:"", email: ""};

  message: string = "";  
  
  constructor(
    private chatService: ChatBaseService, 
    private chatHubService: ChatHubService, 
    private authService:AuthBaseService, 
  ) {
    this.senderUser.id = authService.getCurrentUserId();
  }

  ngOnInit(): void {
    this.getChatUsers();
    this.initializeSignalR();
  }


  getChatUsers(){
    this.chatService.getChatUsers(this.senderUser.id).subscribe(res => {
      this.users = res.items;
    });
  }

  changeUser(user: ChatUserResponse){
    this.selectedUserId = user.id;
    this.selectedUser = user;

    let userDto: GetChatRequest = {
      'senderId': this.senderUser.id,
      'receiverId': this.selectedUserId,
      'pageRequest': {
        page: 0, 
        pageSize: 10 
      }
    }

    this.chatService
    .getChats(userDto)
    .subscribe(res => {
      this.chats = res.items;
    });

  }

  sendMessage(){
    let messageDto: SendMessageRequest = {
      "senderId": this.senderUser.id,
      "receiverId": this.selectedUserId,
      "content": this.message
    }

    this.chatService
      .sendMessage(messageDto)
      .subscribe(res => {
        this.chats.push(res);
        this.message = '';
      });
  }

  private initializeSignalR() {
    this.chatHubService.connect(this.senderUser.id);

    this.chatHubService.onUsers(res => {
      console.log(res);
    });

    this.chatHubService.onSendMessage(res => {
      if (this.selectedUserId == res.senderId) {
        this.chats.push(res);
      }
    });
  }
  
}
