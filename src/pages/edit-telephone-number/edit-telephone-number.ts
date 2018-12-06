import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProfileConfigPage } from '../profile-config/profile-config';
import { Webservices } from '../Controller/webservices';

/**
 * Generated class for the EditTelephoneNumberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-telephone-number',
  templateUrl: 'edit-telephone-number.html',
})
export class EditTelephoneNumberPage {
  telephoneNumber: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public webservices:Webservices) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditTelephoneNumberPage');
    this.getTelephoneNumberFromStorage();
  }

  saveButton(){
    this.storage.set("tel", this.telephoneNumber);
    this.webservices.updateUserInformation();
    this.navCtrl.setRoot(ProfileConfigPage);
  }

  getTelephoneNumberFromStorage(){
    this.storage.get('tel').then((telephoneNumber) => {
      this.telephoneNumber = telephoneNumber;
    });
  }
}
