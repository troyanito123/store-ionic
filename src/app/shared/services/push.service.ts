import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root',
})
export class PushService {
  private pushId;
  constructor(private oneSignal: OneSignal) {}

  initialize() {
    this.oneSignal.startInit(
      'b069b4ab-7188-47f9-8dd0-425331b325f9',
      '354099948826'
    );

    this.oneSignal.inFocusDisplaying(
      this.oneSignal.OSInFocusDisplayOption.Notification
    );

    this.oneSignal.handleNotificationReceived().subscribe((notification) => {
      console.log('Recivido', notification);
    });

    this.oneSignal.handleNotificationOpened().subscribe((notification) => {
      console.log('Abierto', notification);
    });

    this.oneSignal.getIds().then((info) => {
      this.pushId = info.userId;
      localStorage.setItem('pushId', this.pushId);
    });

    this.oneSignal.endInit();
  }

  getPushId() {
    return this.oneSignal.getIds();
  }
}
