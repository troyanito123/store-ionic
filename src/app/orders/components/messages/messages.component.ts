import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SocketService } from 'src/app/shared/services/socket.service';
import { Message } from '../../interfaces/interfaces';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
  @Input() messages: Message[];
  @Input() orderId: number;
  @Input() delivered: boolean;
  @Input() userId: number;

  messageFiled = new FormControl('', [Validators.required]);

  constructor(
    private messageService: MessageService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.socketService
      .listen('message-created')
      .subscribe(({ message, orderId }) => {
        if (orderId === this.orderId) {
          this.messages.push(message);
        }
      });
  }

  sendMessage() {
    if (this.messageFiled.invalid) {
      this.messageFiled.markAllAsTouched();
      return;
    }
    this.messageService
      .sendMessage(this.messageFiled.value, this.orderId, this.userId)
      .subscribe((resp) => {
        if (resp) {
          this.messages.push(resp);
          this.messageFiled.reset();
        }
      });
  }
}
