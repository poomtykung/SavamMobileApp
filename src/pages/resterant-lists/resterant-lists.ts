import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {RestaurantInformationPage} from '../restaurant-information/restaurant-information';

/**
 * Generated class for the ResterantListsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resterant-lists',
  templateUrl: 'resterant-lists.html',
})
export class ResterantListsPage {
  id_product_type:any;
  productDataLists: any;
  restuarantData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.id_product_type = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResterantListsPage');
    this.getRestaurantLists(this.id_product_type);
  }

  getRestaurantLists(id_product_type) {
   var restaurantListsApiUrl = "http://savamapp.com/API/ListDishDetailByType/" + id_product_type;
    this.http.get(restaurantListsApiUrl).subscribe(data => {
      this.productDataLists = data;
      this.productDataLists =  this.productDataLists.data;
    });
  }

  gotoRestaurantInformation(id_restaurant){
    var restaurantDataApiUrl = "http://savamapp.com/API/SearchRestaurantByDish/" + id_restaurant;
    this.http.get(restaurantDataApiUrl).subscribe(data => {
      this.restuarantData = data;
      this.restuarantData =  this.restuarantData.data;
      this.navCtrl.setRoot(RestaurantInformationPage, this.restuarantData);
    });
  }
}
