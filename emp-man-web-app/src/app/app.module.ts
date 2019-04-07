import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule}from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer/footer.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar/sidebar.component';
import { AboutComponent } from './components/about/about.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { ReactiveFormsModule } from '@angular/forms';

// import { trigger, state, style, transition, animate } from '@angular/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { SearchEmployeeComponent } from './components/search-employee/search-employee.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const appRoute : Routes = [
      { path: '', redirectTo: 'sidebar', pathMatch: 'full'},
      { path:'about', 
          component:AboutComponent
       },
       { path:'home', 
        component:HomeComponent
      },
       { path:'contact', 
          component:ContactComponent
      },
      { path:'sidebar', 
          component:SidebarComponent,

          children:[
            
            // {path:'employee/:operation', component:AddEmployeeComponent},
            {path:'employee/add-employee', component:AddEmployeeComponent},
            {path:'employee/search-employee', component:SearchEmployeeComponent},
            {path:'', component:SearchEmployeeComponent}
            
          ]
      },
    
      { path:'', 
        component:HomeComponent
      }

]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    AboutComponent,
    NotfoundComponent,
    ContactComponent,
    DashboardComponent,
    HomeComponent,
    EmployeeComponent,
    AddEmployeeComponent,
    SearchEmployeeComponent,
    PagenotfoundComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    RouterModule.forRoot(appRoute)
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
