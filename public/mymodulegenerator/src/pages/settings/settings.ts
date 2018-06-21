import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { MenuController } from 'ionic-angular';

/**
 * Generated class for the PerfumePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  items : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ws : RestProvider, public menuCtrl: MenuController) {
      this.getPathConfiguration();
  }

  getPathConfiguration() {
    let self = this;
    this.ws.getPathConfiguration()
        .subscribe(
        data => { 
          console.log(data);
          self.items = data.data;
        },
        err => console.log("error is " + err),
        () => console.log('getPathConfiguration complete')
        );
  }


  savePathConfiguration() {
    let self = this;
    this.ws.savePathConfiguration(self.items)
        .subscribe(
        data => { 
          console.log(data);
        },
        err => console.log("error is " + err),
        () => console.log('savePathConfiguration complete')
        );
  }

  

}
