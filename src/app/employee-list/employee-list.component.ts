import {Component, OnInit} from '@angular/core';
import {Employee} from '../models/employee';
import {EmployeeService} from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  dataSet: Employee[] = [];
  isLoading = true;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.employeeService.getAll().subscribe((employees) => {
      this.dataSet = employees;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

}
