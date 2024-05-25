import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthBaseService } from '../../features/services/abstracts/auth-base.service';
import { PaginatedList } from '../../core/models/paginated-list';
import { LocalStorageService } from '../../features/services/concretes/local-storage.service';
import { FormsModule } from '@angular/forms';
import * as signalR from '@microsoft/signalR'

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss'
})
export class ChatPageComponent {
  users: ChatUserModel[] = [];
  chats: MessageModel[] = [];
  selectedUserId: string = "";
  selectedUser: ChatUserModel = new ChatUserModel();
  senderUser = new ChatUserModel();

  message: string = "";  

  hub: signalR.HubConnection | undefined;
  

  private readonly apiUrl:string = `${environment.API_URL}/Chats`;
  constructor(private httpClient: HttpClient, private authService: AuthBaseService, private storageService: LocalStorageService) {
    this.senderUser.id = authService.getCurrentUserId();
    this.getChatUsers();


    this.hub = new signalR.HubConnectionBuilder().withUrl("http://localhost:60805/Hubs/ChatHub").build();


    this.hub.start().then(()=> {
      console.log("Connection is started...");  
      
      this.hub?.invoke("Connect", this.senderUser.id);

      this.hub?.on("Users", (res:ChatUserModel) => {
        console.log(res);    
      });

      this.hub?.on("SendMessage",(res:MessageModel)=> {
        //this.hub?.on("ChatChannel",(res:MessageModel)=> {
        console.log(res);        
        
        if(this.selectedUserId == res.senderId){
          this.chats.push(res);
        }
      })
    })

   }


  getChatUsers(){

    const authToken = 'Bearer ' + this.storageService.getToken();
    const headers = new HttpHeaders().set('Authorization', authToken);


    this.httpClient.get<PaginatedList<ChatUserModel>>(`${this.apiUrl}/GetChatHistory?UserId=${this.senderUser.id}`, {headers})
    .subscribe(res => {
      this.users = res.items;
    })
  }

  changeUser(user: ChatUserModel){
    this.selectedUserId = user.id;
    this.selectedUser = user;


    const authToken = 'Bearer ' + this.storageService.getToken();
    const headers = new HttpHeaders().set('Authorization', authToken);

    this.httpClient.get<PaginatedList<MessageModel>>(
      `${this.apiUrl}/GetChats?SenderId=${this.senderUser.id}&ReceiverId=${this.selectedUserId}&PageRequest.PageIndex=0&PageRequest.PageSize=10`,{ headers })
    .subscribe((res:any)=>{
      this.chats = res.items;
    });

  }

  sendMessage(){
    const data= {
      "senderId": this.senderUser.id,
      "receiverId": this.selectedUserId,
      "content": this.message
    }
    console.log(data);

    const authToken = 'Bearer ' + this.storageService.getToken();
    const headers = new HttpHeaders().set('Authorization', authToken);

    this.httpClient.post<MessageModel>(`${this.apiUrl}/SendMessage`, data, {headers}).subscribe(
      (res)=> {
        this.chats.push(res);
        this.message = "";
      }
    );

  }

}


export class ChatUserModel{
  id:string = "";
  userName: string = "";
  firstName: string = "";
  lastName: string = "";
  email: string = "";
}

export interface MessageModel{
  id: string;
  senderId: string ;
  receiverId: string ;
  createdDate: Date ;
  content: string ;
  isRead: boolean;
}