import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashComponent } from './pages/dash/dash.component';
import {HttpClientModule } from "@angular/common/http";
import { NewgraphComponent } from './graphs/newgraph/newgraph.component';
import { BargraphComponent } from './graphs/bargraph/bargraph.component';
import {ChartModule} from "angular2-chartjs";
import { HeartbeatComponent } from './cards/heartbeat/heartbeat.component';
import { DetectorsComponent } from './pages/detectors/detectors.component';
import { ActionsComponent } from './pages/actions/actions.component';
import { AnalysisComponent } from './pages/analysis/analysis.component';
import { HeaderComponent } from './partial/header/header.component';
import {DataTablesModule} from "angular-datatables";
import { DetectorCardComponent } from './partial/detector-card/detector-card.component';

@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    NewgraphComponent,
    BargraphComponent,
    HeartbeatComponent,
    DetectorsComponent,
    ActionsComponent,
    AnalysisComponent,
    HeaderComponent,
    DetectorCardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    ChartModule,
    DataTablesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(fasLib: FaIconLibrary) {
    fasLib.addIconPacks(fas, far);
  }
}
