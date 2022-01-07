import {Component, Input, OnInit} from '@angular/core';
import {ClientInstance} from "../../shared/client/client-instance";
import {DetectorService} from "../../shared/detector/detector.service";
import {Detector} from "../../shared/detector/detector";
import {Observable, Subscription, timer} from "rxjs";
import * as moment from 'moment';

@Component({
  selector: 'app-heartbeat',
  templateUrl: './heartbeat.component.html',
  styleUrls: ['./heartbeat.component.css']
})
export class HeartbeatComponent implements OnInit {

  @Input() client: ClientInstance = new ClientInstance("");

  isOnline?: boolean = false;
  detector: Detector = new Detector();
  refreshInterval: Observable<number> = timer(0, 5000);
  subscription: Subscription = new Subscription();

  constructor(private detectorService: DetectorService) { }

  ngOnInit(): void {
    this.getOnlineStatus();

    this.subscription = this.refreshInterval.subscribe((seconds) => {
      this.getOnlineStatus();
    });
  }

  getOnlineStatus() {
    this.detectorService.getByClientInstanceAndMeasurementName(this.client.id, 'Heartbeat')
      .subscribe(res => this.detector = res);
  }
}
