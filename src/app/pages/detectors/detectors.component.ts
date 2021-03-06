import {Component, OnInit} from '@angular/core';
import {Detector} from "../../shared/detector/detector";
import {DetectorService} from "../../shared/detector/detector.service";
import {ClientInstance} from "../../shared/client/client-instance";

@Component({
  selector: 'app-detectors',
  templateUrl: './detectors.component.html',
  styleUrls: ['./detectors.component.css']
})
export class DetectorsComponent implements OnInit {

  detectorList: Detector[] = [];
  currentClientInstance: ClientInstance | null = null;
  showNewForm: boolean = false;

  constructor(
    private detectorService: DetectorService
  ) {
  }

  ngOnInit(): void {
    this.loadDetectors();
  }

  loadDetectors() {
    if (this.currentClientInstance != null) {
      this.detectorService.getAllByClientInstance(this.currentClientInstance.id).subscribe(res => {
        this.detectorList = res;
      });
    }
  }

  onClientChanged(clientInstance: ClientInstance) {
    this.currentClientInstance = clientInstance;
    this.loadDetectors();
  }

  removeDetector(detectorId: string | undefined) {
    if (detectorId === undefined) {
      this.detectorList = this.detectorList.filter(detector => detector.id != detectorId);
    } else {
      if (this.detectorService.delete(detectorId).subscribe()) {
        this.detectorList = this.detectorList.filter(detector => detector.id != detectorId);
      }
    }
  }

  newDetector() {
    this.showNewForm = true;
  }

  saveNewDetector(detector: Detector) {
    this.detectorList.unshift(detector);
    this.showNewForm = false;
  }
}
