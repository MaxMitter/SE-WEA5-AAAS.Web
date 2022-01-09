import {Component, Input, OnInit} from '@angular/core';
import {Detector} from "../../shared/detector/detector";

@Component({
  selector: 'app-detector-card',
  templateUrl: './detector-card.component.html',
  styleUrls: ['./detector-card.component.css']
})
export class DetectorCardComponent implements OnInit {

  @Input() detector: Detector = new Detector();

  constructor() { }

  ngOnInit(): void {
  }

}
