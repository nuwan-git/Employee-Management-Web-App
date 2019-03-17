package com.api.empmanapi.controller;

import com.api.empmanapi.entity.Employee;
import com.api.empmanapi.service.EmployeeService;
import com.api.empmanapi.utility.ErrorDetails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping(value = "/emp-api")
public class EmployeeController {

    public static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    @Autowired()
    private EmployeeService employeeService;

    @PostMapping(value = "/employee")
    public ResponseEntity<?> createEmployee (@RequestBody Employee employee, UriComponentsBuilder ucBuilder) {

        logger.info("Creating Employee : {} ", employee);

        if (employeeService.finByEmail(employee).size() != 0) {

            logger.error("Unable to create. A Employee  email {} already exist", employee.getEmail(),
                    employee.getEmail());
            ErrorDetails errorDetails = new ErrorDetails(new Date(),
                    "Unable to create. A Employee with "+employee.getEmail()+ " email already exist.", "");
            return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);

        }

        Employee persistEmpl = employeeService.createEmployee(employee);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/emp-api/employee/{id}").buildAndExpand(employee.getId()).toUri());
        return new ResponseEntity<String>(headers, HttpStatus.CREATED);

    }

    @RequestMapping(value = "/employee/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getEmployee(@PathVariable("id") Integer id) {
        logger.info("Fetching Employee with id {}", id);
        Employee employee = employeeService.findById(id);
        if (Optional.ofNullable(employee).isPresent()) {

            return new ResponseEntity<Employee>(employee, HttpStatus.OK);

        } else {

            logger.error("User with id {} not found.", id);
            return new ResponseEntity(new ErrorDetails(new Date(),"User with id " + id
                    + " not found", ""), HttpStatus.NOT_FOUND);

        }

    }

    @PutMapping(value = "/employee")
    public ResponseEntity<?> updateEmployee (@RequestBody Employee employee) {

        logger.info("Updating Employee with id {}", employee.getId());

        Employee currentEmployee = employeeService.findById(employee.getId());

        if (currentEmployee == null) {
            logger.error("Unable to update. Employee with id {} not found.", employee.getId());
            return new ResponseEntity(new ErrorDetails(new Date(),"Unable to upate. User with id " + employee.getId() + " not found.",""),
                    HttpStatus.NOT_FOUND);
        }

        currentEmployee.setActive(employee.isActive());
        currentEmployee.setName(employee.getName());
        currentEmployee.setGender(employee.getGender());
        currentEmployee.setEmail(employee.getEmail());
        currentEmployee.setContactNumber(employee.getContactNumber());
        employeeService.updateEmployee(currentEmployee);

        return new ResponseEntity<Employee>(currentEmployee, HttpStatus.OK);

    }

    @DeleteMapping(value = "/employee")
    public ResponseEntity<?> deleteEmployee (@RequestBody Employee employee){

        logger.info("Fetching & Deleting User with id {}", employee.getId());

        Employee currentEmployee = employeeService.findById(employee.getId());

        if (currentEmployee == null) {
            logger.error("Unable to delete. Employee with id {} not found.", employee.getId());
            return new ResponseEntity(new ErrorDetails(new Date(),"Unable to upate. User with id " + employee.getId() + " not found.",""),
                    HttpStatus.NOT_FOUND);
        }

        currentEmployee.setActive(false);

        employeeService.updateEmployee(currentEmployee);

        return new ResponseEntity<Employee>(HttpStatus.NO_CONTENT);
    }


}
