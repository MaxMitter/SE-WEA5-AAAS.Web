import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Action, ActionType} from "../../shared/action/action";
import 'bootstrap'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActionService} from "../../shared/action/action.service";

@Component({
  selector: 'app-action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.css']
})
export class ActionCardComponent implements OnInit {

  @Input() action = new Action();
  @Output() onActionDelete = new EventEmitter<any>();
  @Input() isNew: boolean = false;
  @Input() clientInstanceId: string = "";
  isEditMode: boolean = false;
  actionForm!: FormGroup;
  actionTypes = Object.keys(ActionType);

  constructor(private fb: FormBuilder, private actionService: ActionService) {

  }

  ngOnInit(): void {
    this.actionForm = this.fb.group({
      target: [this.action.actionTarget, [Validators.required]],
      typeSelector: [this.action.actionType]
    })

    this.onTypeChanged();

    if (this.isNew) {
      this.isEditMode = true;
    }
  }

  get controls() {
    return this.actionForm.controls;
  }

  saveChanges(): void {
    this.action.actionType = this.controls.typeSelector.value;
    this.action.actionTarget = this.controls.target.value;

    if (this.isNew) {
      this.action.clientInstanceId = this.clientInstanceId;
      this.actionService.createAction(this.action).subscribe();
      this.isEditMode = false;
    } else {
      if (this.actionService.updateAction(this.action).subscribe())
        this.isEditMode = false;
    }
  }

  onTypeChanged() {
    let value = this.controls.typeSelector.value;
    if (value === "Email") {
      this.actionForm.get('target')?.addValidators(Validators.email);
    } else {
      this.actionForm.get('target')?.removeValidators(Validators.email);
    }

    this.actionForm.get('target')?.updateValueAndValidity();
  }

  setEditMode(b: boolean) {
    if (b) {
      this.actionForm = this.fb.group({
        target: [this.action.actionTarget, [Validators.required]],
        typeSelector: [this.action.actionType]
      });

      this.onTypeChanged();
      this.isEditMode = true;
    }
  }

  deleteAction() {
    this.onActionDelete.emit(this.action.id);
  }
}
