import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employees: Employee[] = [];
  selectedEmployeeId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      if (this.selectedEmployeeId) {
        this.employeeService.updateEmployee({ id: this.selectedEmployeeId, ...this.employeeForm.value });
      } else {
        this.employeeService.addEmployee(this.employeeForm.value);
      }
      this.resetForm();
    }
  }

  onEdit(employee: Employee) {
    this.selectedEmployeeId = employee.id!;
    this.employeeForm.setValue({
      name: employee.name,
      email: employee.email,
    });
  }

  resetForm() {
    this.employeeForm.reset();
    this.selectedEmployeeId = null;
  }
}
