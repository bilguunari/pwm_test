import { Component } from '@angular/core';
import { EmployeeComponent } from './employee/employee.component';
import { ProjectComponent } from './projects/projects.component';
import { TaskComponent } from './tasks/tasks.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EmployeeComponent, ProjectComponent, TaskComponent],
  templateUrl: './app.html',
})
export class App {}
