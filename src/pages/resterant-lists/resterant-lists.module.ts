import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResterantListsPage } from './resterant-lists';

@NgModule({
  declarations: [
    ResterantListsPage,
  ],
  imports: [
    IonicPageModule.forChild(ResterantListsPage),
  ],
})
export class ResterantListsPageModule {}
