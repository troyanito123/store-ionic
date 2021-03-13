import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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

  messageFiled = new FormControl('', [Validators.required]);

  constructor(private messageService: MessageService) {}

  ngOnInit() {}

  sendMessage() {
    if (this.messageFiled.invalid) {
      this.messageFiled.markAllAsTouched();
      return;
    }
    this.messageService
      .sendMessage(this.messageFiled.value, this.orderId)
      .subscribe((resp) => {
        if (resp) {
          this.messages.push(resp);
          this.messageFiled.reset();
        }
      });
  }
}
