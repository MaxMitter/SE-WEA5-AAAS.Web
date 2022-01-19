import {AfterViewChecked, Component} from '@angular/core';
import 'bootstrap';
import * as $ from "jquery";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AAAS';
  public analysisIsCollapsed = true;

  setActivePage(page: string): void {
    let active = $("#active");
    console.log(active);
    $("#active").removeClass('active');
    $(`.${page}`).addClass('active');
  }
}
