import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { APIResponse } from '../../model/responseApi.interface';
import { Observable } from 'rxjs';
import { Employee } from '../../model/employee.model';
import { AsyncPipe, DatePipe } from '@angular/common';
import { EarnedLeave } from '../../model/leaveType.interface';

@Component({
  selector: 'app-earned-leave',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe,DatePipe ],
  templateUrl: './earned-leave.component.html',
  styleUrl: './earned-leave.component.css'
})
export class EarnedLeaveComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  masterservice = inject(MasterService);
  employee$: Observable<Employee[]> = new Observable<Employee[]>();
  earnedLeaves:EarnedLeave[]=[];
  constructor() {
    this.initializeForm();
    this.employee$ = this.masterservice.getAllEmployees();
  }
  ngOnInit(): void {
    this.GetAllEarnedLeaves();
  }
  initializeForm() {
    this.form = new FormGroup({
      earnedLeaveId: new FormControl(0),
      employeeId: new FormControl(0),
      totalEarnedLeaves: new FormControl(0),
      lastUpdatedDate: new FormControl(new Date()),
    });
  }
  OnSave() {
    const formValue = this.form.value;
    this.masterservice.AddEarnedLeave(formValue).subscribe((res: APIResponse) => {
      if (res.result) {
        alert("Leaves Modifed")
      }
      else {
        alert(res.message);
      }
    });
  }
  GetAllEarnedLeaves() {
    this.masterservice.GetAllEarnedLeaves().subscribe((res: APIResponse) => {
      this.earnedLeaves = res.data;
    });
  }
}
