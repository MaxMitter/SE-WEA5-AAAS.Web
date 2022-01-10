import {Component, OnDestroy, OnInit} from '@angular/core';
import {Metric} from "../../shared/metric/metric";
import {MetricService} from "../../shared/metric/metric.service";
import {ClientInstance} from "../../shared/client/client-instance";
import {Subject} from "rxjs";

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  counterTableOptions: DataTables.Settings = {};
  measurementTableOptions: DataTables.Settings = {};
  timespanTableOptions: DataTables.Settings = {};

  counterTableTrigger: Subject<any> = new Subject();
  measurementTableTrigger: Subject<any> = new Subject();
  timespanTableTrigger: Subject<any> = new Subject();
  counterMetricList: Metric[] = [];
  measurementMetricList: Metric[] = [];
  timespanMetricList: Metric[] = [];
  currentClientInstance: ClientInstance | null = null;

  constructor(
    private metricService: MetricService
  ) {
  }

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
      }],
      destroy: true
    };

    this.counterTableOptions = this.getBaseOptions();
    this.counterTableOptions.data = this.counterMetricList;
    this.counterTableOptions?.columns?.push({ title: 'Counter', data: 'counter'});

    this.measurementTableOptions = this.getBaseOptions();
    this.measurementTableOptions.data = this.measurementMetricList;
    this.measurementTableOptions?.columns?.push({title: 'Measurement', data: 'measurement'});

    this.timespanTableOptions = this.getBaseOptions();
    this.timespanTableOptions.data = this.timespanMetricList;
    this.timespanTableOptions?.columns?.push({title: 'Time taken', data: 'endedAt'});

    this.reloadData();
  }

  getBaseOptions() : DataTables.Settings {
    return {
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
        data: 'createdAt'
      }],
      destroy: true
    };
  }

  onClientChanged(client: ClientInstance | null): void {
    this.currentClientInstance = client;
    this.reloadData();
  }

  reloadCounterMetrics(): void {
    if (this.currentClientInstance !== null) {
      this.metricService.getAllCountersByClientInstanceId(this.currentClientInstance.id).subscribe(res => {
        for (let item of res) {
          this.counterMetricList.push(item);
        }
        this.counterTableTrigger.next();
      });
    }
  }

  reloadMesurementMetrics(): void {
    if (this.currentClientInstance !== null) {
      this.metricService.getAllMeasurementsByClientInstanceId(this.currentClientInstance.id).subscribe(res => {

        for (let item of res) {
          this.measurementMetricList.push(item);
        }
        this.measurementTableTrigger.next();
      });
    }
  }

  reloadTimespanMetric(): void {
    if (this.currentClientInstance !== null) {

      this.metricService.getAllTimespansByClientInstanceId(this.currentClientInstance.id).subscribe(res => {
        for (let item of res) {
          this.timespanMetricList.push(item);
        }
        this.timespanTableTrigger.next();
      });
    }
  }

  reloadData() : void {
    this.reloadCounterMetrics();
    this.reloadMesurementMetrics();
    this.reloadTimespanMetric();
  }

  ngOnDestroy() {
    this.counterTableTrigger.unsubscribe();
    this.measurementTableTrigger.unsubscribe();
    this.timespanTableTrigger.unsubscribe();
  }
}
