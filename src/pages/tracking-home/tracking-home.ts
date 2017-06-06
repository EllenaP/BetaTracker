import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {JsonTestPage} from "../json-test/json-test";

@IonicPage()
@Component({
  selector: 'page-tracking-home',
  templateUrl: 'tracking-home.html',
})
export class TrackingHomePage {


  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingHomePage');
  }

  onSchedule() {
    this.navCtrl.push(JsonTestPage);
  }

}
