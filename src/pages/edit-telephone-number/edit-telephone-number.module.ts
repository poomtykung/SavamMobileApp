import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditTelephoneNumberPage } from './edit-telephone-number';

@NgModule({
  declarations: [
    EditTelephoneNumberPage,
  ],
  imports: [
    IonicPageModule.forChild(EditTelephoneNumberPage),
  ],
})
export class EditTelephoneNumberPageModule {}
