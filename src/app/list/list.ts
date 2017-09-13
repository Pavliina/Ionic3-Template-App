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
  templateUrl: 'list.html'
})
export class ListPage {

  public pets: PetModel[] = [
    {
      name: "Fido",
      animal: "pes",
      age: 10
    }
  ];
  public userProfile: UserModel;
  public uid: string = "";
  public pet: any = {
    "name": "",
    "animal": "",
    "age": 0
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
    });
    /*this.tasks = this.db.listAll(Config.firebase_tables.Tasks, {
      orderByChild: "deadline"
    }).map(
      tasks => tasks.filter(
        task => task.user == this.uid
      )
    ) as FirebaseListObservable<any[]>;*/
  }

  saveNnext() {
    this.pets.push(this.pet);
    this.pet = {};
    this.navCtrl.push("list_2.html") 
  }
  
  }