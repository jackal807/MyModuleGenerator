webpackJsonp([1],{

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PerfumePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_perfume_autocomplete_perfume_autocomplete__ = __webpack_require__(207);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the PerfumePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PerfumePage = /** @class */ (function () {
    function PerfumePage(navCtrl, navParams, ws, menuCtrl, perfumesProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ws = ws;
        this.menuCtrl = menuCtrl;
        this.perfumesProvider = perfumesProvider;
        this.autocomplete = { "query": "" };
        this.items = [];
    }
    PerfumePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PerfumePage');
    };
    PerfumePage.prototype.updateSearch = function (key) {
        if (key == "")
            return;
        var self = this;
        if (self.searchDelay)
            clearTimeout(self.searchDelay);
        self.searchDelay = setTimeout(function () {
            self.items = [];
            self.perfumesProvider.getResults(key).subscribe(function (d) { self.items = d; });
        }, 500);
    };
    PerfumePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-perfume',template:/*ion-inline-start:"C:\Users\Jackal807\perfumenotes\perfumenotes\public\perfumenotes\src\pages\perfume\perfume.html"*/'<ion-header>\n\n    <ion-navbar color="girl">\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title>\n\n        Lista profumi\n\n      </ion-title>\n\n    </ion-navbar>\n\n  </ion-header>\n\n\n\n\n\n<ion-content>\n\n    <div style="position: relative">\n\n        <ion-img src="../../assets/imgs/perfumes-imagery.jpg" class="header-imagery"></ion-img>\n\n        <div style="position: absolute; top: 60px; left: 10px; right: 10px;">\n\n    \n\n            <ion-card>\n\n              <ion-card-content>\n\n                  <ion-item>\n\n                      <ion-label color="primary">Search perfume</ion-label>\n\n                      <ion-input placeholder="Es. chinotto" [(ngModel)]="autocomplete.query"\n\n                      (ionChange)="updateSearch(autocomplete.query)" clearInput></ion-input>\n\n                  </ion-item>\n\n              </ion-card-content>\n\n            </ion-card>\n\n            <ion-card>\n\n              <!--\n\n                <ion-card-header>\n\n                  Ricerca no\n\n                </ion-card-header>\n\n              -->\n\n    \n\n              \n\n                <ion-card-content style="min-height:80vh">\n\n                  \n\n                   \n\n                \n\n                  <ion-list>\n\n                      \n\n                    <ion-item *ngFor="let i of items">\n\n                      \n\n                      <ion-thumbnail item-start>\n\n                        <img src="{{i.thumb}}">\n\n                      </ion-thumbnail>\n\n                    \n\n                      <h2>{{i.name}}</h2>\n\n                      <p>{{i.brand}}</p>\n\n                      <ion-icon name="search" color="violet" item-end (click)="details(i)"></ion-icon>\n\n                    </ion-item>\n\n                  </ion-list>\n\n                \n\n                  <br/><br/><br/>\n\n                \n\n                  <div padding>\n\n                      <ion-chip *ngFor="let s of selectedNotes">\n\n                          <ion-avatar>\n\n                            <img src="{{s.thumb}}">\n\n                          </ion-avatar>\n\n                          <ion-label>{{s.name}}</ion-label>\n\n                        </ion-chip>\n\n                  </div>\n\n                \n\n                \n\n                </ion-card-content>\n\n            </ion-card>\n\n        </div>\n\n    \n\n      </div>\n\n    \n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Jackal807\perfumenotes\perfumenotes\public\perfumenotes\src\pages\perfume\perfume.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__["a" /* RestProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* MenuController */], __WEBPACK_IMPORTED_MODULE_3__providers_perfume_autocomplete_perfume_autocomplete__["a" /* PerfumeAutocompleteProvider */]])
    ], PerfumePage);
    return PerfumePage;
}());

//# sourceMappingURL=perfume.js.map

/***/ }),

/***/ 161:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 161;

/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/perfume/perfume.module": [
		677,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 206;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PerfumeAutocompleteProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the PerfumeAutocompleteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var PerfumeAutocompleteProvider = /** @class */ (function () {
    function PerfumeAutocompleteProvider(http, ws) {
        this.http = http;
        this.ws = ws;
        this.labelAttribute = "name";
        this.formValueAttribute = "";
    }
    PerfumeAutocompleteProvider.prototype.getResults = function (keyword) {
        return this.ws.getPerfumesByKey(keyword)
            .map(function (result) {
            return result;
        });
    };
    PerfumeAutocompleteProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__["a" /* RestProvider */]])
    ], PerfumeAutocompleteProvider);
    return PerfumeAutocompleteProvider;
}());

