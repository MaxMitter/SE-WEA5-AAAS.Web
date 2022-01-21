import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {Metric} from "../../shared/metric/metric";
import {ClientInstance} from "../../shared/client/client-instance";
import {MetricService} from "../../shared/metric/metric.service";

@Component({
  selector: 'app-timespanmetric',
  templateUrl: './timespanmetric.component.html',
  styleUrls: ['./timespanmetric.component.css']
})
export class TimespanmetricComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  timespanTableTrigger: Subject<any> = new Subject();
  timespanMetricList: Metric[] = [];

  currentClientInstance: ClientInstance | null = null;

  constructor(private metricService: MetricService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      processing: true,
      language: {
        processing: '<fa-icon icon="spinner" spin></fa-icon>'
      },
      columns: [{
        title: 'Measurement Name',
        data: 'measurementName'
      }, {
        title: 'Created At',
        data: 'createdAtDate'
      }, {
        title: 'Time taken',
        data: 'timespan'
      }],
      destroy: true
    };
    this.dtOptions.data = this.timespanMetricList;

    this.reloadData();
  }

  onClientChanged(client: ClientInstance | null): void {
    this.currentClientInstance = client;
    this.reloadData();
  }

  reloadData(): void {
    if (this.currentClientInstance !== null) {
      this.metricService.getAllTimespansByClientInstanceId(this.currentClientInstance.id).subscribe(res => {
        // this feels very hacky but it works
        this.timespanMetricList.length = 0;
        for (let item of res) {
          this.timespanMetricList.push(item);
        }
        this.timespanTableTrigger.next();
      });
    }
  }
}
