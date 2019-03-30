import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from "../../models/employee";
import { EmployeeService } from '../../services/employee.service';
import {Router, Route} from '@angular/router';
import { throwError } from 'rxjs'; 
@Component({
  selector: 'add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css','./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit, AfterViewInit{

  private name: string;
  private employeeObj = new Employee();
  private employee = {
    name : '',
    address : '',
    email : '',
    contactNumber : '',
    gender : ''

  }

  //create a focus for userame when reload happen @viewChild decorator use
  @ViewChild('nameRef') nameElementRef: ElementRef;

  ngAfterViewInit () {
    this.nameElementRef.nativeElement.focus();
    console.log(this.nameElementRef);
  }

  constructor(private route : ActivatedRoute, private _employeeService : EmployeeService, 
    private _router: Router) { }

  ngOnInit() {
     this.route.params.subscribe(params => {
      this.name = params['event-name'];
      });
      console.log(this.name);
  }

  processEmployeeRegistrationForm () {

    this.employeeObj.name = this.employee.name;
    this.employeeObj.address = this.employee.address;
    this.employeeObj.email = this.employee.email;
    this.employeeObj.contactNumber = this.employee.contactNumber;
    this.employeeObj.gender = this.employee.gender? 'male' : 'female';
    this.employeeObj.isActive =true;

    this._employeeService.createEmployee(this.employeeObj).subscribe((rec)=>{
     
      this._router.navigate(['sidebar/add-employee/add-employee?filter=Add-Employee']);
    },(error)=>{
      console.log(error);
    });

  }

}
