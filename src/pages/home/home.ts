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
      this.categoryDataLists = data;
      this.categoryDataLists = this.categoryDataLists.data;
      for(var i=0; i < this.categoryDataLists.length; i++) {
        menuCategoryLists.push(this.categoryDataLists[i]);

        if(menuCategoryLists.length == 2){
          this.categoryDataListsWithArray.push(menuCategoryLists);
          menuCategoryLists = [];
        } 
        if (i == this.categoryDataLists.length - 1 ){
            if(this.categoryDataLists.length % 2 == 1) {
              var array = [];
              menuCategoryLists.push(array);
            }
            this.categoryDataListsWithArray.push(menuCategoryLists);
            menuCategoryLists = [];
        }
      }
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
