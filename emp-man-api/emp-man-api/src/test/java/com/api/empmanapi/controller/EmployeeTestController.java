package com.api.empmanapi.controller;

import com.api.empmanapi.entity.Employee;
import com.api.empmanapi.repository.EmployeeRepository;
import com.api.empmanapi.service.EmployeeService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MockMvcBuilder;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;


import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class EmployeeTestController {


    @Autowired
    private WebApplicationContext context;

    private MockMvc mockMvc;

    @InjectMocks
    private EmployeeController employeeController;

    @MockBean
    private EmployeeService employeeService;
    @Before
    public void setup() throws Exception {

        mockMvc = MockMvcBuilders
                .webAppContextSetup(context)
                .build();
    }

    @Test
    public void testCreateNewEmployee() throws Exception {

        String exampleCourseJson = "{" +
                    "\"name\":\"Rajitha Senarathna\"," +
                    "\"email\":\"nuwanrachi56@gmail.com\"," +
                    "\"address\":\"Amore Street Colombo 10\"," +
                    "\"contactNumber\":\"0112344333\"," +
                    "\"gender\":\"Male\"," +
                    "\"isActive\":true" +
                "}";

        Mockito.when(employeeService.createEmployee(Mockito.any(Employee.class))).thenReturn(createMockEmployee());
        // when
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/emp-api/employee/").accept(MediaType.APPLICATION_JSON).content(
                        exampleCourseJson).contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();

        assertEquals(HttpStatus.CREATED.value(), response.getStatus());
    }

    @Test
    public void testCreateNewEmployeeWithExistingEmail() throws Exception {

        String exampleCourseJson = "{" +
                "\"name\":\"Rajitha Senarathna\"," +
                "\"email\":\"test@gmail.com\"," +
                "\"address\":\"Amore Street Colombo 10\"," +
                "\"contactNumber\":\"0112344333\"," +
                "\"gender\":\"Male\"," +
                "\"isActive\":true" +
                "}";

        Mockito.when(employeeService.createEmployee(Mockito.any(Employee.class))).thenReturn(createMockEmployee());
        // when
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post("/emp-api/employee/").accept(MediaType.APPLICATION_JSON).content(
                        exampleCourseJson).contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();

        assertEquals(HttpStatus.CREATED.value(), response.getStatus());
    }

    private Employee createMockEmployee() {

        Employee employeeMock = new Employee();

        employeeMock.setActive(true);
        employeeMock.setAddress("Amore Street Colombo 10");
        employeeMock.setContactNumber("0112344333");
        LocalDateTime localDate = LocalDateTime.now();
        employeeMock.setCreatedDate(localDate);
        employeeMock.setCreatedDate(localDate);
        employeeMock.setEmail("nuwanrachi@gmail.com");
        employeeMock.setGender("Male");
        employeeMock.setName("Rajitha Senarathna");

        return employeeMock;

    }

    /**
     * Maps an Object into a JSON String. Uses a Jackson ObjectMapper.
     */
    private String mapToJson(Object object) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(object);
    }
}