//# sourceMappingURL=perfume-autocomplete.js.map

/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_notes_autocomplete_notes_autocomplete__ = __webpack_require__(254);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, ws, menuCtrl, notesProvider) {
        this.navCtrl = navCtrl;
        this.ws = ws;
        this.menuCtrl = menuCtrl;
        this.notesProvider = notesProvider;
        this.autocomplete = { "query": "" };
        this.items = [];
        this.selectedNotes = [];
        //this.getNotes();
    }
    HomePage.prototype.updateSearch = function (key) {
        if (key == "")
            return;
        var self = this;
        if (self.searchDelay)
            clearTimeout(self.searchDelay);
        self.searchDelay = setTimeout(function () {
            self.items = [];
            self.notesProvider.getResults(key).subscribe(function (d) { self.items = d; });
        }, 500);
    };
    HomePage.prototype.getNotes = function () {
        var self = this;
        this.ws.getNotes()
            .subscribe(function (data) {
            console.log(data);
            self.items = data;
        }, function (err) { return console.log("error is " + err); }, function () { return console.log('getnotes complete'); });
    };
    HomePage.prototype.addNote = function (note) {
        this.items = [];
        this.autocomplete = { "query": "" };
        this.selectedNotes.push(note);
    };
    HomePage.prototype.deleteNote = function (i) {
        this.selectedNotes.splice(i, 1);
    };
    HomePage.prototype.openMenu = function () {
        this.menuCtrl.open();
    };
    HomePage.prototype.closeMenu = function () {
        this.menuCtrl.close();
    };
    HomePage.prototype.toggleMenu = function () {
        this.menuCtrl.toggle();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\Jackal807\perfumenotes\perfumenotes\public\perfumenotes\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar color="girl">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>\n\n      Lista note\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n  <div style="position: relative">\n\n    <ion-img src="../../assets/imgs/notes-imagery.jpg" class="header-imagery"></ion-img>\n\n    <div style="position: absolute; top: 60px; left: 10px; right: 10px;">\n\n\n\n        <ion-card>\n\n          <ion-card-content>\n\n              <ion-item>\n\n                  <ion-label color="primary">Cerca nota</ion-label>\n\n                  <ion-input placeholder="Es. chinotto" [(ngModel)]="autocomplete.query"\n\n                  (ionChange)="updateSearch(autocomplete.query)" clearInput></ion-input>\n\n              </ion-item>\n\n          </ion-card-content>\n\n        </ion-card>\n\n        <ion-card>\n\n          <!--\n\n            <ion-card-header>\n\n              Ricerca no\n\n            </ion-card-header>\n\n          -->\n\n\n\n          \n\n            <ion-card-content style="min-height:80vh">\n\n              \n\n               \n\n            \n\n              <ion-list>\n\n                  \n\n                <ion-item *ngFor="let i of items">\n\n                  \n\n                  <ion-thumbnail item-start>\n\n                    <img src="{{i.thumb}}">\n\n                  </ion-thumbnail>\n\n                \n\n                  <h2>{{i.name}}</h2>\n\n                  <button ion-button color="boy" item-end (click)="addNote(i)">Add</button>\n\n                </ion-item>\n\n              </ion-list>\n\n            \n\n              <br/><br/><br/>\n\n            \n\n\n\n              <ion-card color="light" *ngIf="selectedNotes.length">\n\n                  <ion-card-header>\n\n                      <ion-title>Note selezionate</ion-title>\n\n                  </ion-card-header>\n\n                  <ion-card-content>\n\n                      <ion-chip *ngFor="let s of selectedNotes; let i = index">\n\n                          <ion-avatar>\n\n                            <img src="{{s.thumb}}">\n\n                          </ion-avatar>\n\n                          <ion-label>{{s.name}}</ion-label>\n\n                          <button ion-button clear color="light" (click)="deleteNote(i)">\n\n                              <ion-icon name="close-circle"></ion-icon>\n\n                          </button>\n\n                        </ion-chip>\n\n                        <br/>\n\n                        \n\n                        \n\n                  </ion-card-content>\n\n              </ion-card>\n\n\n\n              <div padding text-center *ngIf="selectedNotes.length">\n\n                <button ion-button color="girl" round item-end (click)="addNote(i)">Cerca per note</button>\n\n              </div>\n\n\n\n             \n\n            \n\n            \n\n            </ion-card-content>\n\n        </ion-card>\n\n    </div>\n\n\n\n  </div>\n\n\n\n\n\n\n\n    \n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Jackal807\perfumenotes\perfumenotes\public\perfumenotes\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__["a" /* RestProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* MenuController */], __WEBPACK_IMPORTED_MODULE_3__providers_notes_autocomplete_notes_autocomplete__["a" /* NotesAutocompleteProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotesAutocompleteProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the NotesAutocompleteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var NotesAutocompleteProvider = /** @class */ (function () {
    function NotesAutocompleteProvider(http, ws) {
        this.http = http;
        this.ws = ws;
        this.labelAttribute = "name";
        this.formValueAttribute = "";
    }
    NotesAutocompleteProvider.prototype.getResults = function (keyword) {
        return this.ws.getNotesByKey(keyword)
            .map(function (result) {
            return result;
        });
    };
    NotesAutocompleteProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__["a" /* RestProvider */]])
    ], NotesAutocompleteProvider);
    return NotesAutocompleteProvider;
}());

