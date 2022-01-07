import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './pages/dash/dash.component';
import {DetectorsComponent} from "./pages/detectors/detectors.component";
import {ActionsComponent} from "./pages/actions/actions.component";
import {AnalysisComponent} from "./pages/analysis/analysis.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dash',
    pathMatch: 'full'
  },
  {
    path: 'dash',
    component: DashComponent
  },
  {
    path: 'detectors',
    component: DetectorsComponent
  },
  {
    path: 'actions',
    component: ActionsComponent
  },
  {
    path: 'analysis',
    component: AnalysisComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
