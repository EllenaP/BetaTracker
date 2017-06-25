import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import {SupplyChainManagementPage} from "../pages/supply-chain-management/supply-chain-management";
import {ContactPage} from "../pages/contact/contact";
import {JsonTestPage} from "../pages/json-test/json-test";
import { AppConfig } from '../config/app.config';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') nav: NavController;

  rootPage = TabsPage;

  pages: Array<{ title: string, component: any, index: number }>;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public menuCtrl: MenuController,
              public appConfig: AppConfig
              ) {


    console.log('AppConfig', this.appConfig);

    this.pages = [
      {title: 'Tracking', component: TabsPage, index: 0},
      {title: 'Supply Chain Management', component: TabsPage, index: 1},
      {title: 'Contact', component: TabsPage, index: 2},
      {title: 'JSON', component: TabsPage, index: 3}
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component, {index: page.index});
  }
}


