import {Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Appareil } from "./appareil/appareil";
import { DBOperation } from "../../shared/enum";
import { AlertService } from "../../alert/alert.service";
import { AppareilService } from "./appareil.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-appareils',
  templateUrl: './appareils.component.html',
  styleUrls: ['./appareils.component.css']
})
export class AppareilsComponent {

  power = false;
  dbOps!: DBOperation;
  modalTitle!: string;
  modalBtnTitle!: string;

  appareils: Appareil[] = [];
  appareil: Appareil;

  constructor(private appareilService: AppareilService,
              private alertService: AlertService,
              public dialog: MatDialog) {
    this.getAll();
  }

  getAll(): void {
    this.appareilService.getAll()
      .subscribe(data => {
        this.appareils = data;
      },
        error => {
          this.alertService.error('Access Forbidden !')
      });
  }


  addAppareil() {
    this.dbOps = DBOperation.create;
    this.modalTitle = 'Add New Appareil';
    this.modalBtnTitle = 'Add';
    this.openDialog();
  }

  editAppareil(appareil: Appareil) {
    this.dbOps = DBOperation.update;
    this.modalTitle = 'Edit Appareil';
    this.modalBtnTitle = 'Update';
    this.appareil = appareil;
    this.openDialog();
  }

  deleteAppareil(appareil: Appareil) {
    this.dbOps = DBOperation.delete;
    this.modalTitle = 'Confirm to Delete?';
    this.modalBtnTitle = 'Delete';
    this.appareil = appareil;
    this.openDialog();
  }

  onPower() {
    this.power = !this.power;
    for (let i = 0; i < this.appareils.length; i++) {
      if(this.power)
        this.appareils[i].status = 'on'
      else
        this.appareils[i].status = 'off'
      console.log(this.appareils[i])
    }
  }

  statusEvent(appareil: Appareil) {
    for (let i = 0; i < this.appareils.length; i++) {
      if(this.appareils[i].name == appareil.name)
        this.appareils[i].status = appareil.status
    }
    for (let i = 0; i < this.appareils.length; i++) {
      console.log(this.appareils[i])
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AppareilDialog, {
      width: '250px',
    });

    dialogRef.componentInstance.dbOps = this.dbOps;
    dialogRef.componentInstance.modalTitle = this.modalTitle;
    dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
    dialogRef.componentInstance.appareil = this.appareil;

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {

        this.getAll();

        switch (this.dbOps) {
          case DBOperation.create:
            this.alertService.success('Data successfully added.');
            break;
          case DBOperation.update:
            this.alertService.success('Data successfully updated.');
            break;
          case DBOperation.delete:
            this.alertService.success('Data successfully deleted.');
            break;
        }
      }
    });
  }
}

@Component({
  selector: 'appareil-dialog',
  templateUrl: 'appareil.dialog.html',
})
export class AppareilDialog implements OnInit {

  appareil: Appareil;
  appareilForm: FormGroup;

  dbOps!: DBOperation;
  modalTitle!: string;
  modalBtnTitle!: string;

  formErrors = {
    name: '',
    status: ''
  };

  constructor(private fb: FormBuilder,
              private appareilService: AppareilService,
              public dialogRef: MatDialogRef<AppareilDialog>) {}

  ngOnInit(): void {
    this.appareilForm = this.fb.group({
      name:   ['', [Validators.required, Validators.maxLength(25)]],
      status: ['', [Validators.required, Validators.maxLength(25)]],
    });

    if (this.dbOps === DBOperation.create) {
      this.appareilForm.reset();
    } else {
      console.log(this.appareil);
      this.appareilForm.setValue(this.appareil);
    }
    this.SetControlsState(this.dbOps !== DBOperation.delete);
  }


  SetControlsState(isEnable: boolean) {
    isEnable ? this.appareilForm.enable() : this.appareilForm.disable();
  }

  onSubmit() {
    console.log(this.appareilForm.value);
    switch (this.dbOps) {

      case DBOperation.create:
        this.appareilService.post(this.appareilForm.value).subscribe(
          data => this.dialogRef.close('success'),
          error => this.dialogRef.close('error')
        );
        break;

      case DBOperation.update:
        this.appareilService.put(this.appareilForm.value).subscribe(
          data => this.dialogRef.close('success'),
          error => this.dialogRef.close('error')
        );
        break;

      case DBOperation.delete:
        this.appareilService.delete(this.appareilForm.value.id).subscribe(
          data => this.dialogRef.close('success'),
          error => this.dialogRef.close('error')
        );
        break;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
