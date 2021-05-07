import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class PushService {
  private pushId;

  constructor(
    private oneSignal: OneSignal,
    private router: Router,
    private _ngZone: NgZone,
    private platform: Platform
  ) {}

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

    this.oneSignal.handleNotificationOpened().subscribe((push) => {
      console.log('Abierto', push);
      this._ngZone.run(() =>
        this.router.navigate([
          'tabs/orders',
          push.notification.payload.additionalData.orderId,
        ])
      );
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

  isCordova() {
    return this.platform.is('cordova');
  }
}
