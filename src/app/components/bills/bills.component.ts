import { Component, OnInit } from '@angular/core';
import { IBill } from 'src/app/core/interfaces/ibill';
import { IHttpResponse } from 'src/app/core/interfaces/ihttp-response';
import { BillsService } from 'src/app/services/bills/bills.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})

export class BillsComponent implements OnInit {
  bills: IBill[] = [];
  resultLength: Number = 0;
  displayedColumn: Array<String> = ['name', 'username', 'amount', 'paid', 'category', 'subcategory', 'due_date'];
  constructor(
    private _billService: BillsService
  ) { }

  ngOnInit(): void {
    this._billService.getBills().pipe().subscribe((res: IHttpResponse) => {
      this.bills = res.data;
      console.log(this.bills)
    });
  }
}
