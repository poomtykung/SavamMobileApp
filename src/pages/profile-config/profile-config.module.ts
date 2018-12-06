import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileConfigPage } from './profile-config';

@NgModule({
  declarations: [
    ProfileConfigPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileConfigPage),
  ],
})
export class ProfileConfigPageModule {}
