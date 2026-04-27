import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './projects.component.html',
})
export class ProjectComponent implements OnInit {
  projectForm: FormGroup;
  projects: Project[] = [];
  selectedProjectId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      if (this.selectedProjectId) {
        this.projectService.updateProject({ id: this.selectedProjectId, ...this.projectForm.value });
      } else {
        this.projectService.addProject(this.projectForm.value);
      }
      this.resetForm();
    }
  }

  onEdit(project: Project) {
    this.selectedProjectId = project.id!;
    this.projectForm.setValue({
      name: project.name,
      description: project.description,
    });
  }

  resetForm() {
    this.projectForm.reset();
    this.selectedProjectId = null;
  }
}
