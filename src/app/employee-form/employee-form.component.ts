import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../services/employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  validateForm: FormGroup;
  isSubmit = false;
  employeeIdentification = 0;
  isLoading = false;

  constructor(private fb: FormBuilder, private employeesService: EmployeeService, private route: Router,
              private message: NzMessageService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      salary: [0, [Validators.required]],
      department: [null, [Validators.required]]
    });

    this.employeeIdentification = Number.parseInt(this.activatedRoute.snapshot.params['id']);
    if (this.employeeIdentification > 0) {
      this.isLoading = true;
      this.employeesService.get(this.employeeIdentification).subscribe((value) => {
        this.validateForm.patchValue(value);
        this.isLoading = false;
      });
    }
  }

  submitForm(): void {
    this.isSubmit = true;
    if (!this.validateForm.valid) {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      this.isSubmit = false;
      return;
    }

    const formvalues = this.validateForm.getRawValue();
    if (this.employeeIdentification > 0) {
      this.employeesService.update(this.employeeIdentification, formvalues).subscribe(() => {
        this.route.navigate(['employees']).then(() => {
          this.message.success('Se ha guardado crrectamente el cambio.');
        });
      }, () => this.isSubmit = false);
    } else {
      this.employeesService.create(formvalues).subscribe(() => {
        this.route.navigate(['employees']).then(() => {
          this.message.success('Se ha guardado crrectamente el cambio.');
        });
      }, () => {
        this.isSubmit = false;
      });
    }

  }

  formatterDollar = (value) => `$ ${value}`;
  parserDollar = value => value.replace('$ ', '');
}
