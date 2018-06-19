import {AutoCompleteService} from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map'

import { RestProvider } from '../../providers/rest/rest';

/*
  Generated class for the NotesAutocompleteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NotesAutocompleteProvider implements AutoCompleteService {

  labelAttribute = "name";
  formValueAttribute = "";

  constructor(private http:Http, public ws : RestProvider) {
    
  }

  getResults(keyword:string) {
    return this.ws.getNotesByKey(keyword)
      .map(
        result =>
        {
          return result;
        });
  }

  

}
