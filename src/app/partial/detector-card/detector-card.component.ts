import {Component, Input, OnInit} from '@angular/core';
import {Detector} from "../../shared/detector/detector";
import {DetectorService} from "../../shared/detector/detector.service";

@Component({
  selector: 'app-detector-card',
  templateUrl: './detector-card.component.html',
  styleUrls: ['./detector-card.component.css']
})
export class DetectorCardComponent implements OnInit {

  @Input() detector: Detector = new Detector();

  isEditMode: boolean = true;

  constructor(
    private detectorService: DetectorService
  ) { }

  ngOnInit(): void {
  }

  toggleDetector() {
    this.detector.isActive = !this.detector.isActive;
    if (this.detectorService.update(this.detector)) {
      // TODO post toast message.
    }
  }
}
