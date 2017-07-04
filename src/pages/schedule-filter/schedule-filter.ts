import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';
import {Http, RequestOptions, Headers} from "@angular/http";
import 'rxjs/Rx';



@Component({
  selector: 'page-schedule-filter',
  templateUrl: 'schedule-filter.html'
})
export class ScheduleFilterPage {
  status: Array<{name: string, isChecked: boolean}> = [];

  bookerResponse: any;
  options: RequestOptions;

  constructor(
    public confData: ConferenceData,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public http: Http
  ) {
    // passed in array of track names that should be excluded (unchecked)
    let excludedTrackNames = this.navParams.data;

    this.confData.getTracks().subscribe((trackNames: string[]) => {

      trackNames.forEach(trackName => {
        this.status.push({
          name: trackName,
          isChecked: (excludedTrackNames.indexOf(trackName) === -1)
        });
      });
    });


    this.bookerResponse = {
      'data': []
    };

    this.http = http

    var headers = new Headers();
    this.options = new RequestOptions ({headers: headers});

    headers.append('X-ApiKey', '1576636c3554584ab5a92497d11358b9ae');

    this.getCarrierBooking().subscribe(
        (data) => {
          console.log('CarrierBooking', data)
          this.bookerResponse = data
        },
        (err) =>  console.log(err),
        () => { console.log("booker success")  }
    );
  }

  getCarrierBooking(){
    return this.http.get("http://ingot-api-php7-refactor.eu-west-1.elasticbeanstalk.com/api/v1/tracking/search/latest?limit=50&offset=0&paginated=1&sortDir=desc&sortField=event_datetime", this.options)
        .map(res => res.json())
  }

  resetFilters() {
    // reset all of the toggles to be checked
    this.status.forEach(track => {
      track.isChecked = true;
    });
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    let excludedTrackNames = this.status.filter(c => !c.isChecked).map(c => c.name);
    this.dismiss(excludedTrackNames);
  }

  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    this.viewCtrl.dismiss(data);
  }
}
