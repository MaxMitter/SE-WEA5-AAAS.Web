import { Component } from '@angular/core';
import {ClientInstance} from "./shared/client/client-instance";
import {DetectorService} from "./shared/detector/detector.service";
import {ClientService} from "./shared/client/client.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AAAS';
}
