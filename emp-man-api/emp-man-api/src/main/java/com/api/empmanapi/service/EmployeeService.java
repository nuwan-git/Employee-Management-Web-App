package com.api.empmanapi.service;

import com.api.empmanapi.entity.Employee;
import com.api.empmanapi.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> finByEmail (Employee employee) {

        if(Optional.ofNullable(employee).isPresent()) {

           return employeeRepository.findByEmail( employee.getEmail());

        }

        return null;
    }

    public Employee createEmployee(Employee employee) {
       return employeeRepository.save(employee);
    }

    public Employee findById(Integer id) {

        if(Optional.ofNullable(id).isPresent()) {
            return employeeRepository.findById(id).get();
        }

        return  null;
    }


    public void updateEmployee(Employee currentEmployee) {

        Optional.ofNullable(currentEmployee).ifPresent( employee -> employeeRepository.save(employee));

    }
}
