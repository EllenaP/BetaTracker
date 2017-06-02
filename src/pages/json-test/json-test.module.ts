import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JsonTestPage } from './json-test';

@NgModule({
  declarations: [
    JsonTestPage,
  ],
  imports: [
    IonicPageModule.forChild(JsonTestPage),
  ],
  exports: [
    JsonTestPage
  ]
})
export class JsonTestPageModule {}
