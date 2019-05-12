import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule}from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer/footer.component';
import { AboutComponent } from './components/about/about.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import {EmployeeService} from './components/employee/services/employee.service';
// import { trigger, state, style, transition, animate } from '@angular/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar/sidebar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
//import { EmployeeModule } from './components/employee/employee.module';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    NotfoundComponent,
    ContactComponent,
    DashboardComponent,
    HomeComponent,
    SidebarComponent,
    PagenotfoundComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    AppRoutingModule,
 //   EmployeeModule
  ],
  providers: [
      {
          provide: PERFECT_SCROLLBAR_CONFIG,
          useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      }
      

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
