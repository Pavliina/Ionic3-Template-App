import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

import { DataService } from '../core/data.service';
import { AuthService } from '../core/auth.service';
import { UserModel } from '../core/user.model'
import { CategoryModel } from '../core/pet.model'
import { Config } from '../env.constants'

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  public categories: CategoryModel[] = [
    {
      Feeding: true,
      Walk: false,
      Game: true,
      Vet: true,
      Medicaments: false,
      Sweets: false,
    }
  ];
  public userProfile: UserModel;
  public uid: string = "";
  public category: any = {
    "feeding": "",
    "walk": "",
    "game": "",
    "vet":"",
    "medicaments":"",
    "sweets":"", 
    "petId":""
   }
  

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public db: DataService,
    public authService: AuthService,
    private alertCtrl: AlertController
  ) {
    
  }

  ionViewDidLoad() {
    this.authService.getFullProfile().subscribe((user) => {
      this.userProfile = user;
      this.uid = user.uid;
      this.category.petId = this.navParams.get("pet");
    });
  }

  save() {
    this.categories.push(this.category);
    this.db.add("categories", this.category);
    this.category = {}
  }
  
  }