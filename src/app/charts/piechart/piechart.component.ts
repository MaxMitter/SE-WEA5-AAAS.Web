import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {Basechart} from "../basechart";
import {ClientService} from "../../shared/client/client.service";
import {MetricService} from "../../shared/metric/metric.service";

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent extends Basechart implements OnInit {

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
      datasets: [{
        label: this.metricName,
        data: [],
        backgroundColor: [
          this.getRandomColor()
        ]
      }]
    };

    for (let i = 0; i < this.metricList.length; i++) {
      this.data.labels.push(this.clientList[i].identifier);
      if (this.metricList[i][0].counter !== null)
        this.data.datasets[0].data.push(this.metricList[i][0].counter)
      if (this.metricList[i][0].endedAt !== null)
        this.data.datasets[0].data.push(this.metricList[i][0].timespan)
      if (this.metricList[i][0].measurement !== null)
        this.data.datasets[0].data.push(this.metricList[i][0].measurement)
    }
  }
}
