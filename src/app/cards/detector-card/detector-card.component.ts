import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Detector, ListOperation} from "../../shared/detector/detector";
import {DetectorService} from "../../shared/detector/detector.service";
import {Action} from "../../shared/action/action";
import {ActionService} from "../../shared/action/action.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TicksToTimespanPipe} from "../../pipes/ticksToTimespanPipe";

@Component({
  selector: 'app-detector-card',
  templateUrl: './detector-card.component.html',
  styleUrls: ['./detector-card.component.css']
})
export class DetectorCardComponent implements OnInit {

  @Output() onDetectorDelete: EventEmitter<any> = new EventEmitter<any>();

  autohideToast: boolean = true;
  show: boolean = false;
  selectedAction: Action = new Action();

  @Input() detector: Detector = new Detector();

  actions: Action[] = [];

  isEditMode: boolean = false;
  isValid: boolean = true;
  detectorForm!: FormGroup;

  operations = Object.keys(ListOperation);

  constructor(
    private detectorService: DetectorService,
    private actionService: ActionService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.actionService.getAllByClientInstanceId(this.detector.clientInstanceId ?? '').subscribe(res => {
      this.actions = res
      this.actions.forEach(action => {
        if (action.id == this.detector.detectorActionId) {
          this.selectedAction = action;
          this.detectorForm.get("actionSelector")?.setValue(action.id);
          return;
        }
      });
    });

    let pipe = new TicksToTimespanPipe();
    let fromTime = pipe.transform(this.detector.fromTime);
    let toTime = pipe.transform(this.detector.toTime);
    this.detectorForm = this.fb.group({
      detectorName: [this.detector.name, [Validators.required]],
      measurementName: [this.detector.measurementName, [Validators.required]],
      detectorInterval: [this.detector.detectorInterval, [Validators.min(0)]],
      fromTimeHours: [fromTime.hours, [Validators.min(0)]],
      fromTimeMinutes: [fromTime.mins, [Validators.min(0)]],
      fromTimeSeconds: [fromTime.secs, [Validators.min(0)]],
      fromTimeMilliseconds: [fromTime.ms, [Validators.min(0)]],
      toTimeHours: [toTime.hours, [Validators.min(0)]],
      toTimeMinutes: [toTime.mins, [Validators.min(0)]],
      toTimeSeconds: [toTime.secs, [Validators.min(0)]],
      toTimeMilliseconds: [toTime.ms, [Validators.min(0)]],
      minValue: [this.detector.minValue, [Validators.min(0)]],
      maxValue: [this.detector.maxValue, [Validators.min(0)]],
      lastMeasures: [this.detector.lastMeasures, [Validators.min(0)]],
      maxOutliers: [this.detector.maxOutliers, [Validators.min(0)]],
      actionSelector: [null],
      operationSelector: [null]
    });
    this.detectorForm.get("operationSelector")?.setValue(this.detector.listOperation);
  }

  onChange() {
    this.detectorForm.controls["detectorName"].setValidators(Validators.requiredTrue);
    this.detectorForm.controls["measurementName"].setValidators(Validators.requiredTrue);
    this.detectorForm.controls["detectorInterval"].setValidators(Validators.min(0));
    this.detectorForm.controls["detectorInterval"].setValidators(Validators.min(0));
    this.detectorForm.controls["fromTimeHours"].setValidators(Validators.min(0));
    this.detectorForm.controls["fromTimeMinutes"].setValidators(Validators.min(0));
    this.detectorForm.controls["fromTimeSeconds"].setValidators(Validators.min(0));
    this.detectorForm.controls["fromTimeSeconds"].setValidators(Validators.min(0));
    this.detectorForm.controls["fromTimeMilliseconds"].setValidators(Validators.min(0));
    this.detectorForm.controls["toTimeHours"].setValidators(Validators.min(0));
    this.detectorForm.controls["toTimeMinutes"].setValidators(Validators.min(0));
    this.detectorForm.controls["toTimeSeconds"].setValidators(Validators.min(0));
    this.detectorForm.controls["toTimeMilliseconds"].setValidators(Validators.min(0));
    this.detectorForm.controls["minValue"].setValidators(Validators.min(0));
    this.detectorForm.controls["maxValue"].setValidators(Validators.min(0));
    this.detectorForm.controls["lastMeasures"].setValidators(Validators.min(0));
    this.detectorForm.controls["maxOutliers"].setValidators(Validators.min(0));
  }

  toggleDetector() {
    this.detector.isActive = !this.detector.isActive;
    if (this.detectorService.update(this.detector)) {
      this.show = true;
    }
  }

  displayFieldCss(field: string) {
    return {
      'alert-danger': !this.isFieldValid(field)
    }
  }

  isFieldValid(field: string) {
    console.log(`${field} is valid? ${this.detectorForm.get(field)?.valid}, was touched? ${this.detectorForm.get(field)?.touched}`);
    console.log(this.detectorForm.get(field));
    return this.detectorForm.get(field)?.valid && !this.detectorForm.get(field)?.touched;
  }

  onSubmit() {
    if (this.detectorForm.valid) {
      console.log("valid");
      //this.clientService.updateClient(this.client.id, this.form.get('identifier')?.value).subscribe(res => {});
      this.isValid = true;
      this.isEditMode = false;
    } else {
      console.log("invalid");
      this.isValid = false;
    }
  }

  deleteDetector() {
    this.onDetectorDelete.emit(this.detector.id);
    // TODO remove detector
  }
}
