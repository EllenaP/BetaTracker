import { Component } from '@angular/core';
import {PopoverController} from 'ionic-angular';

import { PopoverPage } from '../about-popover/about-popover';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  // actionSheetCtrl: any;
  // config: any;
  // warrant: any;
  //
  // actionSheet = ActionSheet;

  constructor(public popoverCtrl: PopoverController,
              // actionSheetCtrl: ActionSheet,
              // config: Config,

  ) { }



  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }

  // openContact(warrant: any) {
  //   let mode = this.config.get('mode');
  //
  //   let actionSheet = this.actionSheetCtrl.create({
  //     title: 'Contact ' + 'sausage',
  //     buttons: [
  //       {
  //         text: `Email sausage`,
  //         icon: mode !== 'ios' ? 'mail' : null,
  //         handler: () => {
  //           window.open('mailto:' + 'ellena.parsons@warrant-group.com');
  //         }
  //       },
  //       {
  //         text: `Call 0800505463`,
  //         icon: mode !== 'ios' ? 'call' : null,
  //         handler: () => {
  //           window.open('tel:' + '0800505505');
  //         }
  //       }
  //     ]
  //   });
  //
  //   actionSheet.present();
  // }
}
