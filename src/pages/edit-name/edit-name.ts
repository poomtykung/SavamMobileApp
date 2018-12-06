import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProfileConfigPage } from '../profile-config/profile-config';
import { HttpClient } from '@angular/common/http';
import { Webservices } from '../Controller/webservices';

/**
 * Generated class for the EditNamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-name',
  templateUrl: 'edit-name.html',
})
export class EditNamePage {
  name: any;
  fName: any;
  lName: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public http: HttpClient, public webservices:Webservices) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditNamePage');
    this.getNameFromStorage();
    var goButtonElement = document.getElementById('firstName');
    (<HTMLInputElement>goButtonElement).value = "My value";
  }

  getNameFromStorage() {

    this.storage.get('fName').then((fName) => {
      this.fName = fName;
    });
    this.storage.get('lName').then((lName) => {
      this.lName = lName;
    });

    if (this.fName == null || this.fName == "null" ||
      this.lName == null || this.lName == "null") {
      this.fName = "";
      this.lName = "";
    }

    if (this.fName == "" && this.lName == "") {
      this.lName = "ไม่มีข้อมูล";
      this.fName = "ไม่มีข้อมูล";
    }
  }

  saveButton() {
    this.storage.set("fName", this.fName);
    this.storage.set("lName", this.lName);
    this.webservices.updateUserInformation();
    this.navCtrl.setRoot(ProfileConfigPage);
  }
}
