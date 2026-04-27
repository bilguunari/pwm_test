import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesCollection = collection(this.firestore, 'employees');

  constructor(private firestore: Firestore) {}

  getEmployees(): Observable<Employee[]> {
    return collectionData(this.employeesCollection, { idField: 'id' }) as Observable<Employee[]>;
  }

  addEmployee(employee: Employee) {
    return addDoc(this.employeesCollection, employee);
  }

  updateEmployee(employee: Employee) {
    const employeeDoc = doc(this.firestore, `employees/${employee.id}`);
    return updateDoc(employeeDoc, { ...employee });
  }
}
