import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { HttpClient } from '@angular/common/http';
import {RestaurantInformationPage} from '../restaurant-information/restaurant-information';
import { ResterantListsPage} from '../resterant-lists/resterant-lists';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  categoryDataLists: any;
  categoryDataListsWithArray: any;
  restaurantDataLists: any;
  constructor(public navCtrl: NavController, public http: HttpClient) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    var menuCategoryApiUrl = "http://savamapp.com/API/ListCategory";
    var menuCategoryLists = [];
    this.categoryDataListsWithArray = [];
    this.http.get(menuCategoryApiUrl).subscribe(data => {
      //TODO {"data":{"0":{"id_product_type":1,"product_type_name":"ขนมหวาน","stdel":0,"note":"ขนมหวานต่างๆ","stvis":0,"stpic":0},"1":{"id_product_type":2,"product_type_name":"อาหารไทย","stdel":0,"note":"อาหารไทยต่างๆ","stvis":0,"stpic":0}
      // JSON is valid please fixed on controller in backend
      this.categoryDataLists = data;
      this.categoryDataLists = this.categoryDataLists.data;
      var k = 0;
      for(var i=0; i < this.categoryDataLists.length; i++) {
        if(k==4){
          this.categoryDataListsWithArray.push(menuCategoryLists);
          menuCategoryLists = [];
          k =0;
          menuCategoryLists.push(this.categoryDataLists[i]);
        } else {
          menuCategoryLists.push(this.categoryDataLists[i]);
        }
        k++;
      }
      this.categoryDataListsWithArray.push(menuCategoryLists);
    });

    this.getResterantDataLists();
  }

  getResterantDataLists() {
    var resterantDatApiUrl = "http://savamapp.com/API/ListRestaurant";
    this.http.get(resterantDatApiUrl).subscribe(data => {
      this.restaurantDataLists = data;
      this.restaurantDataLists = this.restaurantDataLists.data;
    });
  }

  search(){
    this.navCtrl.push(SearchPage);
  }

  gotoRestaurantInfo(restaurantData){
      this.navCtrl.setRoot(RestaurantInformationPage, restaurantData);
  }

  gotoRestaurantListByCategory(id_product_type){
    this.navCtrl.push(ResterantListsPage, {
      data: id_product_type
    });
  } 
}
