import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Detector, ListOperation} from "../../shared/detector/detector";
import {DetectorService} from "../../shared/detector/detector.service";
import {Action} from "../../shared/action/action";
import {ActionService} from "../../shared/action/action.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TicksToTimespanPipe, TimespanContainer} from "../../pipes/ticksToTimespanPipe";
import {TimespanToTicksPipe} from "../../pipes/timespan-to-ticks-pipe";

@Component({
  selector: 'app-detector-card',
  templateUrl: './detector-card.component.html',
  styleUrls: ['./detector-card.component.css']
})
export class DetectorCardComponent implements OnInit {

  @Output() onDetectorDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onNewDetectorSave: EventEmitter<any> = new EventEmitter<any>();
  @Input() detector: Detector = new Detector();
  @Input() isNew: boolean = false;
  @Input() currentClientId: string = "";
  selectedAction: Action = new Action();
  actions: Action[] = [];

  isEditMode: boolean = false;
  detectorForm!: FormGroup;

  operations = Object.keys(ListOperation);

  constructor(
    private detectorService: DetectorService,
    private actionService: ActionService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {

    if(this.isNew)
      this.isEditMode = true;

    this.initForm();
  }

  private initForm() {
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
      operationSelector: [null],
    });
    this.detectorForm.get("operationSelector")?.setValue(this.detector.listOperation);
    this.actionService.getAllByClientInstanceId(this.detector.clientInstanceId?? this.currentClientId).subscribe(res => {
      this.actions = res
      this.actions.forEach(action => {
        if (action.id == this.detector.detectorActionId) {
          this.selectedAction = action;
          this.detectorForm.get("actionSelector")?.setValue(action.id);
          return;
        }
      });
    });
  }

  toggleDetector() {
    this.detector.isActive = !this.detector.isActive;
    if (this.detectorService.update(this.detector)) {
    }
  }

  get controls() {
    return this.detectorForm.controls;
  }

  get fromTimeValid() {
    return this.controls.fromTimeHours.valid && this.controls.fromTimeMinutes.valid
      && this.controls.fromTimeSeconds.valid && this.controls.fromTimeMilliseconds.valid;
  }

  get toTimeValid() {
    return this.controls.toTimeHours.valid && this.controls.toTimeMinutes.valid
      && this.controls.toTimeSeconds.valid && this.controls.toTimeMilliseconds.valid;
  }

  onSubmit() {
    let pipe = new TimespanToTicksPipe();
    let fromTime = new TimespanContainer(
      this.controls.fromTimeHours.value,
      this.controls.fromTimeMinutes.value,
      this.controls.fromTimeSeconds.value,
      this.controls.fromTimeMilliseconds.value,
    );
    let toTime = new TimespanContainer(
      this.controls.toTimeHours.value,
      this.controls.toTimeMinutes.value,
      this.controls.toTimeSeconds.value,
      this.controls.toTimeMilliseconds.value,
    );

    if (this.isNew) {
      let newDetector = new Detector(
        undefined,
        this.detector.clientInstanceId ?? this.currentClientId,
        this.controls.measurementName.value,
        this.controls.detectorName.value,
        this.controls.minValue.value,
        this.controls.maxValue.value,
        this.controls.detectorInterval.value,
        pipe.transform(fromTime),
        pipe.transform(toTime),
        this.controls.lastMeasures.value,
        this.controls.operationSelector.value,
        this.controls.maxOutliers.value,
        this.controls.actionSelector.value,
        false
      );

      this.detectorService.save(newDetector).subscribe();
      this.onNewDetectorSave.emit(newDetector);
    } else {
      let updated = new Detector(
        this.detector.id,
        this.detector.clientInstanceId,
        this.controls.measurementName.value,
        this.controls.detectorName.value,
        this.controls.minValue.value,
        this.controls.maxValue.value,
        this.controls.detectorInterval.value,
        pipe.transform(fromTime),
        pipe.transform(toTime),
        this.controls.lastMeasures.value,
        this.controls.operationSelector.value,
        this.controls.maxOutliers.value,
        this.controls.actionSelector.value,
        this.detector.isActive
      );

      if (this.detectorService.update(updated).subscribe()) {
        this.detector = updated;
        this.isEditMode = false;
      }
    }
  }

  deleteDetector() {
    this.onDetectorDelete.emit(this.detector.id);
  }

  cancelEdit() {
    if (this.isNew)
      this.deleteDetector();

    this.isEditMode = false;
    this.initForm();
  }
}
