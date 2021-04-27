import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { PushService } from './shared/services/push.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private pushService: PushService) {
    this.pushService.initialize();
  }
}
