import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ContactusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class ContactusPage {
  contactusDetails: any;
  contact_name: any;
  contact_address: any;
  contact_open_time: any;
  contact_close_time: any;
  contact_tel: any;
  contact_email: any;
  contact_code: any;
  contact_website: any;
  contact_facebook: any;
  contact_homephone: any;
  province_name: any;
  amphur_name: any;
  district_name: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactusPage');
    this.getContactusDetails();
  }

  getContactusDetails() {
    var ContactUsDetailApiUrl = "http://savamapp.com/API/ContactUsDetail";
    this.http.get(ContactUsDetailApiUrl).subscribe(data => {
      this.contactusDetails = data;
      this.contactusDetails = this.contactusDetails.data
      this.contact_name = this.contactusDetails.contact_name;
      this.contact_address = this.contactusDetails.contact_address;
      this.contact_open_time = this.contactusDetails.contact_open_time;
      this.contact_close_time = this.contactusDetails.contact_close_time;
      this.contact_tel = this.contactusDetails.contact_tel;
      this.contact_email = this.contactusDetails.contact_email;
      this.contact_website = this.contactusDetails.contact_website;
      this.contact_facebook = this.contactusDetails.contact_facebook;
      this.contact_homephone = this.contactusDetails.contact_homephone;
      this.province_name = this.contactusDetails.province_name;
      this.amphur_name = this.contactusDetails.amphur_name;
      this.district_name = this.contactusDetails.district_name;
    });
  }
}
