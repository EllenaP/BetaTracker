import { Component } from '@angular/core';
import {TrackingHomePage} from "../tracking-home/tracking-home";
import {SupplyChainManagementPage} from "../supply-chain-management/supply-chain-management";
import {ContactPage} from "../contact/contact";
import {JsonTestPage} from "../json-test/json-test";
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {
  trackingHomePage: any  = TrackingHomePage;
  supplyChainManagementPage: any  = SupplyChainManagementPage;
  contactPage: any  = ContactPage;
  jsonTestPage: any  = JsonTestPage;
  myIndex: any = 0;

  constructor(navParams: NavParams) {
    // set the default index to 0, the first tab
    this.myIndex = 0;
    if (navParams.data.index) this.myIndex = navParams.data.index;
  }

}
