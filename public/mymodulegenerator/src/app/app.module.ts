import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PerfumePage } from '../pages/perfume/perfume';
import { RestProvider } from '../providers/rest/rest';

import { AutoCompleteModule } from 'ionic2-auto-complete';
import { NotesAutocompleteProvider } from '../providers/notes-autocomplete/notes-autocomplete';
import { PerfumeAutocompleteProvider } from '../providers/perfume-autocomplete/perfume-autocomplete';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PerfumePage
  ],
  imports: [
    BrowserModule,
    AutoCompleteModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PerfumePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    NotesAutocompleteProvider,
    PerfumeAutocompleteProvider
  ]
})
export class AppModule {}
