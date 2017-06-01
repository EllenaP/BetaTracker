import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupplyChainManagementPage } from './supply-chain-management';

@NgModule({
  declarations: [
    SupplyChainManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(SupplyChainManagementPage),
  ],
  exports: [
    SupplyChainManagementPage
  ]
})
export class SupplyChainManagementPageModule {}
