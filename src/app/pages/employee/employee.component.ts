import { Component, inject, OnInit } from '@angular/core';
import { Employee } from '../../model/employee.model';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { ParentDepartment } from '../../model/parentDepartment.interface';
import { APIResponse } from '../../model/responseApi.interface';
import { ChildDepartment } from '../../model/childDep.interface';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {
  ngOnInit(): void {
    this.loadDepartment();
    this.loadAllEmployee();
  }
  masterservice = inject(MasterService);
  employee: Employee = new Employee();
  parentDepartmentList: ParentDepartment[] = [];
  childDeptList: ChildDepartment[] = [];
  employeeList: Employee[] = [];

  paredntDepId: string = '';
  loadDepartment() {
    this.masterservice.getDepartment().subscribe((res: APIResponse) => {
      this.parentDepartmentList = res.data;
    })
  }
  onDepartmentChange() {
    this.masterservice.getChildDepartmentByParentId(this.paredntDepId).subscribe((res: APIResponse) => {
      this.childDeptList = res.data;
    });
  }
  onSaveEmployee() {
    this.masterservice.createNewEmployee(this.employee).subscribe((res: Employee) => {
      alert("Creado con éxito");
      this.employee = new Employee();
    })
  }
  loadAllEmployee() {
    this.masterservice.getAllEmployees().subscribe((res: Employee[]) => {
      this.employeeList = res;
    })
  }
  onDeleteEmployee(id: number) {
    const isDelete = confirm("Seguro de eliminar este empleado?");
    if (isDelete) [
      this.masterservice.deleteEmployee(id).subscribe((res: Employee[]) => {
        this.loadAllEmployee();
      })
    ]
  }
  getAllChildDepartment() {
    this.masterservice.getAllChildDepartment().subscribe((res: APIResponse) => {
      this.childDeptList = res.data;
    })
  }
  onEdit(employee: Employee) {
    this.employee = employee;
    this.getAllChildDepartment();
  }
  onUpdateEmployee() {
    this.masterservice.UpdateEmployee(this.employee).subscribe((res: Employee) => {
      alert("Actualizado con éxito");
      this.employee = new Employee();
      this.loadAllEmployee();
    })
  }

}