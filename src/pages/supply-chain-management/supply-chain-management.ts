import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";

/**
 * Generated class for the SupplyChainManagementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-supply-chain-management',
  templateUrl: 'supply-chain-management.html',
  providers: [ApiProvider]
})
export class SupplyChainManagementPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, apiInject: ApiProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupplyChainManagementPage');
  }



}
