import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket) {}

  getConnection() {
    this.socket.on('connection', (resp) => {
      console.log(resp);
    });
    return this.socket.fromEvent('connection');
  }
}
