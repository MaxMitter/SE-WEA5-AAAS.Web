import {Component, Input, OnInit} from '@angular/core';
import {MetricService} from "../../shared/metric/metric.service";
import {Metric} from "../../shared/metric/metric";
import {Subject} from "rxjs";
import {ClientService} from "../../shared/client/client.service";
import {ClientInstance} from "../../shared/client/client-instance";
import {waitForAsync} from "@angular/core/testing";
import {Basechart} from "../basechart";

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent extends Basechart implements OnInit {

  @Input() onClientChange: Subject<string> = new Subject<string>();
  @Input() metricNameInput: string = "";

  constructor(
    protected metricService: MetricService,
    protected clientService: ClientService
  ) {
    super(clientService, metricService);
  }

  ngOnInit(): void {
    super.metricName = this.metricNameInput;
    this.onClientChange.subscribe(v => {
      this.updateChart(v);
    });
    this.getData();
  }

  override reloadChart(): void {
    this.data = {
      labels: [],
      datasets: []
    };

    for (var i = 0; i < this.metricList.length; i++) {
      this.data.datasets.push({
        label: this.clientList[i].identifier,
        data: [],
        backgroundColor: [
          this.getRandomColor()
        ]
      });

      for (let metric of this.metricList[i]) {
        if (metric.counter !== null) {
          this.data.datasets[i].data.push(metric.counter);
          this.data.labels.push(metric.createdAtDate);
        } else if (metric.endedAt !== null) {
          this.data.datasets[i].data.push(metric.timespan)
          this.data.labels.push(metric.createdAtDate);
        } else if (metric.measurement !== null) {
          this.data.datasets[i].data.push(metric.measurement)
          this.data.labels.push(metric.createdAtDate);
        }
      }
    }
  }
}
