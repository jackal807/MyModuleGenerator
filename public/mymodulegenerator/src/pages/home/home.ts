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
  created : boolean;
  createdFileList : any;
  navbarSnippet : string;

  constructor(public navCtrl: NavController, public ws : RestProvider, public menuCtrl: MenuController) {
     this.moduleObj = {
       "module" : {
         "menuActive" : "",
         "name" : "",
         "menuLabel" : "",
         "dependencies" : []
       },
       "submodules" : []
     };

     this.created = false;
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


  generate() {
    let self = this;
    this.ws.generate(self.moduleObj)
        .subscribe(
        data => { 
          console.log(data);
          self.created = true;
          self.createdFileList = data.createdFiles;
          self.navbarSnippet = data.navbarSnippet;
          console.log("Valore di createdFileList : ");
          console.log(self.createdFileList);
        },
        err => console.log("error is " + err),
        () => console.log('module generation complete')
        );
  }

  deleteModule() {
    let self = this;
    this.ws.deleteModule(self.createdFileList)
        .subscribe(
        data => { 
          console.log(data);
          self.created = false;
          self.createdFileList = [];
        },
        err => console.log("error is " + err),
        () => console.log('module deletion complete')
        );
  }

  deleteSingle(path) {
    let self = this;
    this.ws.deleteSingle(path)
        .subscribe(
        data => { 
          console.log(data);
        },
        err => console.log("error is " + err),
        () => console.log('single deletion complete')
        );
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
