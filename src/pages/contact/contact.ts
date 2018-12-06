import { Component } from '@angular/core';
import { NavController, Config  } from 'ionic-angular';
import { ProfileConfigPage } from '../profile-config/profile-config';
import { ContactusPage } from '../contactus/contactus';
import { Modal, ModalController, ModalOptions } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  isNotificationShow: any;
  constructor(public navCtrl: NavController,public modalCtrl: ModalController, public config: Config, public androidPermissions: AndroidPermissions, public storage: Storage) {

  }
  ProfileConfig() {
    this.navCtrl.push(ProfileConfigPage);
  }
  ContactUs() {
    this.navCtrl.push(ContactusPage);
  }

  signoutButton() {
    this.config.set('tabsHideOnSubPages', false);
    this.storage.clear();
    this.navCtrl.push(WelcomePage);
  }

  enableNotification() {
    //TODO disable push notification
  }
}
