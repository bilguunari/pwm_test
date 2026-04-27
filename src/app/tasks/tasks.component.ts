import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { EmployeeService } from '../services/employee.service';
import { ProjectService } from '../services/project.service';
import { Task } from '../models/task.model';
import { Employee } from '../models/employee.model';
import { Project } from '../models/project.model';
import { map } from 'rxjs/operators';

interface DisplayTask extends Task {
  employeeName: string;
  projectName: string;
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tasks.component.html',
})
export class TaskComponent implements OnInit {
  taskForm: FormGroup;
  tasks: DisplayTask[] = [];
  employees: Employee[] = [];
  projects: Project[] = [];
  selectedTaskId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private projectService: ProjectService
  ) {
    this.taskForm = this.fb.group({
      employeeId: ['', Validators.required],
      projectId: ['', Validators.required],
      taskName: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(data => this.employees = data);
    this.projectService.getProjects().subscribe(data => this.projects = data);
    this.taskService.getTasks().pipe(
      map(tasks => tasks.map(task => {
        const employee = this.employees.find(e => e.id === task.employeeId);
        const project = this.projects.find(p => p.id === task.projectId);
        return {
          ...task,
          employeeName: employee ? employee.name : 'N/A',
          projectName: project ? project.name : 'N/A'
        };
      }))
    ).subscribe(data => this.tasks = data);
  }

  onSubmit() {
    if (this.taskForm.valid) {
      if (this.selectedTaskId) {
        this.taskService.updateTask({ id: this.selectedTaskId, ...this.taskForm.value });
      } else {
        this.taskService.addTask(this.taskForm.value);
      }
      this.resetForm();
    }
  }

  onEdit(task: DisplayTask) {
    this.selectedTaskId = task.id!;
    this.taskForm.setValue({
      employeeId: task.employeeId,
      projectId: task.projectId,
      taskName: task.taskName,
    });
  }

  resetForm() {
    this.taskForm.reset();
    this.selectedTaskId = null;
  }
}
