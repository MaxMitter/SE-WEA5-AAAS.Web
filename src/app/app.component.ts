import {AfterViewChecked, Component} from '@angular/core';
import 'bootstrap';
import * as $ from "jquery";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked{
  title = 'AAAS';

  ngAfterViewChecked(): void {
    //$('[data-toggle="tooltip"]').tooltip();
  }
}
