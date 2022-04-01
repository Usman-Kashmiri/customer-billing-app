import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from 'src/app/core/interfaces/iuser';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | any;
  loading: Boolean = false;
  
  constructor(
    private _formBuilder: FormBuilder, 
    private _authService: AuthService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3), Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      password_confirmation: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
    }, {
      validator: this.MustMatch('password', 'password_confirmation')
    })
  }

  /**
   * ---
   * MustMatch validator
   * ---
   * @description This validator is used to compare two fields.
   * @param {String} controlName 
   * @param {String} matchingControlName 
   * @returns 
   */
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  /**
   * ---
   * Register User
   * ---
   * @name registerUser
   * @description This method is used to register a user. 
   */
   registerUser() {
    let user: IUser = {
      email: this.registerForm.value.email,
      name: this.registerForm.value.name,
      password: this.registerForm.value.password,
      password_confirmation: this.registerForm.value.password_confirmation,
      role: 'ADMIN'
    }
    
    // Send API Request Here
    this._authService.registerUser(user).subscribe((response) => {
      if (response.success) {
        this._snackBar.open(response.message, 'Close', {
          duration: 5000,
        });
      } else {
        this._snackBar.open('Something went wrong, please try again', 'Close', {
          duration: 5000,
        });
        throw new Error(response.message);
      }
    })

   }

}
