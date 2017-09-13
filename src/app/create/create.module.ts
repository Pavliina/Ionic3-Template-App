import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from '../shared/shared.module';
import { CreatePage } from './create';

@NgModule({
  imports: [
    SharedModule,
    IonicPageModule.forChild(CreatePage)
  ],
  declarations: [
    CreatePage
  ],
  entryComponents: [
    CreatePage
  ]
})
export class CreatePageModule { }
