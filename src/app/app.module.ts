import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { SharedDataModule } from './modules/shared-data/shared-data.module';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { NavComponent } from './core/components/nav/nav.component';
import { SpinnerComponent } from './core/components/spinner/spinner.component';
import { BillsComponent } from './components/bills/bills.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavComponent,
    SpinnerComponent,
    BillsComponent,
  ],
  entryComponents: [
    RegisterComponent,
    LoginComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    SharedDataModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [SharedDataModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
