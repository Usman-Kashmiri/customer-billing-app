import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Customer Billing Application';
  loading: Boolean = false;

  constructor() { }


  ngOnInit() {
  }
}
