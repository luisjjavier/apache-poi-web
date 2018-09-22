import {AfterViewInit, Component, OnInit} from '@angular/core';
import {EmployeeService} from '../services/employee.service';
import {Employee} from '../models/employee';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  employeesQuantity = 0;
  maxSalary = 0;
  minSalary = 0;
  employees: Employee[] = [];
  isLoading = true;
  canvas: any;
  ctx: any;

  constructor(private employeesService: EmployeeService) {
  }

  ngOnInit() {
    this.employeesService.getAll().subscribe(value => {
      this.employees = value;
      this.employeesQuantity = this.employees.length;
      const employees = this.employees.sort((a, b) => {
        if (a.salary < b.salary) {
          return 1;
        } else {
          return -1;
        }
      });
      this.maxSalary = employees[0].salary;
      this.minSalary = employees[employees.length - 1].salary;
      const myChart = new Chart(this.ctx, {
        type: 'bar',
        data: {
          labels: this.employees.map((employee) => `${employee.name}  ${employee.lastname}`),
          datasets: [{
            label: 'Empleados en la empresa',
            data: this.employees.map(employee => employee.salary),
            borderWidth: 1,
            backgroundColor: this.employees.map(() => `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`)
          }]
        },
        options: {
          responsive: true,

        }
      });
      this.isLoading = false;
    });
  }

  ngAfterViewInit() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');

  }


}
