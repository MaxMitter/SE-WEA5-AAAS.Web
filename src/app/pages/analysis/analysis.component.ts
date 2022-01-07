import { Component, OnInit } from '@angular/core';
import {Metric} from "../../shared/metric/metric";
import {MetricService} from "../../shared/metric/metric.service";
import {ClientInstance} from "../../shared/client/client-instance";
import {DataTablesModule} from "angular-datatables";

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  metricList: Metric[] = [];
  currentClientInstance: ClientInstance | null = null;

  constructor(
    private metricService: MetricService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15
    };

    this.reloadData();
  }

  onClientChanged(client: ClientInstance | null) : void {
    this.currentClientInstance = client;
    this.reloadData();
  }

  reloadData() : void{
    if (this.currentClientInstance !== null) {
      this.metricService.getAllByClientInstanceId(this.currentClientInstance.id).subscribe(res => {
        this.metricList = res
        console.log(res);
      });
    }
  }
}
