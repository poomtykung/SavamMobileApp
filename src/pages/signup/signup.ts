import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
//import { analyzeAndValidateNgModules } from '@angular/compiler';
//import { getNonHydratedSegmentIfLinkAndUrlMatch } from 'ionic-angular/umd/navigation/url-serializer';
import { SigninPage } from '../signin/signin';
import {ImagePicker} from  '@ionic-native/image-picker';
<<<<<<< HEAD
import { Base64 } from '@ionic-native/base64';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
=======
>>>>>>> parent of 7cd4dd6... image base64
// import {Md5} from 'ts-md5/dist/md5';


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {

  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  savamAppURL = "http://savamapp.com/API/";
  public result: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public imagePicker:ImagePicker) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  getRegisterData() {
    if (typeof this.username !== 'undefined') {
      var usernameAPIUrl = this.savamAppURL + "SearchUser/" + this.username;
      return new Promise(resolve => {
        this.http.get(usernameAPIUrl).subscribe(isUsernameAlreadyExits => {

          if (isUsernameAlreadyExits == 0) {
            //TODO
            alert("Username is already exits");
          } else {
            if (typeof this.email !== 'undefined') {
              var emailAPIUrl = this.savamAppURL + "CheckEmail/" + this.email;

              if(this.validateEmail(this.email)) {
                this.http.get(emailAPIUrl).subscribe(isEmailAlreadyExits => {
                  if (isEmailAlreadyExits == 0) {
                    alert("Email is already exits");
                  } else {
                    if ((typeof this.password !== 'undefined') && (typeof this.confirmPassword !== 'undefined')) {
                      if (this.password == this.confirmPassword) {
                        var addUserAPIUrl = this.savamAppURL + "AddUser/" + this.username + "/" + this.password + "/null/" + this.email + "/null/2000-01-01";
                        this.http.get(addUserAPIUrl).subscribe(isInsertUserSuccess => {
                          if (isInsertUserSuccess == 1) {
                            alert("Register Success");
                            this.navCtrl.push(SigninPage);
                          } else {
                            alert("Register isn't Success");
                          }
                        }, err => {
                          console.log(err);
                        });
                      } else {
                        alert("Password not equal");
                      }
                    }
                  }
                }, err => {
                  console.log(err);
                });
              } else {
                alert("Email isn't valid");
              }
            }
          }
        }, err => {
          console.log(err);
        });
      });
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

<<<<<<< HEAD
  getPictures() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.baseImg = base64Image;

      /**insert to storage */
     }, (err) => {
        // Handle error
     });    
=======
  getPictures(){

    //TODO
    this.imagePicker.getPictures({
    }).then( results =>{
      console.log(results);
      for(let i=0; i < results.length;i++){
        console.log('Image URI: ' + results[i]);
      };
    }, (err) => { 

    });
>>>>>>> parent of 7cd4dd6... image base64
  }
}
