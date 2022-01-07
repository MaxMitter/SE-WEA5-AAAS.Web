import { Component, OnInit } from '@angular/core';
import {DetectorService} from "../../shared/detector/detector.service";
import {ClientInstance} from "../../shared/client/client-instance";
import {ClientService} from "../../shared/client/client.service";

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  currentClient: ClientInstance | null = null;
  selectableClients: ClientInstance[] = [];

  constructor(
    private detectorService: DetectorService,
    private clientInstanceService: ClientService
  ) { }

  ngOnInit(): void {
    this.clientInstanceService.getAllByAppKey().subscribe(res => this.selectableClients = res);
  }
}
