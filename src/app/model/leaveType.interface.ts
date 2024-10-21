export interface LeaveType{
    leaveTypeId: number
    typeName: string
}
export interface EarnedLeave{
    earnedLeaveId: number
    employeeId: number
    totalEarnedLeaves:number
    totalSickEarnedLeaves:number
    
    lastUpdatedDate:string
    EmployeeName:string
}
export interface LeaveRequest{
    leaveId: number
    employeeid: number
    leaveTypeId: number
    satartDate: string
    endDate:string
    status:string
    reason:string
    requestDate:string
}
export interface NewLeaveComponent{
    employeeId: number
    leaveTypeId: number
    startDate: string
    endDate: string
    status: string
    reason: string
    requestDate: string
}