import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {ContactPage} from "../pages/contact/contact";
import {JsonTestPage} from "../pages/json-test/json-test";
import {SupplyChainManagementPage} from "../pages/supply-chain-management/supply-chain-management";
import {TabsPage} from "../pages/tabs/tabs";
import {TrackingDetailPage} from "../pages/tracking-detail/tracking-detail";
import {TrackingHomePage} from "../pages/tracking-home/tracking-home";
import {HttpModule} from "@angular/http";
import { AppConfig }    from '../config/app.config';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    JsonTestPage,
    SupplyChainManagementPage,
    TabsPage,
    TrackingDetailPage,
    TrackingHomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    JsonTestPage,
    SupplyChainManagementPage,
    TabsPage,
    TrackingDetailPage,
    TrackingHomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpModule,
    AppConfig,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
