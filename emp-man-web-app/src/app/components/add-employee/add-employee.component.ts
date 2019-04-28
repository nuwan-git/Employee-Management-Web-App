import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from "../../models/employee";
import { EmployeeService } from '../../services/employee.service';
import {Router, Route} from '@angular/router';
import { throwError } from 'rxjs'; 
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css','./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit, AfterViewInit{

  //create a focus for userame when reload happen @viewChild decorator use
  @ViewChild('nameRef') nameElementRef: ElementRef;

  ngAfterViewInit () {
    this.nameElementRef.nativeElement.focus();
    console.log(this.nameElementRef);
  }

  constructor(private route : ActivatedRoute, private _employeeService : EmployeeService, 
    private _router: Router, private fb: FormBuilder) { }

  registrationForm: FormGroup;
  ngOnInit() {
   
    this.registrationForm = this.fb.group({
      empName : ['',[Validators.required, Validators.minLength(3)]],
      email : ['', [Validators.required]],
      phoneNumber : ['', [Validators.required]],
      gender : [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        offshoreEmp : [false],
        postalCode: ['']
      })

    });

    this.registrationForm.get('address.offshoreEmp').valueChanges
    .subscribe(checkedValue => {
      const city = this.registrationForm.get('address.city');
      if (checkedValue) {
        city.setValidators(Validators.required);
      } else {
        city.clearValidators();
      }
      city.updateValueAndValidity();
    });
  }

  get empName() {
    return this.registrationForm.get('empName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get phoneNumber() {
    return this.registrationForm.get('phoneNumber');
  }

  get city() {
    return this.registrationForm.get('address.city');
  }

  

}
