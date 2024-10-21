import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { LeaveType } from '../../model/leaveType.interface'
@Component({
  selector: 'app-new-leave',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-leave.component.html',
  styleUrl: './new-leave.component.css'
})
export class NewLeaveComponent implements OnInit {
  masterServie = inject(MasterService);
  leaveTypeList = signal<LeaveType[]>([]);
  ngOnInit(): void {
    this.getLeavetype();
    this.initializeForm();
  }
  leaveForm: FormGroup = new FormGroup({});
  initializeForm() {
    this.leaveForm = new FormGroup({
      leaveId: new FormControl(0),
      employeeId: new FormControl(0),
      leaveTypeId: new FormControl(0),
      startDate: new FormControl(""),
      endDate: new FormControl(""),
      status: new FormControl(""),
      reason: new FormControl("New"),
      requestDate: new FormControl(new Date())
    })
  }
  getLeavetype() {
    this.masterServie.GetLeaveType().subscribe((data) => {
      this.leaveTypeList.set(data.data);
    });
  }
}
