import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PerfumePage } from './perfume';

@NgModule({
  declarations: [
    PerfumePage,
  ],
  imports: [
    IonicPageModule.forChild(PerfumePage),
  ],
})
export class PerfumePageModule {}
