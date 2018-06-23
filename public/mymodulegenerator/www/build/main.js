webpackJsonp([1],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__ = __webpack_require__(77);
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
var SettingsPage = /** @class */ (function () {
    function SettingsPage(navCtrl, navParams, ws, menuCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ws = ws;
        this.menuCtrl = menuCtrl;
        this.getPathConfiguration();
    }
    SettingsPage.prototype.getPathConfiguration = function () {
        var self = this;
        this.ws.getPathConfiguration()
            .subscribe(function (data) {
            console.log(data);
            self.items = data.data;
        }, function (err) { return console.log("error is " + err); }, function () { return console.log('getPathConfiguration complete'); });
    };
    SettingsPage.prototype.savePathConfiguration = function () {
        var self = this;
        this.ws.savePathConfiguration(self.items)
            .subscribe(function (data) {
            console.log(data);
        }, function (err) { return console.log("error is " + err); }, function () { return console.log('savePathConfiguration complete'); });
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"C:\Users\daniele\MyModuleManager\mymodulegenerator\public\mymodulegenerator\src\pages\settings\settings.html"*/'<ion-header>\n\n    <ion-navbar color="girl">\n\n      <button ion-button menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n      <ion-title>\n\n        Impostazioni path\n\n      </ion-title>\n\n    </ion-navbar>\n\n  </ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n              <div *ngIf="items" style="margin-bottom: 25px;">\n\n                <ion-item *ngFor="let conf of items">\n\n                      <ion-label color="primary">{{conf.label}}</ion-label>\n\n                      <ion-input placeholder="" [(ngModel)]="conf.value" clearInput></ion-input>\n\n                </ion-item>\n\n              </div>\n\n\n\n              \n\n                <button ion-button color="boy" (click)="savePathConfiguration()">\n\n                  <ion-icon name="cloud-upload"></ion-icon>&nbsp;\n\n                    Salva\n\n                </button>\n\n               \n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\daniele\MyModuleManager\mymodulegenerator\public\mymodulegenerator\src\pages\settings\settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__["a" /* RestProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* MenuController */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 110:
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
webpackEmptyAsyncContext.id = 110;

/***/ }),

/***/ 152:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/settings/settings.module": [
		273,
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
webpackAsyncContext.id = 152;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__ = __webpack_require__(77);
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
    function HomePage(navCtrl, ws, menuCtrl) {
        this.navCtrl = navCtrl;
        this.ws = ws;
        this.menuCtrl = menuCtrl;
        this.moduleObj = {
            "module": {
                "menuActive": "",
                "name": "",
                "menuLabel": "",
                "dependencies": []
            },
            "submodules": []
        };
        this.created = false;
    }
    HomePage.prototype.onDefaultSelected = function (i, val) {
        if (val == true)
            for (var j = 0; j < this.moduleObj.submodules.length; j++) {
                if (j != i)
                    this.moduleObj.submodules[j].isDefault = false;
            }
    };
    HomePage.prototype.addSubmodule = function () {
        var newSubModule = {
            "name": "",
            "dependencies": "",
            "isDefault": false,
            "menuLabel": ""
        };
        this.moduleObj.submodules.push(newSubModule);
    };
    HomePage.prototype.generate = function () {
        var self = this;
        this.ws.generate(self.moduleObj)
            .subscribe(function (data) {
            console.log(data);
            self.created = true;
            self.createdFileList = data.createdFiles;
            self.navbarSnippet = data.navbarSnippet;
            console.log("Valore di createdFileList : ");
            console.log(self.createdFileList);
        }, function (err) { return console.log("error is " + err); }, function () { return console.log('module generation complete'); });
    };
    HomePage.prototype.deleteModule = function () {
        var self = this;
        this.ws.deleteModule(self.createdFileList)
            .subscribe(function (data) {
            console.log(data);
            self.created = false;
            self.createdFileList = [];
        }, function (err) { return console.log("error is " + err); }, function () { return console.log('module deletion complete'); });
    };
    HomePage.prototype.deleteSingle = function (path) {
        var self = this;
        this.ws.deleteSingle(path)
            .subscribe(function (data) {
            console.log(data);
        }, function (err) { return console.log("error is " + err); }, function () { return console.log('single deletion complete'); });
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
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\daniele\MyModuleManager\mymodulegenerator\public\mymodulegenerator\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar color="girl">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>\n\n      Genera modulo\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n <div *ngIf="!created">\n\n  <ion-item>\n\n    <ion-label color="primary">Nome modulo</ion-label>\n\n    <ion-input placeholder="es. StatsRevenue" [(ngModel)]="moduleObj.module.name" clearInput></ion-input>\n\n  </ion-item>\n\n  <ion-item>\n\n    <ion-label color="primary">Menu label</ion-label>\n\n    <ion-input placeholder="es. Statistiche revenue" [(ngModel)]="moduleObj.module.menuLabel" clearInput></ion-input>\n\n  </ion-item>\n\n  <ion-item>\n\n    <ion-label color="primary">Menu padre navbar</ion-label>\n\n    <ion-input placeholder="Es. catalogo" [(ngModel)]="moduleObj.module.menuActive" clearInput></ion-input>\n\n  </ion-item>\n\n\n\n  <br/>\n\n  <br/>\n\n\n\n  <ion-list *ngFor="let submodule of moduleObj.submodules; let i = index;" style="margin-left: 20px;">\n\n    <ion-item>\n\n      <ion-label color="primary">Nome sottomodulo {{i+1}}.</ion-label>\n\n      <ion-input placeholder="Es. StatsSubmoduleOne" [(ngModel)]="submodule.name" clearInput></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label color="primary">Menu label sottomodulo</ion-label>\n\n      <ion-input placeholder="Es. Sottomodulo statistiche" [(ngModel)]="submodule.menuLabel" clearInput></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-toggle [(ngModel)]="submodule.isDefault" (ngModelChange)="onDefaultSelected(i, submodule.isDefault)"></ion-toggle>\n\n      <ion-label color="primary">È sottomenu di default</ion-label>\n\n    </ion-item>\n\n  </ion-list>\n\n\n\n  <button ion-button color="boy" (click)="addSubmodule()">\n\n    <ion-icon name="add"></ion-icon>&nbsp;\n\n      Aggiungi sottomodulo\n\n  </button>\n\n\n\n  <button ion-button color="danger" (click)="generate()">\n\n    <ion-icon name="checkmark"></ion-icon>&nbsp;\n\n      Genera modulo\n\n  </button>\n\n</div>\n\n\n\n<div *ngIf="created">\n\n\n\n  <div *ngIf="createdFileList && createdFileList.length" style="margin-top: 30px;">\n\n    <h1>Files e cartelle creati</h1>\n\n    <ion-list>\n\n      <ion-item *ngFor="let file of createdFileList; let i = index;">\n\n        <h2>{{file.name}}</h2>\n\n        <p>{{file.path}}</p>\n\n        <ion-icon *ngIf="file.type == \'folder\'" name="folder" color="boy" item-end></ion-icon>\n\n        <ion-icon *ngIf="file.type == \'file\'" name="document" color="girl" item-end></ion-icon>\n\n      </ion-item>\n\n    </ion-list>\n\n  </div>\n\n  \n\n  <ion-item *ngIf="navbarSnippet">\n\n      <ion-label stacked>Navbar menu snippet</ion-label>\n\n      <ion-textarea [(ngModel)]="navbarSnippet"></ion-textarea>\n\n  </ion-item>\n\n\n\n\n\n  <button ion-button color="red" (click)="deleteModule()">\n\n    <ion-icon name="trash"></ion-icon>&nbsp;\n\n      Elimina modulo\n\n  </button>\n\n</div>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\daniele\MyModuleManager\mymodulegenerator\public\mymodulegenerator\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__["a" /* RestProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* MenuController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(221);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_settings_settings__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_rest_rest__ = __webpack_require__(77);
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
                __WEBPACK_IMPORTED_MODULE_9__pages_settings_settings__["a" /* SettingsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* HttpModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_settings_settings__["a" /* SettingsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_10__providers_rest_rest__["a" /* RestProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_settings_settings__ = __webpack_require__(100);
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
            { title: 'Generazione modulo', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Impostazioni path', component: __WEBPACK_IMPORTED_MODULE_5__pages_settings_settings__["a" /* SettingsPage */] }
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
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\daniele\MyModuleManager\mymodulegenerator\public\mymodulegenerator\src\app\app.html"*/'<ion-menu [content]="content">\n\n        <ion-header>\n\n          <ion-toolbar color="girl">\n\n            <ion-title>Menu</ion-title>\n\n          </ion-toolbar>\n\n        </ion-header>\n\n      \n\n        <ion-content>\n\n          <ion-list>\n\n            <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n\n              {{p.title}}\n\n            </button>\n\n          </ion-list>\n\n        </ion-content>\n\n      \n\n</ion-menu>\n\n      \n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"C:\Users\daniele\MyModuleManager\mymodulegenerator\public\mymodulegenerator\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(246);
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
        //this.apiBaseUrl = 'http://mymodulegenerator.herokuapp.com/api/';
        this.options = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["c" /* RequestOptions */]();
        this.options.headers = new Headers();
        this.options.headers.append('Content-Type', 'application/json');
    }
    RestProvider.prototype.getPathConfiguration = function () {
        return this.http.get(this.apiBaseUrl + 'getPathConfiguration')
            .map(function (res) { return res.json(); });
    };
    RestProvider.prototype.savePathConfiguration = function (data) {
        return this.http.post(this.apiBaseUrl + 'savePathConfiguration', data, this.options)
            .map(function (res) { return res.json(); });
    };
    RestProvider.prototype.generate = function (data) {
        return this.http.post(this.apiBaseUrl + 'generate', data, this.options)
            .map(function (res) { return res.json(); });
    };
    RestProvider.prototype.deleteModule = function (data) {
        return this.http.post(this.apiBaseUrl + 'deleteModule', data, this.options)
            .map(function (res) { return res.json(); });
    };
    RestProvider.prototype.deleteSingle = function (data) {
        return this.http.post(this.apiBaseUrl + 'deleteSingle', data, this.options)
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

},[198]);
//# sourceMappingURL=main.js.map