import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import {SupplyChainManagementPage} from "../pages/supply-chain-management/supply-chain-management";
import {ContactPage} from "../pages/contact/contact";
import {JsonTestPage} from "../pages/json-test/json-test";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  // tabsPage = TabsPage;
  supplyChainManagementPage = SupplyChainManagementPage;
  contactPage = ContactPage;
  jsonPage = JsonTestPage;
  @ViewChild('nav') nav: NavController;

  rootPage = TabsPage;

  pages: Array<{ title: string, component: any }>;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public menuCtrl: MenuController
              ) {


    this.pages = [
      {title: 'Tracking', component: TabsPage},
      {title: 'Supply Chain Management', component: SupplyChainManagementPage},
      {title: 'Contact', component: ContactPage},
      {title: 'JSON', component: JsonTestPage}
    ];


    // openPage(page)
    // {
    //   this.nav.setRoot(page.component);
    // }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page) {
    this.nav.setRoot(page.component);
    this.menuCtrl.close()
  }
}


