import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from "rxjs";
import { MatDialogRef } from '@angular/material/dialog';
import { DBOperation } from "../../../shared/enum";

import { Medication } from "../medication";
import { MedicationService } from '../medication.service';

@Component({
  selector: 'app-medication-detail',
  templateUrl: './medication-detail.component.html',
  styleUrls: ['./medication-detail.component.css']
})

export class MedicationDetailComponent implements OnInit {

  medicationss$!: Observable<Medication[]>;

  dbOps!: DBOperation;
  modalTitle!: string;
  modalBtnTitle!: string;

  medication!: Medication;
  medicationForm!: FormGroup;


  formErrors = {
    name: '',
    laboratory:'',
    type: '',
    quantity: '',
  };

  validationMessages = {
    name: { maxlength: 'Name cannot be more than 50 characters long.', required: 'Name is required.' },
    laboratory: { maxlength: 'Laboratory name cannot be more than 50 characters long.', required: 'Laboratory Name is required.' },
    type: { maxlength: 'Type cannot be more than 50 characters long.', required: 'Type is required.' },
    quantity: { required: 'Quantity is required.' },
  };

  constructor(private fb: FormBuilder,
              private medicationService: MedicationService,
              public dialogRef: MatDialogRef<MedicationDetailComponent>) {
  }

  ngOnInit(): void {

    this.medicationss$ = this.medicationService.getAll();

    this.medicationForm = this.fb.group({
      id:    [''],
      name:  ['', [Validators.required, Validators.maxLength(50)]],
      laboratory: ['', [Validators.required, Validators.maxLength(50)]],
      type:  ['', [Validators.required, Validators.maxLength(50)]],
      quantity:  ['', Validators.required],
    });

    if (this.dbOps === DBOperation.create) {
      this.medicationForm.reset();
    } else {
      console.log(this.medication);
      this.medicationForm.setValue(this.medication);
    }

    this.SetControlsState(this.dbOps !== DBOperation.delete);
  }

  SetControlsState(isEnable: boolean) {
    isEnable ? this.medicationForm.enable() : this.medicationForm.disable();
  }

  onSubmit() {
    console.log(this.medicationForm.value);
    switch (this.dbOps) {

      case DBOperation.create:
        this.medicationService.post(this.medicationForm.value).subscribe(
          data => this.dialogRef.close('success'),
          error => this.dialogRef.close('error')
        );
        break;

      case DBOperation.update:
        this.medicationService.put(this.medicationForm.value).subscribe(
          data => this.dialogRef.close('success'),
          error => this.dialogRef.close('error')
        );
        break;

      case DBOperation.delete:
        this.medicationService.delete(this.medicationForm.value.id).subscribe(
          data => this.dialogRef.close('success'),
          error => this.dialogRef.close('error')
        );
        break;
    }
  }
}
