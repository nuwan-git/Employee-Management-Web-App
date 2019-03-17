import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule}from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer/footer.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar/sidebar.component';
import { AboutComponent } from './components/about/about.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';

const appRoute : Routes = [
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
            
            {path:'dashboard', component:DashboardComponent}
      
           ]
      },
      { path:'**', 
      component:NotfoundComponent
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
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
