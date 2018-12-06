import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProfileConfigPage } from '../profile-config/profile-config';
import { Webservices } from '../Controller/webservices';

/**
 * Generated class for the EditPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-password',
  templateUrl: 'edit-password.html',
})
export class EditPasswordPage {
  oldPassword: any;
  newPassword: any;
  confirmPassword: any;
  currentPassword: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public webservices:Webservices) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPasswordPage');
  }

  saveButton() {
    this.storage.get('password').then((currentPassword) => {
      this.currentPassword = currentPassword;
      if (this.currentPassword == this.oldPassword) {
        if (this.newPassword == this.confirmPassword) {
          this.storage.set("password", this.newPassword);
          this.webservices.updateUserInformation();
          this.navCtrl.setRoot(ProfileConfigPage);
        } else {
          alert("รหัสผ่านไม่ตรงกัน");
        }
      } else {
        alert("รหัสผ่านไม่ตรงกัน");
      }
    });

  }
}
