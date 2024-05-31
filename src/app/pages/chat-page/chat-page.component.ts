import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AuthBaseService } from '../../features/services/abstracts/auth-base.service';
import { FormsModule } from '@angular/forms';
import { ChatHubService } from '../../features/services/concretes/chat-hub.service';
import { ChatUserResponse } from '../../features/models/responses/chat/chat-user-response';
import { MessageResponse } from '../../features/models/responses/chat/send-message-response';
import { SendMessageRequest } from '../../features/models/requests/chat/send-message-request';
import { ChatBaseService } from '../../features/services/abstracts/chat-base.service';
import { initFlowbite } from 'flowbite';
import { DeleteChatRequest } from '../../features/models/requests/chat/delete-chat-request';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../../features/components/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent implements OnInit{
  @ViewChild('chatHistory') chatHistory!: ElementRef;
  
  users: ChatUserResponse[] = [];
  chats: MessageResponse[] = [];
  selectedUserId: string = "";
  selectedUser: ChatUserResponse = {id:"", userName: "", firstName: "", lastName:"", email: ""};
  senderUser: ChatUserResponse = {id:"", userName: "", firstName: "", lastName:"", email: ""};

  message: string = "";  

  currentPage: number = 0;
  pageSize: number = 10;
  hasNextPage: boolean = true;
  isLoading: boolean = false;
  
  constructor(
    private chatService: ChatBaseService, 
    private chatHubService: ChatHubService, 
    private authService:AuthBaseService, 
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.senderUser.id = authService.getCurrentUserId();
  }

  ngOnInit(): void {
    initFlowbite();
    this.getChatUsers();
    this.initializeSignalR();
    this.checkForUserToAdd();
  }


  checkForUserToAdd() {
    this.route.queryParams.subscribe(params => {
      const userToAdd: ChatUserResponse = history.state.userToAdd;
      if (userToAdd) {
        this.addUserToChat(userToAdd);
      }
    });
  }

  addUserToChat(user: ChatUserResponse) {
    if (!this.users.some(u => u.id == user.id)) {
      this.users.push(user);
    }
    this.changeUser(user);
  }


  getChatUsers(){
    this.chatService.getChatUsers(this.senderUser.id).subscribe(res => {
      this.users = res.items;
    });
  }

  changeUser(user: ChatUserResponse){
    this.selectedUserId = user.id;
    this.selectedUser = user;
    this.currentPage = 0;
    this.hasNextPage = true;
    this.chats = [];
    this.loadChats();

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

  deleteChat(userId: string){
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      position: { top: '0', left: '0' },
      panelClass: 'no-padding-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const deleteChatRequest: DeleteChatRequest = {
          "senderId": this.senderUser.id,
          "receiverId": userId,
        }
    
        this.chatService.deleteChat(deleteChatRequest)
        .subscribe(() => {
          if (this.selectedUserId === userId) {
            this.chats = [];
          }
          this.users = this.users.filter(user => user.id !== userId);
        });;
      }
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

  loadChats(initialLoad: boolean = false) {
    if (this.isLoading || !this.hasNextPage) return;
    this.isLoading = true;

    const request = {
      senderId: this.senderUser.id,
      receiverId: this.selectedUserId,
      pageRequest: {
        page: this.currentPage,
        pageSize: this.pageSize
      }
    };

    this.chatService.getChats(request)
      .subscribe(res => {
        const previousScrollHeight = this.chatHistory.nativeElement.scrollHeight;
        this.chats = [...res.items.reverse(), ...this.chats];
        this.hasNextPage = res.hasNext;
        this.currentPage++;
        this.isLoading = false;

        if (initialLoad) {
          this.scrollToBottom();
        } else {
          setTimeout(() => {
            this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight - previousScrollHeight;
          });
        }
      }, () => {
        this.isLoading = false;
      });
  }

  onScroll(event: any): void {
    const element = event.target;
    if (element.scrollTop === 0 && this.hasNextPage && !this.isLoading) {
      this.loadChats();
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
    });
  }

  trackById(index: number, item: MessageResponse): string {
    return item.id;
  }
  
}
