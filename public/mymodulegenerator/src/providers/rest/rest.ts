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
    //this.apiBaseUrl = 'http://mymodulegenerator.herokuapp.com/api/';
    
    this.options = new RequestOptions();
    this.options.headers = new Headers();
    this.options.headers.append('Content-Type', 'application/json');
  }

  getPathConfiguration() {
    return this.http.get(this.apiBaseUrl + 'getPathConfiguration')
    .map(res => res.json());
  }

  savePathConfiguration(data: any) {
    return this.http.post(this.apiBaseUrl + 'savePathConfiguration', data, this.options)
    .map(res => res.json());
  }

}
