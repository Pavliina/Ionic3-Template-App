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
  templateUrl: 'create.html'
})
export class CreatePage {

  public pets: PetModel[];
  public userProfile: UserModel;
  public uid: string = "";
  public pet: any = {
    "name": "",
    "animal": "",
    "owner": ""
  }
  

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
      this.pet.owner = this.uid;
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

  saveNnext() {
    this.db.add("pets", this.pet)
    this.pet = {
      "owner": this.uid
    };
    this.navCtrl.push("ListPage") 
  }
  
  }