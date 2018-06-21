import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

import { MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  moduleObj : any;

  constructor(public navCtrl: NavController, public ws : RestProvider, public menuCtrl: MenuController) {
     this.moduleObj = {
       "menuLabel" : "",
       "menuActive" : "",
       "module" : {
         "name" : "",
         "menuLabel" : "",
         "dependencies" : []
       },
       "submodules" : []
     }
  }


  onDefaultSelected(i, val) {
      if(val==true)
      for(var j=0; j<this.moduleObj.submodules.length; j++) {
        if(j!=i) this.moduleObj.submodules[j].isDefault = false;
      }
  }

  addSubmodule() {
    let newSubModule = {
      "name" : "",
      "dependencies" : "",
      "isDefault" : false,
      "menuLabel" : ""
    };
    this.moduleObj.submodules.push(newSubModule);
  }

  openMenu() {
    this.menuCtrl.open();
  }
 
  closeMenu() {
    this.menuCtrl.close();
  }
 
  toggleMenu() {
    this.menuCtrl.toggle();
  }

}
