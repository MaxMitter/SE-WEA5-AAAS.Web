import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DetectorService} from "../../shared/detector/detector.service";
import {ClientInstance} from "../../shared/client/client-instance";
import {ClientService} from "../../shared/client/client.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  updateChart: Subject<string> = new Subject();

  currentClient: ClientInstance | null = null;
  selectableClients: ClientInstance[] = [];

  charts: Array<{type: string, metric: string}> = new Array<{type: string; metric: string}>();

  constructor(
    private detectorService: DetectorService,
    private clientInstanceService: ClientService
  ) { }

  ngOnInit(): void {
    this.clientInstanceService.getAllByAppKey().subscribe(res => this.selectableClients = res);
    this.charts = JSON.parse(localStorage.getItem('dashboardGraphs') ?? "[]");
  }

  createNewChart(type: string, metricName: string): void {
    let newGraph = {
      type: type,
      metric: metricName
    };

    this.charts.push(newGraph);
    localStorage.setItem('dashboardGraphs', JSON.stringify(this.charts));
  }

  clientChanged(clientInstance: ClientInstance): void {
    this.currentClient = clientInstance;
    this.updateChart.next(this.currentClient?.id);
  }

  removeChart(type: string, metricName: string): void {
    this.charts = this.charts.filter(chart => chart.type != type || chart.metric != metricName);
    localStorage.setItem('dashboardGraphs', JSON.stringify(this.charts));
  }
}
