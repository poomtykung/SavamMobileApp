import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestaurantInformationPage } from './restaurant-information';

@NgModule({
  declarations: [
    RestaurantInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(RestaurantInformationPage),
  ],
})
export class RestaurantInformationPageModule {}
