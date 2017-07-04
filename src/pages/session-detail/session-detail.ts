import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';


@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  details: any;

  constructor(public navParams: NavParams) {
    this.details = navParams.data.details;
  }
}
