import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../services/employee.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  validateForm: FormGroup;
  isSubmit = false;
  constructor(private fb: FormBuilder, private employeesService: EmployeeService, private route: Router,
              private message: NzMessageService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      salary: [null, [Validators.required]],
      department: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    this.isSubmit = true;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    const formvalues = this.validateForm.getRawValue();

    this.employeesService.create(formvalues).subscribe(() => {
      this.route.navigate(['employees']).then(() => {
        this.message.success('Se ha guardado crrectamente el cambio.');
      });
    });
  }
}
