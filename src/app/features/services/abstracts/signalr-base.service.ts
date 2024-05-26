import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalR';


@Injectable()
export abstract class SignalRBaseService {
  protected hub: signalR.HubConnection | undefined;

  constructor(private hubUrl: string) {
    this.hub = new signalR.HubConnectionBuilder().withUrl(hubUrl).build();
  }

  startConnection(): Promise<void> {
    return this.hub!.start().then(() => {
      console.log('SignalR connection started');
    }).catch(err => {
      console.error('Error while starting SignalR connection: ', err);
    });
  }

  invoke(methodName: string, ...args: any[]): Promise<any> {
    return this.hub!.invoke(methodName, ...args);
  }

  on(methodName: string, newMethod: (...args: any[]) => void): void {
    this.hub!.on(methodName, newMethod);
  }

  stopConnection(): Promise<void> {
    return this.hub!.stop().then(() => {
      console.log('SignalR connection stopped');
    }).catch(err => {
      console.error('Error while stopping SignalR connection: ', err);
    });
  }

}
