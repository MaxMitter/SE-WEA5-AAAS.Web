import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome'

import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashComponent} from './pages/dash/dash.component';
import {HttpClientModule} from "@angular/common/http";
import {NewchartComponent} from './charts/newchart/newchart.component';
import {BarchartComponent} from './charts/barchart/barchart.component';
import {ChartModule} from "angular2-chartjs";
import {HeartbeatComponent} from './cards/heartbeat/heartbeat.component';
import {DetectorsComponent} from './pages/detectors/detectors.component';
import {ActionsComponent} from './pages/actions/actions.component';
import {AnalysisComponent} from './pages/analysis/analysis.component';
import {HeaderComponent} from './partial/header/header.component';
import {DataTablesModule} from "angular-datatables";
import {DetectorCardComponent} from './partial/detector-card/detector-card.component';
import {TicksToDatePipe} from "./pipes/tickstodatepipe";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TicksToTimespanPipe} from "./pipes/ticksToTimespanPipe";
import {ActionCardComponent} from './partial/action-card/action-card.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { EditChartComponent } from './charts/editchart/edit-chart.component';
import { LinechartComponent } from './charts/linechart/linechart.component';
import { PiechartComponent } from './charts/piechart/piechart.component';

@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    NewchartComponent,
    BarchartComponent,
    HeartbeatComponent,
    DetectorsComponent,
    ActionsComponent,
    AnalysisComponent,
    HeaderComponent,
    DetectorCardComponent,
    TicksToDatePipe,
    TicksToTimespanPipe,
    ActionCardComponent,
    EditChartComponent,
    LinechartComponent,
    PiechartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    ChartModule,
    DataTablesModule,
    ReactiveFormsModule,
    NgbModule,
    ChartModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(fasLib: FaIconLibrary) {
    fasLib.addIconPacks(fas, far);
  }
}
