import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashComponent } from './dash/dash.component';

@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(fasLib: FaIconLibrary) {
    fasLib.addIconPacks(fas, far);
  }
}
