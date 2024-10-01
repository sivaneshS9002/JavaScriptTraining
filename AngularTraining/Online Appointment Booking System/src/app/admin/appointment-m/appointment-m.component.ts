import { Component } from '@angular/core';
import { ServicesService } from '../../Services/services.service';
import { newUserM, service } from '../../../Modals/Modal';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-appointment-m',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './appointment-m.component.html',
  styleUrl: './appointment-m.component.css'
})
export class AppointmentMComponent {
  userList:newUserM[]=[];
  serviceList:service[]=[];
  selectedCategory:string='';
  selectedCategory1:string='';
  editEmail=''
  editServiceName=''
  editDate=''
  editTime=''
  editStatus='';
  emailForStatus=''
  serviceNameforStatus=''
  emailForcancel='';
  serviceForcancel='';
  filterByDate='';
  filterDate1='';
  selectedProvider='';
  selectedProvider1='';
  boolValue=true;
  Selectedstatus=''
  Selectedstatus1='';
   constructor(private service:ServicesService){
       this.userList=service.getRegisteredUsers();
       this.serviceList=service.getServices();
   }
   Filter(f:NgForm){
    console.log(this.selectedCategory);
    console.log(this.filterByDate);
    console.log(this.selectedProvider);
    if(!this.selectedCategory && !this.filterByDate && !this.Selectedstatus){
       this.boolValue=true;
    }
    if(this.filterByDate){
         this.filterDate1=this.filterByDate;
         this.boolValue=false;
         this.selectedCategory1='';
         this.Selectedstatus1='';
    }
   else if(this.selectedCategory){
      this.selectedCategory1=this.selectedCategory;
      this.boolValue=false;
       this.filterDate1='';
       this.Selectedstatus1='';
    }
    else if(this.Selectedstatus){
      this.Selectedstatus1=this.Selectedstatus;
      this.filterDate1='';
      this.selectedCategory1='';
      this.boolValue=false;
    }

    // else if(this.selectedProvider){
    //  this.selectedProvider1=this.selectedProvider;
    //  this.boolValue=false;
    // }
  
    //  this.filterDate1='';
    //  this.selectedCategory1='';
    //  this.selectedProvider1='';
    console.log(this.Selectedstatus)
   }
   reShedule(email:any,sName:any){
       console.log(email+" "+sName);
       this.editEmail=email;
       this.editServiceName=sName;
       (document.querySelector('#reschedule-form') as HTMLDivElement).style.display='block';
   }
   handleReseduleData(){
     console.log(this.editDate+" "+this.editTime);
       for(let i=0;i<this.userList.length;i++)
       {
          if(this.editEmail===this.userList[i].email){
             for(let j=0;j<this.userList[i].Booking.length;j++)
             {
                if(this.userList[i].Booking[j].aName === this.editServiceName){
                  this.userList[i].Booking[j].aDate=this.editDate;
                  this.userList[i].Booking[j].aTime=this.editTime;
                }
             }
          }
       }
       this.service.setRegisteredUsers(this.userList);
       this.userList=this.service.getRegisteredUsers();
     (document.querySelector('#reschedule-form') as HTMLDivElement).style.display='none';
   }
   hideReshedule(){
    (document.querySelector('#reschedule-form') as HTMLDivElement).style.display='none';
   }
   cancelApm(email:any,sName:any){
    this.emailForcancel=email;
      this.serviceForcancel=sName;

      for(let i=0;i<this.userList.length;i++)
         {
            if(this.emailForcancel===this.userList[i].email){
               for(let j=0;j<this.userList[i].Booking.length;j++)
               {
                  
                  if(this.userList[i].Booking[j].aStatus === 'Cancelled'){
                        alert("This Appointment is already Cancelled");
                        return;
                  }
                  else if(this.userList[i].Booking[j].aName === this.serviceForcancel){
                     this.userList[i].Booking[j].aStatus='Cancelled';
                     alert("Appointment Cancelled SuccesFully");
                  }
               }
            }
         }
         this.service.setRegisteredUsers(this.userList);
          this.userList=this.service.getRegisteredUsers();
    
  }

  statusModal(email:any,sName:any){
     this.serviceNameforStatus=sName;
     this.emailForStatus=email;
     console.log(this.serviceNameforStatus+" "+this.emailForStatus);
    (document.querySelector('#manage-status-modal') as HTMLDivElement).style.display='block';
  }
  closestatusModal(){

    (document.querySelector('#manage-status-modal') as HTMLDivElement).style.display='none';
  }
  upDateStatus(){
    console.log(this.editStatus);
    for(let i=0;i<this.userList.length;i++)
      {
         if(this.emailForStatus===this.userList[i].email){
            for(let j=0;j<this.userList[i].Booking.length;j++)
            {
               if(this.userList[i].Booking[j].aName === this.serviceNameforStatus){
                 this.userList[i].Booking[j].aStatus=this.editStatus;
               }
            }
         }
      }
      this.service.setRegisteredUsers(this.userList);
      this.userList=this.service.getRegisteredUsers();
    (document.querySelector('#manage-status-modal') as HTMLDivElement).style.display='none';
  }
}
