import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private routePrefix = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Employee[]>(`${this.routePrefix}/employees`);
  }

  get(id: number) {
    return this.http.get<Employee>(`${this.routePrefix}/employees/${id}`);
  }

  create(employee: Employee) {
    return this.http.post(`${this.routePrefix}/employees`, employee);
  }

  delete(id: number) {
    return this.http.delete(`${this.routePrefix}/employees/${id}`);
  }

  update(employee: Employee) {
    return this.http.put(`${this.routePrefix}/employees`, employee);
  }
}