//# sourceMappingURL=notes-autocomplete.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(351);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_perfume_perfume__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_rest_rest__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic2_auto_complete__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_notes_autocomplete_notes_autocomplete__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_perfume_autocomplete_perfume_autocomplete__ = __webpack_require__(207);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_perfume_perfume__["a" /* PerfumePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_11_ionic2_auto_complete__["a" /* AutoCompleteModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/perfume/perfume.module#PerfumePageModule', name: 'PerfumePage', segment: 'perfume', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* HttpModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_perfume_perfume__["a" /* PerfumePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_10__providers_rest_rest__["a" /* RestProvider */],
                __WEBPACK_IMPORTED_MODULE_12__providers_notes_autocomplete_notes_autocomplete__["a" /* NotesAutocompleteProvider */],
                __WEBPACK_IMPORTED_MODULE_13__providers_perfume_autocomplete_perfume_autocomplete__["a" /* PerfumeAutocompleteProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_perfume_perfume__ = __webpack_require__(150);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
        this.pages = [
            { title: 'Cerca per note', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Cerca profumo', component: __WEBPACK_IMPORTED_MODULE_5__pages_perfume_perfume__["a" /* PerfumePage */] }
        ];
    }
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Jackal807\perfumenotes\perfumenotes\public\perfumenotes\src\app\app.html"*/'<ion-menu [content]="content">\n\n        <ion-header>\n\n          <ion-toolbar color="girl">\n\n            <ion-title>Menu</ion-title>\n\n          </ion-toolbar>\n\n        </ion-header>\n\n      \n\n        <ion-content>\n\n          <ion-list>\n\n            <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n              {{p.title}}\n\n            </button>\n\n          </ion-list>\n\n        </ion-content>\n\n      \n\n</ion-menu>\n\n      \n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Users\Jackal807\perfumenotes\perfumenotes\public\perfumenotes\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RestProvider = /** @class */ (function () {
    function RestProvider(http, requestOptions) {
        this.http = http;
        this.requestOptions = requestOptions;
        this.apiBaseUrl = 'api/';
        this.apiBaseUrl = 'http://perfumenotes.herokuapp.com/api/';
        this.options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* RequestOptions */]();
        this.options.headers = new Headers();
        this.options.headers.append('Content-Type', 'application/json');
    }
    RestProvider.prototype.getNotes = function () {
        return this.http.get(this.apiBaseUrl + 'getNoteList')
            .map(function (res) { return res.json(); });
    };
    RestProvider.prototype.getNotesByKey = function (key) {
        return this.http.get(this.apiBaseUrl + 'getNoteListByKey' + key)
            .map(function (res) { return res.json(); });
    };
    RestProvider.prototype.getPerfumes = function () {
        return this.http.get(this.apiBaseUrl + 'getPerfumeList')
            .map(function (res) { return res.json(); });
    };
    RestProvider.prototype.getPerfumesByKey = function (key) {
        return this.http.get(this.apiBaseUrl + 'getPerfumeListByKey' + key)
            .map(function (res) { return res.json(); });
    };
    RestProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* RequestOptions */]])
    ], RestProvider);
    return RestProvider;
}());

//# sourceMappingURL=rest.js.map

/***/ })

},[346]);
//# sourceMappingURL=main.js.map