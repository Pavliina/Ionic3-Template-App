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
    let alert = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'deadline',
          placeholder: 'Deadline',
          type: 'date'
        },
        {
          name: 'priority',
          placeholder: 'Priority',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {}
        },
        {
          text: 'Save',
          handler: data => {
            this.db.add(Config.firebase_tables.Tasks, {
              title: data.title,
              user: this.userProfile.uid,
              deadline: data.deadline,
              priority: data.priority,
              done: false
            })
          }
        }
      ]
    });
    alert.present();
  }
  }