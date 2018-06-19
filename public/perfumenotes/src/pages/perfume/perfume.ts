import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { MenuController } from 'ionic-angular';
import { PerfumeAutocompleteProvider } from '../../providers/perfume-autocomplete/perfume-autocomplete';

/**
 * Generated class for the PerfumePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfume',
  templateUrl: 'perfume.html',
})
export class PerfumePage {

  items : any;
  autocomplete : any;
  searchDelay : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ws : RestProvider, public menuCtrl: MenuController, public perfumesProvider : PerfumeAutocompleteProvider) {
      this.autocomplete = { "query" : ""};
      this.items = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfumePage');
  }



  updateSearch(key) {
    if(key=="") return;
    let self = this;
    if(self.searchDelay) clearTimeout(self.searchDelay);
    self.searchDelay = setTimeout(function() {
      self.items = [];
      self.perfumesProvider.getResults(key).subscribe(d => { self.items = d;});
    }, 500);
  }

}
