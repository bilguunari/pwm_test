import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsCollection = collection(this.firestore, 'projects');

  constructor(private firestore: Firestore) {}

  getProjects(): Observable<Project[]> {
    return collectionData(this.projectsCollection, { idField: 'id' }) as Observable<Project[]>;
  }

  addProject(project: Project) {
    return addDoc(this.projectsCollection, project);
  }

  updateProject(project: Project) {
    const projectDoc = doc(this.firestore, `projects/${project.id}`);
    return updateDoc(projectDoc, { ...project });
  }

}
