import { Component } from '@angular/core';
import {AlertController, IonicPage, ItemSliding, NavController, NavParams, Platform,} from 'ionic-angular';
import {Http, RequestOptions, Headers} from "@angular/http";
import 'rxjs/Rx';
import {AppConfig} from "../../config/app.config";
import {TrackingDetailPage} from "../tracking-detail/tracking-detail";





@IonicPage()
@Component({
  selector: 'page-json-test',
  templateUrl: 'json-test.html',
})
export class JsonTestPage {
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
        'I': string;
        'VA': string;
        'UV': string;
        'OA': string;
        'D': string;
        'AE': string;
        'CD': string;
        'VD': string;
    };

  // Segment variables
  status: string = "On Schedule";


  containerVar: any;
  urlVar: string;
  urlEndVar: string;

    apiResponse: any;
    response: any;
    bookerResponse: any;
    options: RequestOptions;


  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public http: Http, platform: Platform,
      public alertCtrl: AlertController,
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
          'I': 'assets/img/vessel_loaded.png',
          'VA': 'assets/img/vessel_arrived.png',
          'UV': 'assets/img/vessel_unloaded.png',
          'OA': 'assets/img/departed_port.png',
          'D': 'assets/img/delivered.png',
          'AE': 'assets/img/vessel_loaded.png',
          'CD': 'assets/img/vessel_loaded.png',
          'VD': 'assets/img/vessel_departed.png'
      };
    // this.containerBarStatus = ['alert', 'positive', 'negative'];

    this.response = {
      'equipment_type': {},
      //figure out objects inside objects
      'dates': {}
    };

    this.bookerResponse = {
        'data': []
    };

    this.apiResponse = {
        'data': []
    };

    this.http = http

    var headers = new Headers();
    this.options = new RequestOptions ({headers: headers});

    headers.append('X-ApiKey', '1576636c3554584ab5a92497d11358b9ae');

    this.getTimeline().subscribe(
        (data) => {
          console.log('tracker', data)
          this.response = data
        },
        (err) =>  console.log(err),
        () => { console.log("tracker success")  }
    );

      this.getCarrierBooking().subscribe(
          (data) => {
              console.log('CarrierBooking', data)
              this.bookerResponse = data
          },
          (err) =>  console.log(err),
          () => { console.log("booker success")  }
      );

      this.getApiTestURL().subscribe(
          (data) => {
              console.log('API test', data)
              this.apiResponse = data
          },
          (err) =>  console.log(err),
          () => { console.log("API test")  }
      );
  }

  // Toggle for accordion display
  // toggleDetails(data) {
  //   if (data.showDetails) {
  //     data.showDetails = false;
  //     data.icon = 'ios-add-circle-outline';
  //   } else {
  //     data.showDetails = true;
  //     data.icon = 'ios-remove-circle-outline';
  //   }
  // }

  // This API is for a single timeline response for a given container.
  getTimeline() {
    return this.http.get("http://ingot-api-php7-refactor.eu-west-1.elasticbeanstalk.com/api/v1/tracking/containers/OOCU6798795/timeline", this.options)
        .map(res =>  res.json())
  }
  // This API is for all latest containers with a limit of 50
  getCarrierBooking(){
      return this.http.get("http://ingot-api-php7-refactor.eu-west-1.elasticbeanstalk.com/api/v1/tracking/search/latest?limit=50&offset=0&paginated=1&sortDir=desc&sortField=event_datetime", this.options)
          .map(res => res.json())
  }

    getApiTestURL(){
        return this.http.get(this.appConfig.apiUrl, this.options)
            .map(res => res.json())
    }

    goToVesselDetail(){
        this.navCtrl.push(TrackingDetailPage, {
            name: 'Hotdog'
        });
    }

    addToFavourites(slidingItem: ItemSliding) {
      slidingItem.close();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JsonTestPage');
  }

}
