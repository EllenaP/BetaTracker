import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, RequestOptions, Headers} from "@angular/http";
import 'rxjs/Rx';


@IonicPage()
@Component({
  selector: 'page-tracking-detail',
  templateUrl: 'tracking-detail.html',
})
export class TrackingDetailPage {

  response: any;
  options: RequestOptions;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

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

  getTimeline() {
    return this.http.get("http://ingot-api-php7-refactor.eu-west-1.elasticbeanstalk.com/api/v1/tracking/containers/CGMU6528805/timeline", this.options)
        .map(res =>  res.json())
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingDetailPage');
  }

}
