import { Component, OnInit } from '@angular/core';

import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  title = 'Customer Billing Application';
  loading: Boolean = false;
  
  constructor(
    private _localStorageService: LocalStorageService,
    public _dialog: MatDialog,
    public _authService: AuthService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._authService.returnLoggedIn();
    this.authState = this._authService.loggedIn.value;
  }

  token: string | null | undefined = this._localStorageService.get('token');
  authState: Boolean = false;

  openRegisterDialog() {
    this._dialog.open(RegisterComponent, {
      hasBackdrop: true,
      disableClose: false,
      width: '500px',
      height: '500px',
    })
  }

  openLoginDialog() {
    this._dialog.open(LoginComponent, {
      hasBackdrop: true,
      disableClose: false,
      width: '500px',
      height: '500px',
    });
  }

  /**
   * ---
   * Check Logged In
   * ---
   * @name checkLoggedIn
   * @description Check if user is logged in
   * @returns Boolean
   */
  checkLoggedIn() {
    this._authService.returnLoggedIn();
    
  }

  /**
   * ---
   * Logut
   * ---
   * @name logout
   * @description Logout user
   * @returns void
   */
  logout() {
    this._localStorageService.remove(['token', 'user', 'role'])
    this._authService.logoutUser();
    this._authService.loggedIn.next(false);
    this._snackBar.open('You have been logged out', 'CLOSE', { duration: 2000 });
    this._router.navigate(['/'])
  }
}
