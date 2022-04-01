import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SpinnerComponent } from 'src/app/core/components/spinner/spinner.component';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { MiscService } from 'src/app/services/misc/misc.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  user: any = this._localStorage.get('user');
  users: number = 0;
  bills: number = 0;
  server: string = '';
  categories: number = 0;
  subcategories: number = 0;
  currency: number = 0;
  amount: number = 0;
  paid: number = 0;
  constructor(
    private _localStorage: LocalStorageService,
    private _miscService: MiscService,
    private _dialog: MatDialog,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(this.user);
    this.loading = true;
    let dialogRef: MatDialogRef<SpinnerComponent> = this._dialog.open(SpinnerComponent, {
      panelClass: 'transparent',
      disableClose: true
    });

    forkJoin({
      dashboard: this._miscService.getDashboardStats(),
      server: this._miscService.getServerStats()
    }).subscribe(response => {
      console.log(response);
      if (response.dashboard.success) {
        dialogRef.close();
        this.loading = false;
        this.users = response.dashboard.data.users;
        this.bills = response.dashboard.data.bills;
        this.categories = response.dashboard.data.categories;
        this.subcategories = response.dashboard.data.subcategories;
        this.currency = response.dashboard.data.amount;
        this.paid = response.dashboard.data.paid;
        this.server = response.server.message;
      } else {
        dialogRef.close();
        this.loading = false;
        console.error(response.dashboard.message);
      }
    })
  }

  /**
   * ---
   * Bills
   * ---
   * @name bills
   * @returns {void}
   */
   showBills() {
    this._router.navigate(['/bills']);
  }
}
