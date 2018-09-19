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
    this.isLoading = true;
    this.employeeService.getAll().subscribe((employees) => {
      this.dataSet = employees;
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  onDelete(id: number) {
    this.employeeService.delete(id).subscribe(() => {
      this.ngOnInit();
    });
  }

  onEdit(id: number) {

  }

}
