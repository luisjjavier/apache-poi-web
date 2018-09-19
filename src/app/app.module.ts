import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {en_US, NgZorroAntdModule, NZ_I18N} from 'ng-zorro-antd';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {EmployeeService} from './services/employee.service';
import { EmployeeFormComponent } from './employee-form/employee-form.component';


registerLocaleData(en);

const appRoutes: Routes = [
  {path: 'employees', component: EmployeeListComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'new-employee', component: EmployeeFormComponent},
  {
    path: '',
    redirectTo: '/employees',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    DashboardComponent,
    EmployeeFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{provide: NZ_I18N, useValue: en_US}, EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
