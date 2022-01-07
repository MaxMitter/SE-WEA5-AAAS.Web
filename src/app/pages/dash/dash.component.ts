import { Component, OnInit } from '@angular/core';
import {Detector} from "../../shared/detector/detector";
import {DetectorService} from "../../shared/detector/detector.service";
import {ClientInstance} from "../../shared/client/client-instance";
import {ClientService} from "../../shared/client/client.service";
import {Observable} from "rxjs";

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
    private clientInstanceService: ClientService) { }

  ngOnInit(): void {
    this.clientInstanceService.getAllByAppKey().subscribe(res => this.selectableClients = res);
  }

  selectClient(id: string | null) {
    this.currentClient = this.selectableClients.find(client => client.id === id) ?? null;
  }
}
