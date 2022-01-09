import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Metric} from "../../shared/metric/metric";
import {MetricService} from "../../shared/metric/metric.service";
import {ClientInstance} from "../../shared/client/client-instance";
import {DataTablesModule} from "angular-datatables";
import {Subject} from "rxjs";

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  metricList: Metric[] = [];
  headerList: Array<any> = [];
  showCounter: boolean = false;
  showMeasurement: boolean = false;
  showTimer: boolean = false;
  currentClientInstance: ClientInstance | null = null;

  constructor(
    private metricService: MetricService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.reloadData();

    this.headerList.push({
      title: 'ID'
    }, {
      title: 'Measurement Name'
    }, {
      title: 'Created At'
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 15,
      columns: this.headerList
    };
  }

  onClientChanged(client: ClientInstance | null) : void {
    this.currentClientInstance = client;
    this.reloadData();
  }

  reloadData() : void{
    if (this.currentClientInstance !== null) {
      if (this.showCounter) {

      }
      this.metricService.getAllByClientInstanceId(this.currentClientInstance.id).subscribe(res => {
        this.metricList = res
        this.dtTrigger.next();
      });
    }
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  toggleCounter() {
    if ($(`#counterMetric`).is(':checked')) {
      this.showCounter = true;
      this.headerList.push({title: 'Counter'});
    } else {
      this.showCounter = false;
      this.headerList = this.headerList.filter(header => header.title !== 'Counter');
    }
    this.cdRef.detectChanges();
  }

  toggleMeasurement() {
    if ($(`#measurementMetric`).is(':checked')) {
      this.showMeasurement = true;
      this.headerList.push({title: 'Measurement'});
    } else {
      this.showMeasurement = false;
      this.headerList = this.headerList.filter(header => header.title !== 'Measurement');
    }
    this.cdRef.detectChanges();
  }

  toggleTimer() {
    if ($(`#timerMetric`).is(':checked')) {
      this.showTimer = true;
      this.headerList.push({title: 'Time taken'});
    } else {
      this.showTimer = false;
      this.headerList = this.headerList.filter(header => header.title !== 'Time taken');
    }
    this.cdRef.detectChanges();
  }
}
