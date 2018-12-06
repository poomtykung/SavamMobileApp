import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NewsDatailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news-datails',
  templateUrl: 'news-datails.html',
})
export class NewsDatailsPage {
  articleHeader:any;
  articleDetails:any;
  articleDate:any;
  articlePic:any;
  data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = navParams.get('data');
    this.articleHeader = this.data.news_header;
    this.articleDetails = this.data.news_detail;
    this.articleDate =this.data.news_date;
    this.articlePic = this.data.stpic;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsDatailsPage');
  }

}
