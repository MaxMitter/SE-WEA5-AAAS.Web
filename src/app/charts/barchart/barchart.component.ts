import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {ClientService} from "../../shared/client/client.service";
import {MetricService} from "../../shared/metric/metric.service";
import {Basechart} from "../basechart";

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent extends Basechart implements OnInit {

  @Input() onClientChange: Subject<string> = new Subject<string>();
  @Input() metricNameInput: string = "";

  constructor(
    protected clientService: ClientService,
    protected metricService: MetricService
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
