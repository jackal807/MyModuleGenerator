import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

import { MenuController } from 'ionic-angular';

import { NotesAutocompleteProvider } from '../../providers/notes-autocomplete/notes-autocomplete';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items : any;
  selectedNotes : any;
  autocomplete : any;
  searchDelay : any;

  constructor(public navCtrl: NavController, public ws : RestProvider, public menuCtrl: MenuController, public notesProvider : NotesAutocompleteProvider) {
      this.autocomplete = { "query" : ""};
      this.items = [];
      this.selectedNotes = [];
      //this.getNotes();
  }


  updateSearch(key) {
    if(key=="") return;
    let self = this;
    if(self.searchDelay) clearTimeout(self.searchDelay);
    self.searchDelay = setTimeout(function() {
      self.items = [];
      self.notesProvider.getResults(key).subscribe(d => { self.items = d;});
    }, 500);
  }

  getNotes() {
    let self = this;
    this.ws.getNotes()
        .subscribe(
        data => { 
          console.log(data);
          self.items = data;
        },
        err => console.log("error is " + err),
        () => console.log('getnotes complete')
        );
    }

  addNote(note) {
    this.items = [];
    this.autocomplete = { "query" : ""};
    this.selectedNotes.push(note);
  }

  deleteNote(i) {
    this.selectedNotes.splice(i,1);
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
