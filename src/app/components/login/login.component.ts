import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IHttpResponse } from 'src/app/core/interfaces/ihttp-response';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  constructor(
    private _formBuilder: FormBuilder, 
    private _localstorage: LocalStorageService, 
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
    })
  }

  /**
   * ---
   * Login User
   * ---
   * @name loginUser
   * @description This method is used to login a user.
   * @returns {Observable<IHttpResponse>}
   */
  loginUser() {
    this._authService.loginUser(this.loginForm.value).subscribe(
      (response: IHttpResponse) => {
        if (response.status) {
          console.log(response);
          this._localstorage.set('token', response.data.token);
          this._localstorage.set('user', JSON.stringify(response.data.user));
          this._localstorage.set('role', response.data.user.role);
          this._authService.loggedIn.next(true);
          this._snackBar.open('Login Successful', '', { duration: 2000 });
          this._router.navigate(['/home']);
        }
      },
      (error: any) => {
        this._snackBar.open(error.error.message, 'CLOSE', { duration: 2000 });
        // this._snackBar.open('We couldn\'t log you in, please try again!', '', { duration: 2000 });
      }
    )
  }
}
