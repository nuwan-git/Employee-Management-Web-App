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

      if(!abstractControl.valid && abstractControl && (abstractControl.touched || abstractControl.dirty)) {
     
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
  (<FormArray>this.registrationForm.get('phoneNumber')).removeAt(phoneNumberGroup);
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
    console.log(this.registrationForm.value);
    // this._registrationService.register(this.registrationForm.value)
    //   .subscribe(
    //     response => console.log('Success!', response),
    //     error => console.error('Error!', error)
    //   );
  }
  

  

}


