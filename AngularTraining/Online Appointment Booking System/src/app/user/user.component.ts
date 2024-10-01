import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { ServicesService } from '../Services/services.service';
import { newUserM, service } from '../../Modals/Modal';
import { Booking } from '../../Modals/Modal';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterModule, FormsModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  serviceList: service[] = [];
  userList:newUserM[] =[]
  showProvider: string = '';
  showService:string='';
  showDate: string = '';
  showTime:string='';
  showStartdate = ''
  showEnddate = ''
  showStarttime = '';
  showEndtime = '';
  currentUser:string='';
  constructor(private service: ServicesService) {
    this.serviceList = service.getServices();
    console.log(this.serviceList);
    this.currentUser=JSON.parse(service.getCurrentuser());
    this.userList=service.getRegisteredUsers();

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
    sTime:any=0;
    sMin:any=0;
    eTime:any=0;
    eMin:any=0;
    userSelectedT:any=0;
    userSelectedM:any=0;
    blackoutP='';
    ableTime=false;
    SelectedServiceForShowDetail='';
    SelectedDuration='';
    SelectedPrice='';
    SelectedDecrepition=''
  Service(d: any) {
    if (d.value) {
      for (let i = 0; i < this.serviceList.length; i++) {
        if (this.serviceList[i].serviceName === d.value) {
          this.SelectedServiceForShowDetail=d.value;
          this.showProvider = this.serviceList[i].serviceProvider;
          this.showStartdate=this.serviceList[i].serviceStartdate;
          this.SelectedDuration=this.serviceList[i].serviceDuration;
          this.SelectedPrice=this.serviceList[i].servicePrice;
          this.SelectedDecrepition=this.serviceList[i].serviceDescription
          this.showEnddate=this.serviceList[i].serviceEnddate;
          this.showStarttime= this.serviceList[i].serviceStarttime;
          this.showEndtime=this.serviceList[i].serviceEndtime;
          this.blackoutP=this.serviceList[i].blackotPeriod;
          this.isDisabled=!this.isDisabled;
          (document.querySelector('#appointment-time') as HTMLInputElement).min=this.showStarttime;
          (document.querySelector('#appointment-time') as HTMLInputElement).min=this.showEndtime;
          [this.sTime,this.sMin]=this.showStarttime.split(':');
          [this.eTime,this.eMin]=this.showEndtime.split(':');
          this.sTime=Number(this.sTime);
          this.sMin=Number(this.sMin);
          this.eTime=Number(this.eTime);
          this.eMin=Number(this.eMin);
        }
      }

    }
    console.log(d.value);
    console.log(this.SelectedServiceForShowDetail);
  }
  bookForm(data: NgForm) {
     if(!this.showService || !this.showDate || !this.showTime){
      console.log(this.showService+" ->"+this.showDate+" ->"+this.showTime);
      alert("Fill the all fields Properly")
     }else{
      let b:Booking=data.value;
 
      b.aStatus='Confirmed';
         console.log('hi'+" "+this.userList+" "+this.currentUser)
         console.log("Form Datas"+b);
      for(let i=0;i<this.userList.length;i++){
        if(this.userList[i].email === this.currentUser){
          this.userList[i].Booking?.push(b);
          console.log('inside')
        }
      }
     
       this.service.setRegisteredUsers(this.userList);
       this.userList=this.service.getRegisteredUsers();
     }
     data.resetForm();
     this.isDisabled=!this.isDisabled;
  }
  

  handleSelectedTime(a:any){
     console.log(a);
    // this.sTime=Number(a.value);
     [this.userSelectedT,this.userSelectedM]=a.value.split(':');
    this.userSelectedT=Number(this.userSelectedT);
    this.userSelectedM= Number(this.userSelectedM);
    console.log(this.userSelectedT+" "+typeof(this.userSelectedT))
    this.ableTime=!this.ableTime;
    this.showTime=a.value;
    console.log("Appointment Time"+this.showTime);
   }


  openRescheduleForm(i:any,s:any)
  {
     this.editedServiceName=s;
     console.log(this.editedServiceName+" editedServicename");
    (document.getElementById('reschedule-modal') as HTMLDivElement).style.display='block';
    this.rescheduleAppoint=i;
     for(let i=0;i<this.serviceList.length;i++){
      if(this.serviceList[i].serviceName === s){
          this.setRstartDate=this.serviceList[i].serviceStartdate;
          this.setRendDate=this.serviceList[i].serviceEnddate;
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
                          if(b.aDate === this.rescheduledDate || b.aTime === this.rescheduledTime){
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
           this.userList[i].Booking.splice(this.cancelAppoint,1);
         }
      }
      this.service.setRegisteredUsers(this.userList);
      (document.getElementById('cancel-modal') as HTMLDivElement).style.display='none';
  }
  Cancelclose(){
    (document.getElementById('cancel-modal') as HTMLDivElement).style.display='none';
  }
  handleReschedule(re:NgForm)
  {
        console.log(re.value)
  }
   closeDetail(){
    (document.querySelector('#Detail-modal') as HTMLDivElement).style.display='none';
   }
   openDetail(){
    (document.querySelector('#Detail-modal') as HTMLDivElement).style.display='block';
   }
}
