import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from "rxjs/operators"
@Component({
  selector: 'add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
  
})
export class AddEmployeeComponent implements OnInit {
  // emp_operation : string;
  constructor(private _route : ActivatedRoute) { }

  ngOnInit() {


    // this._route.paramMap.subscribe(params => {   
    //   this.emp_operation = params.get("operation")
    // })
   

   }

}
