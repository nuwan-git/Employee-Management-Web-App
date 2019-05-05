import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css', './list-employee.component.scss']
})

export class ListEmployeeComponent implements OnInit {

  activeEmployees : Employee[] = [];
  deActiveEmployees: Employee[] = new Array();
  constructor(private _employeeService: EmployeeService, private _router: Router) { }

  ngOnInit() {

    this._employeeService.getEmployees().subscribe(

      (employeeList) => {
        this.filteredOutActiveEmployees(employeeList);
      },
      (err) => {
        console.log(err);
      }

    )
  }

  editButtonClick(employeeId: number) {

    this._router.navigate(['/sidebar/employee/edit-employee', employeeId])

  }

  filteredOutActiveEmployees(employeeList: Employee[]) {

    employeeList.forEach(employee => {

      if (employee.isActive == true) {
        this.activeEmployees.push(employee);
      } else {
        this.deActiveEmployees.push(employee);
      }
    });

    console.log(this.activeEmployees)
  }



}
