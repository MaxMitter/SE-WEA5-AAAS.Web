import {Metric} from "../shared/metric/metric";
import {ClientInstance} from "../shared/client/client-instance";
import {ClientService} from "../shared/client/client.service";
import {MetricService} from "../shared/metric/metric.service";

export abstract class Basechart {

  metricList: Array<Array<Metric>> = [];
  data: any = {};
  clientInstanceId: string | undefined = "all";
  clientList: Array<ClientInstance> = [];
  metricName: string = "";

  protected constructor(
    protected clientService: ClientService,
    protected metricService: MetricService
  ) {
  }

  abstract reloadChart(): void;

  getData(): void {
    this.clientList = [];
    this.metricList = [];
    if (this.clientInstanceId !== undefined) {
      if (this.clientInstanceId === 'all') {
        this.clientService.getAllByAppKey().subscribe(res => {
          this.clientList = res
          for (let client of this.clientList) {
            let metrics: Array<Metric> = [];
            this.metricService.getAllByClientInstanceIdAndMeasurementName(client.id, this.metricName).subscribe(res => {
              metrics = res
              this.metricList.push(metrics);
              this.reloadChart();
            });
          }
        });
      } else {
        this.clientService.getAllByAppKey().subscribe(res => {
          for (let client of res) {
            if (client.id === this.clientInstanceId)
              this.clientList.push(client);
          }
          this.metricService.getAllByClientInstanceIdAndMeasurementName(this.clientInstanceId ?? "", this.metricName).subscribe(res => {
            this.metricList.push(res);

            this.reloadChart();
          });
        });
      }
    }
  }

  getRandomColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  updateChart(clientInstanceId: string | undefined) {
    if (clientInstanceId !== undefined && clientInstanceId !== null)
      this.clientInstanceId = clientInstanceId;
    else
      this.clientInstanceId = 'all';

    this.getData();
  }
}
