import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { SearchEmployeeComponent } from './search-employee/search-employee.component';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { SidebarComponent } from '../../components/shared/sidebar/sidebar/sidebar.component';

import{EmployeeService} from './services/employee.service';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
    PerfectScrollbarModule
  ],
  declarations: [
    AddEmployeeComponent,
    SearchEmployeeComponent,
    ListEmployeeComponent,
    SidebarComponent
  ],
  providers:[
    {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    EmployeeService
  ]
})
export class EmployeeModule { }
