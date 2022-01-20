import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClientInstance} from "../../shared/client/client-instance";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "../../shared/client/client.service";

@Component({
  selector: 'app-clientcard',
  templateUrl: './clientcard.component.html',
  styleUrls: ['./clientcard.component.css']
})
export class ClientcardComponent implements OnInit {

  @Input() client: ClientInstance = new ClientInstance('');
  @Output() onClientDelete: EventEmitter<any> = new EventEmitter<any>();

  isEditMode: boolean = false;

  isValid: boolean = true;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private clientService: ClientService) {
    this.form = this.formBuilder.group({
      identifier: [this.client.identifier, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      identifier: [this.client.identifier, [Validators.required]]
    });
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    }
  }

  private isFieldValid(field: string) {
    return !this.form.get(field)?.valid && this.form.get(field)?.touched;
  }

  onSubmit() {
    if (this.form.valid) {
      this.clientService.updateClient(this.client.id, this.form.get('identifier')?.value).subscribe(res => {});
      this.isValid = true;
      this.isEditMode = false;
    } else {
      this.isValid = false;
    }
  }

  cancelEdit() {
    this.isEditMode = false;
  }


  editClient() {
    this.isEditMode = true;
    this.initForm();
  }

  deleteClient() {
    if (confirm("Are you sure you want to delete the client instance? This will also remove all associated Metrics, Logs and Detectors!")) {
      this.onClientDelete.emit(this.client.id);
    }
  }
}
