import { Http, RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class RestProvider {

  options: any;

  apiBaseUrl : String;

  notes : any;

  constructor(public http: Http, public requestOptions: RequestOptions) {
    this.apiBaseUrl = 'api/';
    //this.apiBaseUrl = 'http://perfumenotes.herokuapp.com/api/';
    
    this.options = new RequestOptions();
    this.options.headers = new Headers();
    this.options.headers.append('Content-Type', 'application/json');
  }

  getNotes() {
    return this.http.get(this.apiBaseUrl + 'getNoteList')
    .map(res => res.json());
  }

  getNotesByKey(key) {
    return this.http.get(this.apiBaseUrl + 'getNoteListByKey' + key)
    .map(res => res.json());
  }

  getPerfumes() {
    return this.http.get(this.apiBaseUrl + 'getPerfumeList')
    .map(res => res.json());
  }

  getPerfumesByKey(key) {
    return this.http.get(this.apiBaseUrl + 'getPerfumeListByKey' + key)
    .map(res => res.json());
  }


}
