import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { SearchPage } from '../search/search';
import { HttpClient } from '@angular/common/http';


/**
 * Generated class for the RestaurantInformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-restaurant-information',
  templateUrl: 'restaurant-information.html',
})
export class RestaurantInformationPage {
  
  @ViewChild('map') mapElement: ElementRef;
  restaurant_name: any;
  lat: any;
  lng: any;
  map: any;
  district_name: any;
  telephone : any;
  pic_url : any;
  open_time: any;
  close_time: any;
  openTime:any
  restaurant_latitude:any;
  restaurant_longitude:any;
  id_restaurant: any;
  listDishDetailLists:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public geolocation: Geolocation, public viewCtrl: ViewController, public http: HttpClient) {
    this.restaurant_name = navParams.get('restaurant_name');
    this.district_name = navParams.get('district_name');
    this.telephone = navParams.get('telephone');
    this.pic_url = navParams.get('pic_url');
    this.open_time = navParams.get('open_time');
    this.close_time = navParams.get('close_time');
    this.openTime = "เปิด " + this.open_time + " - " + this.close_time;
    this.restaurant_latitude = navParams.get('restaurant_latitude');
    this.restaurant_longitude = navParams.get('restaurant_longitude');
    this.id_restaurant = navParams.get('id_restaurant');
  }

  backButton() {
     this.navCtrl.setRoot(SearchPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantInformationPage');
    this.loadMap();
    this.getListDishDetail(this.id_restaurant);   
  }

  loadMap() {


    let latLng = new google.maps.LatLng(this.restaurant_latitude, this.restaurant_longitude);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    //TODO Add current position with blue marker
    this.addMarker(this.restaurant_latitude, this.restaurant_longitude);
  }

  addMarker(latitude, longitude) {
    var marker;

      marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: this.map
      });
  }

  getListDishDetail(id_restaurant) {
   var listDishDetailApiUrl = "http://savamapp.com/API/ListDishDetail/" + id_restaurant;
   var foddImageUrl = "http://savamapp.com/storage/dishdetail/";

   this.http.get(listDishDetailApiUrl).subscribe(data => {
    this.listDishDetailLists = data;
    this.listDishDetailLists = this.listDishDetailLists.data;
    

    var resterantLocationLists = [];
    for (var k = 0; k < this.listDishDetailLists.length; k++) {
      var resterantDatas = [];
      resterantDatas.push(this.listDishDetailLists[k].product_name);
      resterantDatas.push(this.listDishDetailLists[k].product_price);
      resterantDatas.push(foddImageUrl+this.listDishDetailLists[k].id_product+".jpg");
      resterantLocationLists.push(resterantDatas);
    }

    this.listDishDetailLists  = resterantLocationLists;
  });
  }
}
