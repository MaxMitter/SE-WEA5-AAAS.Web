import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashComponent} from './pages/dash/dash.component';
import {DetectorsComponent} from "./pages/detectors/detectors.component";
import {ActionsComponent} from "./pages/actions/actions.component";
import {ClientsComponent} from "./pages/clients/clients.component";
import {CountermetricComponent} from './pages/countermetric/countermetric.component';
import {TimespanmetricComponent} from './pages/timespanmetric/timespanmetric.component';
import {MeasurementmetricComponent} from './pages/measurementmetric/measurementmetric.component';
import {LogmessageComponent} from "./pages/logmessage/logmessage.component";
import {CanNavigateToAdminGuard} from "./can-navigate-to-admin.guard";
import {LoginComponent} from "./pages/login/login.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dash',
    pathMatch: 'full'
  }, {
    path: 'index.html',
    redirectTo: 'dash',
    pathMatch: 'full'
  }, {
    path: 'id_token',
    redirectTo: 'dash',
    pathMatch: 'full'
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'dash',
    component: DashComponent,
    canActivate: [CanNavigateToAdminGuard]
  }, {
    path: 'detectors',
    component: DetectorsComponent,
    // canActivate: [CanNavigateToAdminGuard]
  }, {
    path: 'actions',
    component: ActionsComponent,
    // canActivate: [CanNavigateToAdminGuard]
  }, {
    path: 'clients',
    component: ClientsComponent,
    // canActivate: [CanNavigateToAdminGuard]
  }, {
    path: 'countermetric',
    component: CountermetricComponent,
    // canActivate: [CanNavigateToAdminGuard]
  }, {
    path: 'timespanmetric',
    component: TimespanmetricComponent,
    // canActivate: [CanNavigateToAdminGuard]
  }, {
    path: 'measurementmetric',
    component: MeasurementmetricComponent,
    // canActivate: [CanNavigateToAdminGuard]
  }, {
    path: 'logmessage',
    component: LogmessageComponent,
    // canActivate: [CanNavigateToAdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
