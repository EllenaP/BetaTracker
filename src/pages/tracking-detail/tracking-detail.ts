import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, RequestOptions, Headers} from "@angular/http";
import 'rxjs/Rx';


@IonicPage()
@Component({
  selector: 'page-tracking-detail',
  templateUrl: 'tracking-detail.html',
})
export class TrackingDetailPage {

  trackdeet: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.trackdeet = navParams.data.trackdeet;

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingDetailPage');
  }

}
