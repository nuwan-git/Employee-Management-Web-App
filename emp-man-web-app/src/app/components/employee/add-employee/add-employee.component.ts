import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from "../models/employee";
import { EmployeeService } from '../services/employee.service';
import {Router, Route} from '@angular/router';
import { throwError } from 'rxjs'; 
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { PhoneNumber } from '../models/PhoneNumber';
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
  formTitle: string;
  employee: Employee;
  ngOnInit() {
   
    this.registrationForm = this.fb.group({
      empName : ['',[Validators.required, Validators.minLength(3)]],
      email : ['', [Validators.required,Validators.email]],
      phoneNumber: this.fb.array([
        this.addPhoneNumberFormGroup()
      ]
       ),
      gender : ['male'],
      address: this.fb.group({
        city: [''],
        state: ['',[Validators.required]],
        offshoreEmp : [false],
        postalCode: ['',[Validators.required]]
      })

    
    });

      //when value change this is errormesage method is going to call
      this.registrationForm.valueChanges.subscribe((data) => {

        this.logValidationErrors(this.registrationForm);
  
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

    this.route.paramMap.subscribe(params => {
      const empId = +params.get('id');
      if (empId) {
        this.formTitle = 'Update Employee';
        this.getEmployee(empId);
      } else {
        this.formTitle = 'Create Employee'
        this.employee = {
            id: null,
            empName: '',
            email: '',
            city:'',
            state:'',
            gender:'male',
            postalCode:'',
            phoneNumber:[],
            isActive:true
        }
      }
    });

   

   //end ngoninit 
  }

  getEmployee(empId:number) {
      this._employeeService.getEmployee(empId).subscribe(
        (employee:Employee) => {
          //assign original form value into employee object before edit
        this.employee = employee;
        this.editEmployee(employee);
      
      },
      (err: any) => console.log(err)
      )
  }

  editEmployee(employee: Employee) {
    console.log(employee);
    this.registrationForm.patchValue({

      empName: employee.empName,
      email: employee.email,
      gender: employee.gender,
      address: {
        city:employee.city,
        state:employee.state,
        postalCode:employee.postalCode
      }
     
    });

    this.registrationForm.setControl('phoneNumber', this.setExistingPhoneNumbers(employee.phoneNumber));

    
  }

  setExistingPhoneNumbers(numbersSet: PhoneNumber[]): FormArray {
    const formArray = new FormArray([]);
    numbersSet.forEach(s => {
      formArray.push(this.fb.group({
        phoneNumber: s.phoneNumber
      }));
    });
  
    return formArray;
  }

  validationMessages = {

    'empName' :  {
      'required': 'Name Is Required',
      'minlength': 'Name Must Be Greater Than 3 Characters'
    },
    'email' : {
      'required': 'Email Is Required',
      'email' : 'Email Should Be Valid One'
    },
    'phoneNumber' : {
      'required' : 'Phone Number Is Required',
      'minlength': 'Name Must Be Greater Than 10 Characters'
    },
    'city' : {
      'required' : 'City Is Required'
    },
    'state' : {
      'required': 'State Is Required'
    },
    'postalCode' : {
      'required': 'Postal Code Is Required'
    }

  }

  formErrors = {
    'empName' : '',
    'email' : '',
    'phoneNumber' : '',
    'state':'',
    'city':'',
    'postalCode' : '',
  }

  logValidationErrors (group: FormGroup = this.registrationForm) :void {

    Object.keys(group.controls).forEach((key:string) => {

      const abstractControl = group.get(key); //loads value for each key like username password etc
      this.formErrors[key] =''; //get formError field accrding to the keys

      if(!abstractControl.valid && abstractControl && (abstractControl.touched || abstractControl.dirty|| abstractControl.value !=='')) {
     
        const message = this.validationMessages[key]; // get error messages base on the each key
       
        for (const errorKey in abstractControl.errors) {
          if(errorKey) {
            this.formErrors[key] += message[errorKey] + '';
          }
        }
        
      }

      if(abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      } 

    });

  }

// dynamically adding phone numbers when button clicking
addPhoneNumberFormGroup () : FormGroup {

  return this.fb.group({

    phoneNumber: ['',[Validators.required]]
    
  })
  
}

addSkillButtonSkill():void {
  (<FormArray>this.registrationForm.get('phoneNumber')).push(this.addPhoneNumberFormGroup());
}

removeClickPhoneGroup(phoneNumberGroup : number) : void {
 // (<FormArray>this.registrationForm.get('phoneNumber')).removeAt(phoneNumberGroup);

  // when removing each array index need to update array as dirty and touched
  const addressFormArray = <FormArray>this.registrationForm.get('phoneNumber');
  addressFormArray.removeAt(phoneNumberGroup);
  addressFormArray.markAsDirty();
  addressFormArray.markAsTouched();
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

  onSubmit() {
    this.mapFormValuesToEmployeeModel();

    if(this.employee.id){
      this._employeeService.updateEmployee(this.employee).subscribe(
        () => this._router.navigate(['employee/list-employee']),
        (err: any) => console.log(err)
      );
    } else 
    {
      this._employeeService.addEmployee(this.employee).subscribe(
        () => this._router.navigate(['employee/list-employee']),
        (err: any) => console.log(err)
      );
    }
  }

  mapFormValuesToEmployeeModel() {
    this.employee.empName = this.registrationForm.value.empName;
    this.employee.email = this.registrationForm.value.email;
    this.employee.city = this.registrationForm.value.address.city;
    this.employee.state = this.registrationForm.value.address.state;
    this.employee.gender = this.registrationForm.value.gender;
    this.employee.postalCode = this.registrationForm.value.address.postalCode;
    this.employee.phoneNumber = this.registrationForm.value.phoneNumber;
   
  }
  

  

}


