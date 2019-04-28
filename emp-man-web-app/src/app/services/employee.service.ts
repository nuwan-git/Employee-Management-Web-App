import { Injectable } from '@angular/core';


import {Http,Response, Headers, RequestOptions} from '@angular/http';
import {Observable, throwError}  from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import {Employee} from "../models/employee";
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeObj = new Employee;
  private baseUrl:string ='http://localhost:8020/emp-api';
  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers})  
  constructor(private _http : Http) { }

  createEmployee(employee:Employee){
    return this._http.post(this.baseUrl+'/employee',JSON.stringify(employee), this.options)
    .pipe(
        map((response:Response)=> 
             (response:Response)=> response.json()),catchError(this.errorHandle)
        );
  }

  errorHandle(error:Response){
    return Observable.throw(error || "Server ERROR")
  }

  setter(employee:Employee){
    this.employeeObj = employee;
  }

  getter(){
    return this.employeeObj;
  }
}
