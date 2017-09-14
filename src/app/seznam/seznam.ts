import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

import { DataService } from '../core/data.service';
import { AuthService } from '../core/auth.service';
import { UserModel } from '../core/user.model'
import { PetModel } from '../core/pet.model'
import { Config } from '../env.constants'

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'seznam.html'
})
export class SeznamPage {

  public pets: PetModel[];
  public userProfile: UserModel;
  public uid: string = "";
  

  constructor(
    public navCtrl: NavController, 
    public db: DataService,
    public authService: AuthService,
    private alertCtrl: AlertController
  ) {
    
  }

  ionViewDidLoad() {
    this.authService.getFullProfile().subscribe((user) => {
      this.userProfile = user;
      this.uid = user.uid;
    });
    this.db.listAll("pets", {
      orderByChild: "name"
    }).map(
      pets => pets.filter(
        pet => pet.owner == this.uid
      )
    ).subscribe((pets) => {
      this.pets = pets;
    })
  }
  
  addTask() {
    this.navCtrl.push("CreatePage")
  }

  logout() {
    this.authService.signOut().then(() => this.navCtrl.setRoot('AuthPage'));
  }
  
}