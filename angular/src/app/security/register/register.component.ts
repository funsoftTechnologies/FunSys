import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { AuthService } from "../auth.service";
import { AlertService } from "../../alert/alert.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  registerForm: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private _alertService: AlertService
    ) {
    this._authService.logout();
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(10)]],
      email:    ['', [Validators.required, Validators.email, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      confirmedPassword: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit() {

    this._authService.register(this.registerForm.value)
      .subscribe(
        response => {
          console.log(response)
          this._alertService.success('Registration successful');
          this.router.navigateByUrl('/login');
        },
        error => {
          console.log('error: ' + error);
          this._alertService.error('Echec de la sauvegarde!');
        });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.registerForm.controls[controlName].hasError(errorName);
  }

}
