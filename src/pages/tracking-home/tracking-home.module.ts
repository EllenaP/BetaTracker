import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackingHomePage } from './tracking-home';

@NgModule({
  declarations: [
    TrackingHomePage,
  ],
  imports: [
    IonicPageModule.forChild(TrackingHomePage),
  ],
  exports: [
    TrackingHomePage
  ]
})
export class TrackingHomePageModule {}
