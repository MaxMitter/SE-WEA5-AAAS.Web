import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashComponent} from './pages/dash/dash.component';
import {DetectorsComponent} from "./pages/detectors/detectors.component";
import {ActionsComponent} from "./pages/actions/actions.component";
import {ClientsComponent} from "./pages/clients/clients.component";
import {CountermetricComponent} from './pages/countermetric/countermetric.component';
import {TimespanmetricComponent} from './pages/timespanmetric/timespanmetric.component';
import {MeasurementmetricComponent} from './pages/measurementmetric/measurementmetric.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dash',
    pathMatch: 'full'
  }, {
    path: 'dash',
    component: DashComponent
  }, {
    path: 'detectors',
    component: DetectorsComponent
  }, {
    path: 'actions',
    component: ActionsComponent
  }, {
    path: 'clients',
    component: ClientsComponent
  }, {
    path: 'countermetric',
    component: CountermetricComponent
  }, {
    path: 'timespanmetric',
    component: TimespanmetricComponent
  }, {
    path: 'measurementmetric',
    component: MeasurementmetricComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
