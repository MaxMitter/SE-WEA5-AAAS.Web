import {Component, Input, OnInit} from '@angular/core';
import {Detector, ListOperation} from "../../shared/detector/detector";
import {DetectorService} from "../../shared/detector/detector.service";
import {Action} from "../../shared/action/action";
import {ActionService} from "../../shared/action/action.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-detector-card',
  templateUrl: './detector-card.component.html',
  styleUrls: ['./detector-card.component.css']
})
export class DetectorCardComponent implements OnInit {

  @Input() detector: Detector = new Detector();

  actions: Action[] = [];

  isEditMode: boolean = true;
  detectorForm: FormGroup;

  operations = Object.keys(ListOperation);

  constructor(
    private detectorService: DetectorService,
    private actionService: ActionService,
    private fb: FormBuilder
  ) {
    this.detectorForm = this.fb.group({
      'actionSelector': [null],
      'operationSelector': [null]
    });
  }

  ngOnInit(): void {
    this.actionService.getAllByClientInstanceId(this.detector.clientInstanceId ?? '').subscribe(res => {
      this.actions = res
      this.actions.forEach(action => {
        if (action.id == this.detector.detectorActionId) {
          this.detectorForm.get("actionSelector")?.setValue(action.id);
          return;
        }
      });
    });

    this.detectorForm.get("operationSelector")?.setValue(this.detector.listOperation);
  }

  toggleDetector() {
    this.detector.isActive = !this.detector.isActive;
    if (this.detectorService.update(this.detector)) {
      // TODO post toast message.
    }
  }
}
