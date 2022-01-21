import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {Metric} from "../../shared/metric/metric";
import {ClientInstance} from "../../shared/client/client-instance";
import {MetricService} from "../../shared/metric/metric.service";

@Component({
  selector: 'app-measurementmetric',
  templateUrl: './measurementmetric.component.html',
  styleUrls: ['./measurementmetric.component.css']
})
export class MeasurementmetricComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  tableTrigger: Subject<any> = new Subject();
  metricList: Metric[] = [];

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
        title: 'ID',
        data: 'id'
      }, {
        title: 'Measurement Name',
        data: 'measurementName'
      }, {
        title: 'Created At',
        data: 'createdAtDate'
      }, {
        title: 'Counter',
        data: 'counter'
      }],
      destroy: true
    };
    this.dtOptions.data = this.metricList;

    this.reloadData();
  }

  onClientChanged(client: ClientInstance | null): void {
    this.currentClientInstance = client;
    this.reloadData();
  }

  reloadData(): void {
    if (this.currentClientInstance !== null) {
      this.metricService.getAllMeasurementsByClientInstanceId(this.currentClientInstance.id).subscribe(res => {
        this.metricList.length = 0;
        for (let item of res) {
          this.metricList.push(item);
        }
        this.tableTrigger.next();
      });
    }
  }
}
