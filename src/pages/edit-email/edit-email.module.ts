import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditEmailPage } from './edit-email';

@NgModule({
  declarations: [
    EditEmailPage,
  ],
  imports: [
    IonicPageModule.forChild(EditEmailPage),
  ],
})
export class EditEmailPageModule {}
