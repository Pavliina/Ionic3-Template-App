import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from '../shared/shared.module';
import { SeznamPage } from './seznam';

@NgModule({
  imports: [
    SharedModule,
    IonicPageModule.forChild(SeznamPage)
  ],
  declarations: [
    SeznamPage
  ],
  entryComponents: [
    SeznamPage
  ]
})
export class SeznamPageModule { }
