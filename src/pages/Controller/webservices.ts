
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class Webservices {

    constructor(public storage: Storage, public http: HttpClient) {
    }
    updateUserInformation() {

        this.storage.get('username').then((username) => {
            this.storage.get('birthdate').then((birthdate) => {
                this.storage.get('email').then((email) => {
                    this.storage.get('password').then((password) => {
                        this.storage.get('fName').then((fName) => {
                            this.storage.get('lName').then((lName) => {
                                this.storage.get('tel').then((tel) => {
                                    var saveEditUser = "http://savamapp.com/API/SaveEditUser/"
                                        + username + "/" + password + "/" + fName + "/"
                                        + lName + "/" + email + "/" + tel + "/" + birthdate;
                                    this.http.get(saveEditUser).subscribe(isInsertUserSuccess => {
                                        if (isInsertUserSuccess == 1) {
                                        } else {
                                            alert("Register isn't Success");
                                        }
                                    }, err => {
                                        console.log(err);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
}