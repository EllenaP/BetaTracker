import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform,} from 'ionic-angular';
import {Http, RequestOptions, Headers} from "@angular/http";
import 'rxjs/Rx';


@IonicPage()
@Component({
  selector: 'page-json-test',
  templateUrl: 'json-test.html',
  // styleUrls: ['./src/theme/variables.scss']
})
export class JsonTestPage {
  // Segment variables
  status: string = "On Schedule";
  // isAndroid: boolean = false;

  aWorkingThumb: any;

  // Array for accordion display
  data: Array<{title: string, details: string, icon: string, showDetails: boolean}> = [];


  thumbnails: Array<{ thumbName: string, thumbImage: any }>;

  response: any;
  options: RequestOptions;

  // containerBarStatus = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, platform: Platform) {
      // Segment
      // this.isAndroid = platform.is('android');


    // For loop for accordion display
    // for(let i = 0; i < 3; i++ ){
      this.data.push({
        title: 'On Schedule',
        details: 'Something something containers',
        icon: 'ios-add-circle-outline',
        showDetails: false
      });
    // }

    this.aWorkingThumb = 'src/assets/img/Delivered.png';

    this.thumbnails = [
      {thumbName: 'Arrived At Port', thumbImage: 'src/assets/img/arrived at port of loading.png'},
      {thumbName: 'Awaiting Collection', thumbImage: 'src/assets/img/Awaiting Collection.png'},
      {thumbName: 'Container Loaded', thumbImage: 'src/assets/img/Container Loaded.png'},
      {thumbName: 'Delayed', thumbImage: 'src/assets/img/Delayed In Port.png'},
      {thumbName: 'delivered', thumbImage: 'src/assets/img/Delivered.png'},
      {thumbName: 'Loaded Onto Vessel', thumbImage: 'src/assets/img/Loaded Onto Vessel.png'},
      {thumbName: 'Vessel Arrived', thumbImage: 'src/assets/img/Vessel Arrived.png'}
    ];
    // this.containerBarStatus = ['alert', 'positive', 'negative'];

    this.response = {
      'equipment_type': {},
      //figure out objects inside objects
      'dates': {}
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
        () => { console.log("success")  }
    );
  }

  // Toggle for accordion display
  toggleDetails(data) {
    if (data.showDetails) {
      data.showDetails = false;
      data.icon = 'ios-add-circle-outline';
    } else {
      data.showDetails = true;
      data.icon = 'ios-remove-circle-outline';
    }
  }

  getTimeline() {
    return this.http.get("http://ingot-api-php7-refactor.eu-west-1.elasticbeanstalk.com/api/v1/tracking/containers/CGMU6528805/timeline", this.options)
        .map(res =>  res.json())
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad JsonTestPage');
  }

}
