import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { NewsDatailsPage } from '../news-datails/news-datails';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  allArticleLists: any;
  atleastArticleLists = [];
  oldArticle: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
    //  http://savamapp.com/API/GetAllArticle
    //   http://savamapp.com/API/GetArticleDetail/{str_id_news}
    this.getAllArticle();
  }
  getAllArticle() {
    var getAllArticleApiUrl = "http://savamapp.com/API/GetAllArticle";
    this.http.get(getAllArticleApiUrl).subscribe(data => {
      this.allArticleLists = data;
      this.allArticleLists = this.allArticleLists.data;
      // this.atleastArticle = this.allArticleLists[0];
      this.atleastArticleLists.push(this.allArticleLists[0]);
      this.allArticleLists.splice(0, 1);
    });
  }

  gotoNewsDetails(article) {
    this.navCtrl.push(NewsDatailsPage, {
      data: article
    });
  }
}
