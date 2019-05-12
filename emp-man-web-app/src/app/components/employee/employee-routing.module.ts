import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { SearchEmployeeComponent } from './search-employee/search-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import {SidebarComponent} from '../shared/sidebar/sidebar/sidebar.component'
const routes: Routes = [

      {path:'add-employee', component:AddEmployeeComponent},
      {path:'search-employee', component:SearchEmployeeComponent},
      {path:'list-employee', component:ListEmployeeComponent},
      {path:'edit-employee/:id', component: AddEmployeeComponent},
      {path:'', component:ListEmployeeComponent}
      
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
