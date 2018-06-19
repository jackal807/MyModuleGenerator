import {AutoCompleteService} from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map'

import { RestProvider } from '../../providers/rest/rest';

/*
  Generated class for the PerfumeAutocompleteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PerfumeAutocompleteProvider implements AutoCompleteService {

  labelAttribute = "name";
  formValueAttribute = "";

  constructor(private http:Http, public ws : RestProvider) {
    
  }


  getResults(keyword:string) {
    return this.ws.getPerfumesByKey(keyword)
      .map(
        result =>
        {
          return result;
        });
  }

}
