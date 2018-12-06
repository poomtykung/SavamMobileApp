import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsDatailsPage } from './news-datails';

@NgModule({
  declarations: [
    NewsDatailsPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsDatailsPage),
  ],
})
export class NewsDatailsPageModule {}
