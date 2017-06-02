import { Component } from '@angular/core';
import {TrackingHomePage} from "../tracking-home/tracking-home";
import {SupplyChainManagementPage} from "../supply-chain-management/supply-chain-management";
import {ContactPage} from "../contact/contact";
import {JsonTestPage} from "../json-test/json-test";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  trackingHomePage = TrackingHomePage;
  supplyChainManagementPage = SupplyChainManagementPage;
  contactPage = ContactPage;
  jsonTestPage = JsonTestPage;

}
