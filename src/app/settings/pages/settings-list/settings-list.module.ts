import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsListPageRoutingModule } from './settings-list-routing.module';

import { SettingsListPage } from './settings-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsListPageRoutingModule
  ],
  declarations: [SettingsListPage]
})
export class SettingsListPageModule {}
