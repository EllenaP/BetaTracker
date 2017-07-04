import { Component, ViewChild } from '@angular/core';

import { AlertController, App, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { SessionDetailPage } from '../session-detail/session-detail';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import {Http, RequestOptions, Headers} from "@angular/http";
import {AppConfig} from "../../config/app.config";


@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  thumbnails: {
    'awaiting_collection': string;
    'container_loaded': string;
    'arrived_port': string;
    'vessel_departed': string;
    'vessel_loaded': string;
    'vessel_change': string;
    'vessel_arrived': string;
    'vessel_unloaded': string;
    'departed_port': string;
    'delivered': string;
    'eta_changed': string;
  };

  bookingImages: {
    'awaiting_collection': string;
    'container_loaded': string;
    'arrived_port': string;
    'vessel_departed': string;
    'vessel_loaded': string;
    'vessel_change': string;
    'vessel_arrived': string;
    'vessel_unloaded': string;
    'departed_port': string;
    'delivered': string;
    'eta_changed': string;
  };

  apiResponse: any;
  // bookerResponse: any;
  // response: any;
  options: RequestOptions;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public confData: ConferenceData,
    public user: UserData,
    public http: Http,
    public appConfig: AppConfig
  ) {

    this.thumbnails = {
      'awaiting_collection': 'assets/img/awaiting_collection.png',
      'container_loaded': 'assets/img/container_loaded.png',
      'arrived_port': 'assets/img/arrived_port.png',
      'vessel_departed': 'assets/img/vessel_departed.png',
      'vessel_loaded': 'assets/img/vessel_loaded.png',
      'vessel_change': 'assets/img/vessel_change.png',
      'vessel_arrived': 'assets/img/vessel_arrived.png',
      'vessel_unloaded': 'assets/img/vessel_unloaded.png',
      'departed_port': 'assets/img/departed_port.png',
      'delivered': 'assets/img/delivered.png',
      'eta_changed': 'assets/img/eta_changed.png',
    };

    this.bookingImages = {
      'awaiting_collection': 'assets/img/awaiting_collection.png',
      'container_loaded': 'assets/img/container_loaded.png',
      'arrived_port': 'assets/img/arrived_port.png',
      'vessel_departed': 'assets/img/vessel_departed.png',
      'vessel_loaded': 'assets/img/vessel_loaded.png',
      'vessel_change': 'assets/img/vessel_change.png',
      'vessel_arrived': 'assets/img/vessel_arrived.png',
      'vessel_unloaded': 'assets/img/vessel_unloaded.png',
      'departed_port': 'assets/img/departed_port.png',
      'delivered': 'assets/img/delivered.png',
      'eta_changed': 'assets/img/eta_changed.png',
    };

    // this.response = {
    //   'equipment_type': {},
    //   //figure out objects inside objects
    //   'dates': {}
    // };
    //
    // this.bookerResponse = {
    //   'data': []
    // };

    this.apiResponse = {
      'data': []
    };

    this.http = http

    var headers = new Headers();
    this.options = new RequestOptions ({headers: headers});

    headers.append('X-ApiKey', '1576636c3554584ab5a92497d11358b9ae');

    // this.getTimeline().subscribe(
    //     (data) => {
    //       console.log('tracker', data)
    //       this.response = data
    //     },
    //     (err) =>  console.log(err),
    //     () => { console.log("tracker success")  }
    // );
    //
    // this.getCarrierBooking().subscribe(
    //     (data) => {
    //       console.log('CarrierBooking', data)
    //       this.bookerResponse = data
    //     },
    //     (err) =>  console.log(err),
    //     () => { console.log("booker success")  }
    // );

    this.getApiTestURL().subscribe(
        (data) => {
          console.log('API test', data)
          this.apiResponse = data
        },
        (err) =>  console.log(err),
        () => { console.log("API test")  }
    );
  }

  ionViewDidLoad() {
    this.app.setTitle('Tracking');
    this.updateSchedule();
  }

  // getTimeline() {
  //   return this.http.get("http://ingot-api-php7-refactor.eu-west-1.elasticbeanstalk.com/api/v1/tracking/containers/CGMU6528805/timeline", this.options)
  //       .map(res =>  res.json())
  // }
  //
  // getCarrierBooking(){
  //   return this.http.get("http://ingot-api-php7-refactor.eu-west-1.elasticbeanstalk.com/api/v1/tracking/search/latest?limit=50&offset=0&paginated=1&sortDir=desc&sortField=event_datetime", this.options)
  //       .map(res => res.json())
  // }

  getApiTestURL(){
    return this.http.get(this.appConfig.apiUrl, this.options)
        .map(res => res.json())
  }

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    this.scheduleList && this.scheduleList.closeSlidingItems();

    this.confData.getTimelineConf(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }

  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage, this.excludeTracks);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    });

  }



  goToSessionDetail(favouriteContainer: any) {
    /* The push method takes two parameters:
      1) Destination page (SessionDetailPage)
      2) An object holding the data we're trying to push (will be vessel data).
    */
    // go to the session detail page
    // and pass in the session data
    this.navCtrl.push(SessionDetailPage, {
      name: "hotdogs",
      session: "Details about Hotdogs"
    });
  }

  addFavorite(slidingItem: ItemSliding, favouriteContainer: any) {

    if (this.user.hasFavorite(favouriteContainer.name)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite(slidingItem, favouriteContainer, 'Favorite already added');
    } else {
      // remember this session as a user favorite
      this.user.addFavorite(favouriteContainer.name);

      // create an alert instance
      let alert = this.alertCtrl.create({
        title: 'Favorite Added',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });
      // now present the alert on top of all other content
      alert.present();
    }

  }

  removeFavorite(slidingItem: ItemSliding, favouriteContainer: any, title: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(favouriteContainer.name);
            this.updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }



  doRefresh(refresher: Refresher) {
    this.confData.getTimelineConf(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;

      // simulate a network request that would take longer
      // than just pulling from out local json file
      setTimeout(() => {
        refresher.complete();

        const toast = this.toastCtrl.create({
          message: 'Sessions have been updated.',
          duration: 3000
        });
        toast.present();
      }, 1000);
    });
  }
}
