import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ContactComponent } from './components/contact/contact.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ListEmployeeComponent } from './components//employee/list-employee/list-employee.component';



const routes: Routes = [
  
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
  
    { path:'', 
      component:HomeComponent
    },
    { path:'', 
     component:SidebarComponent,

     children:[
        { path: 'employee', loadChildren: './components/employee/employee.module#EmployeeModule' },
     ]
     
    },
    { path: '**',
      component: PagenotfoundComponent 
    }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
