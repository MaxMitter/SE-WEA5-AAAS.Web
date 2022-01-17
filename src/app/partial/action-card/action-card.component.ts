import {Component, Input, OnInit} from '@angular/core';
import {Action, ActionType} from "../../shared/action/action";
import 'bootstrap'
import * as $ from 'jquery';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-action-card',
  templateUrl: './action-card.component.html',
  styleUrls: ['./action-card.component.css']
})
export class ActionCardComponent implements OnInit {

  @Input() action = new Action();
  isEditMode: boolean = true;
  actionForm: FormGroup;
  actionTypes = Object.keys(ActionType);

  constructor(private fb: FormBuilder) {
    this.actionForm = fb.group({
      typeSelector: this.action.actionType
    });
  }

  ngOnInit(): void {
    this.actionForm.get('typeSelector')?.setValue(this.action.actionType);
  }

  saveChanges(): void {

  }

  validateTarget(): void {
    let testString = $('#target').text();
    let url;
    try {
      url = new URL(testString);
    } catch (_) {
      // invalid
    }
  }
}
