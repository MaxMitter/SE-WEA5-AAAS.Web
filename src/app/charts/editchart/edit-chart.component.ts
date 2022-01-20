import {Component, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-editchart',
  templateUrl: './edit-chart.component.html',
  styleUrls: ['./edit-chart.component.css']
})
export class EditChartComponent implements OnInit {

  @ViewChild('newChartForm', {static: true}) newChartForm!: NgForm;
  chart: {
    type: string,
    metric: string
  } = {
    type: '',
    metric: ''
  };
  errors: { [key: string]: string } = {};

  constructor(
    public activeModal: NgbActiveModal
  ) {
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.chart.type = this.newChartForm.value.type;

  }

  updateErrorMessages() {
    this.errors = {};
    const control = this.newChartForm.form.get("metric") || {dirty: false, invalid: false, errors: []};

    if (control &&
      control.dirty &&
      control.invalid &&
      control.errors != null &&
      control.errors['required'] &&
      !this.errors['metric']) {
      this.errors['metric'] = 'Metric name is required';
    }
  }
}
