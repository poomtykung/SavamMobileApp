import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams, } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient } from '@angular/common/http';
import {RestaurantInformationPage} from '../restaurant-information/restaurant-information';
import { AssertNotNull } from '@angular/compiler';
import { HomePage } from '../home/home';


/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  lat: any;
  lng: any;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  restaurantDataLists: any;
  restaurantName: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, private platform: Platform, public http: HttpClient) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    this.getResterantDataLists();

  }

  getResterantDataLists() {
    var resterantDatApiUrl = "http://savamapp.com/API/ListRestaurant";
    this.http.get(resterantDatApiUrl).subscribe(data => {
      this.restaurantDataLists = data;
      this.restaurantDataLists = this.restaurantDataLists.data;
      this.loadMap(this.restaurantDataLists);
    });
  }


  loadMap(restaurantDataLists) {

    if (this.platform.is('core')) {
      this.lat = -34.9290;
      this.lng = 138.6010;
    } else if (this.platform.is('android')) {
      //TODO : fixed Geolocation is slower load
      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
      }).catch((error) => {
        console.log('Error getting location', error);
      });

      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        this.lat = data.coords.latitude;
        this.lng = data.coords.longitude;
      });
    }

    this.setMapCenter(18.8080992, 98.9773775);
    //TODO Add current position with blue marker
    this.addMarker(restaurantDataLists);

  }

  setMapCenter(lat, lng){
    let latLng = new google.maps.LatLng(lat, lng);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

  addMarker(restaurantDataLists) {
    var restaurantLocationLists = [];
    for (var k = 0; k < restaurantDataLists.length; k++) {
      var resterantDatas = [];
      resterantDatas.push(restaurantDataLists[k].restaurant_name);
      resterantDatas.push(restaurantDataLists[k].restaurant_latitude);
      resterantDatas.push(restaurantDataLists[k].restaurant_longitude);
      resterantDatas.push(restaurantDataLists[k]);
      restaurantLocationLists.push(resterantDatas);
    }

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < restaurantLocationLists.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(restaurantLocationLists[i][1], restaurantLocationLists[i][2]),
        map: this.map
      });

      let content = this.createContentMarker(restaurantLocationLists[i][0], i);
      this.addEventListenerToMarker(this.navCtrl, marker, i, infowindow, content, restaurantLocationLists[i][3]);
    }
  }

  addEventListenerToMarker(navCtrl, marker, i, infowindow, content, restuarantData) {
    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {

        infowindow.setContent(content);
        google.maps.event.addListenerOnce(infowindow, 'domready', () => {
          var goButtonElement = document.getElementById('goButton');
          var goButtonValue = (<HTMLInputElement>goButtonElement).value;
          goButtonElement.addEventListener('click', () => {
            navCtrl.setRoot(RestaurantInformationPage, restuarantData);
          });
        });
        infowindow.open(this.map, marker);
      }
    })(marker, i));
  }

  createContentMarker(resterantName, resterantId) {
    let distance = "0,4 km";
    let city = "ทองหล่อ";

    let content =
      "<div>" +
      "<div class=\"info-window\">" +
      "<img src=\"assets/imgs/03-News/pic-news3.png\" class=\"contentMarkerImage\">" +
      "</div>" +
      "<div class=\"contentTextMarker\">"
      + resterantName +
      "</div>" +
      "<div style=\"display:table;width: 100%;\">" +
      "<div style=\"text-align: center;\">" + "<img src=\"assets/icon/mappin.png\" style=\"width: 14px;\">" +
      "<label style=\"margin-right: 10px; margin-left: 3px;\">" + city + "</label>" + "<label>" + distance + "</label>" + "</div>" +
      "</div>" +
      "<div class=\"buttonInMarker\">" +
      "<button id=\"goButton\" class=\"button\" value=\"" + resterantId + "\">ดูต่อ</button>" +
      "</div>" +
      "</div>";
    return content;
  }

  searchButton(){
    if(this.restaurantName == undefined || this.restaurantName == ""){
      this.getResterantDataLists();
    } else {
      //TODO Implement input is name of restaurant or name of location
      var resterantDatApiUrl = "http://savamapp.com/API/SearchRestaurant/" + this.restaurantName;
      this.http.get(resterantDatApiUrl).subscribe(data => {
        this.restaurantDataLists = data;
        this.restaurantDataLists = this.restaurantDataLists.data;
  
        this.setMapCenter(this.restaurantDataLists[0].restaurant_latitude, this.restaurantDataLists[0].restaurant_longitude);
       //TODO
       this.addMarker(this.restaurantDataLists);
      });
    }
  }

  cancleButton(){
    this.navCtrl.setRoot(HomePage);
  }
}
