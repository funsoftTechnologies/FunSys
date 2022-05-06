import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert/alert.service';
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private _authService: AuthService,
              private _alertService: AlertService) {

    this.loginForm = this.formBuilder
      .group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]});
  }

  ngOnInit() {
    this._authService.logout();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
  }

  onSubmit() {
    this._authService.login(this.loginForm.value)
      .subscribe( response => {

          localStorage.setItem('userName', JSON.stringify(response.headers.get('Username')));
          localStorage.setItem('jwtToken', JSON.stringify(response.headers.get('Authorization')));
          this.router.navigate([this.returnUrl]).then();
        },
        error => {
          this._alertService.error(error.status);
        });
  }

}

