import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { service,newUserM } from '../../../Modals/Modal';
import { ServicesService } from '../../Services/services.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-appointment',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './list-appointment.component.html',
  styleUrl: './list-appointment.component.css',
})
export class ListAppointmentComponent {
  serviceList: service[] = [];
  userList:newUserM[] =[]
  currentUser:string='';
  showUpMessage=false;
  showHiMessage=false;
  constructor(private service:ServicesService,private route:Router){
    this.serviceList = service.getServices();
    console.log(this.serviceList);
    this.currentUser=JSON.parse(service.getCurrentuser());
    this.userList=service.getRegisteredUsers();
    for(let i=0;i<this.userList.length;i++){
      let c=0;
       if(this.currentUser === this.userList[i].email){
          for(let j=0;j<this.userList[i].Booking.length;j++){
            if(this.userList[i].Booking[j].aStatus=== 'Confirmed' || this.userList[i].Booking[j].aStatus==='Pending'){
              this.showUpMessage=true;
              c++;
            }
            else if(this.userList[i].Booking[j].aStatus=== 'Completed' || this.userList[i].Booking[j].aStatus=== 'Cancelled'){
              this.showHiMessage=true;
            }
          }
          if(c==0){
            this.showUpMessage=false;
          }
       }
    }
  }

  isDisabled:boolean=true;
  cancelAppoint:number=-1;
  rescheduleAppoint:number=-1;
  currentUserIndex:number=-1;
  setRstartDate='';
  setRendDate='';
  setRstartTime='';
  setRendTime='';
  rescheduledTime='';
  rescheduledDate='';
  editedServiceName='';     
  openRescheduleForm(i:any,s:any)
  {
     this.editedServiceName=s;
     console.log(this.editedServiceName+" editedServicename");
    (document.getElementById('reschedule-modal') as HTMLDivElement).style.display='block';
    this.rescheduleAppoint=i;
     for(let i=0;i<this.serviceList.length;i++){
      if(this.serviceList[i].serviceName === s){
          this.setRstartTime=this.serviceList[i].serviceStarttime;
          this.setRendTime=this.serviceList[i].serviceEndtime;
      }
     }
    for(let i=0;i<this.serviceList.length;i++){
            if(this.serviceList[i].serviceName === s){
                this.currentUserIndex=i;
            }
    }
    console.log(this.currentUserIndex);
  }
  rescheduleClose(){
    (document.getElementById('reschedule-modal') as HTMLDivElement).style.display='none';
  }
  closeRe()
  {
    if(!this.rescheduledDate || !this.rescheduledTime){
      alert("Please fill the required properties");
    }
    else{
       for(let i=0;i<this.userList.length;i++){
           if(this.userList[i].email === this.currentUser){
              for(let j=0;j<this.userList[i].Booking.length;j++){
                    let b=this.userList[i].Booking[j];
                      if(b.aName === this.editedServiceName){
                          if(b.aDate === this.rescheduledDate){
                             alert('Please choose another date Or time');
                          }
                          else{
                             this.userList[i].Booking[j].aDate=this.rescheduledDate;
                             this.userList[i].Booking[j].aTime=this.rescheduledTime;
                          }
                      }
              }
           }
       }
       this.service.setRegisteredUsers(this.userList);
       this.serviceList=this.service.getRegisteredUsers();
    }

    (document.getElementById('reschedule-modal') as HTMLDivElement).style.display='none';  
  }

  cancelAppointment(i:any){
     (document.getElementById('cancel-modal') as HTMLDivElement).style.display='block';
     this.cancelAppoint=i;
     console.log(this.cancelAppoint)
  }
  cA(){
      for(let i=0;i<this.userList.length;i++){
         if(this.currentUser === this.userList[i].email){ 
           this.userList[i].Booking[this.cancelAppoint].aStatus='Cancelled';
         }
      }
      this.service.setRegisteredUsers(this.userList);
      (document.getElementById('cancel-modal') as HTMLDivElement).style.display='none';
  }
  Cancelclose(){
    (document.getElementById('cancel-modal') as HTMLDivElement).style.display='none';
  }
  routeToLogin(){
      this.route.navigate(['Login']);
      localStorage.removeItem('currentUser');
  }

}


