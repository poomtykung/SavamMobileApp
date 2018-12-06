import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { NewsPage } from '../news/news';
import { SearchPage } from '../search/search';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = SearchPage;
  tab5Root = NewsPage;
  data: any;
  
  constructor( public viewCtrl: ViewController, public navParams: NavParams) {
    this.viewCtrl = this.navParams.get('viewCtrl');
    this.data = {
      viewCtrl: this.viewCtrl
    }
  }
}
