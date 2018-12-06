import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { getNonHydratedSegmentIfLinkAndUrlMatch } from 'ionic-angular/umd/navigation/url-serializer';
import { EditBirthdatePage } from '../edit-birthdate/edit-birthdate';
import { EditNamePage } from '../edit-name/edit-name';
import { EditPasswordPage } from '../edit-password/edit-password';
import { EditTelephoneNumberPage } from '../edit-telephone-number/edit-telephone-number';

/**
 * Generated class for the ProfileConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-config',
  templateUrl: 'profile-config.html',
})
export class ProfileConfigPage {
  name: any;
  email: any;
  tel: any;
  birthDate: any;
  fName: any;
  lName: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileConfigPage');

    // http://savamapp.com/API/UserDetail/{str_username}
    // http://savamapp.com/API/SaveEditUser/{str_username}/{str_password}/{str_fnameuser}/{str_lnameuser}/{str_email}/{str_tel}/{str_birthdate}
    this.getNameFromStorage();
    this.getEmailFromStorage();
    this.getTelFromStorage();
    this.getBirthDateFromStorage();
  }

  getNameFromStorage() {
    this.storage.get('fName').then((fName) => {
      this.storage.get('lName').then((lName) => {
        if (fName == null || fName == "null" ||
        lName == null || lName == "null") {
        fName = "";
        lName = "";
      }
  
      if (fName == "" && lName == "") {
        lName = "ไม่มีข้อมูล";
      }
  
      this.name = fName + " " + lName;
      });
    });
  }

  getEmailFromStorage() {
    this.storage.get('email').then((email) => {
      this.email = email;
    });
  }

  getTelFromStorage() {
    this.storage.get('tel').then((tel) => {
      this.tel = tel;
      if (this.tel == null || this.tel == "null") {
        this.tel = "ไม่มีข้อมูล";
      }
    });
  }

  getBirthDateFromStorage() {
    this.storage.get('birthDate').then((birthDate) => {
      this.birthDate = birthDate;
    });
  }

  gotoEditName() {
    this.navCtrl.push(EditNamePage);
  }
  gotoEditPassword() {
    this.navCtrl.push(EditPasswordPage);
  }
  gotoEditTelephoneNumber() {
    this.navCtrl.push(EditTelephoneNumberPage);
  }
  gotoBirthdate() {
    this.navCtrl.push(EditBirthdatePage);
  }
}
