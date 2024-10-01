import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import { ServicesService } from '../../Services/services.service';
import { service } from '../../../Modals/Modal';
import { format, addDays } from 'date-fns';
@Component({
  selector: 'app-service-m',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './service-m.component.html',
  styleUrl: './service-m.component.css'
})
export class ServiceMComponent {
  startD!:string;
  
 eName:string='';
 eDescription:string='';
 eDuration:string='';
 ePrice=''
 eProvider=''
 eStartdate=''
 eEnddate=''
 eStarttime=''
 eEndtime=''
 eBlackout=''
 globalEditIndex!:number;
   serviceList:service[]=[];
  constructor(private service:ServicesService){
    this.serviceList=service.getServices();
    this.startD=format(new Date(),'yyyy-MM-dd');
  }
  findS!:any;
   addS:service={
         serviceName:'',
         serviceDescription:'',
         serviceDuration:'',
         servicePrice:'',
         serviceProvider:'',
         serviceStartdate:'',
         serviceEnddate:'',
         serviceStarttime:'',
         serviceEndtime:'',
         blackotPeriod:''
   }
  serviceform(data:NgForm){
    if((document.querySelector('#submit-service-btn') as HTMLButtonElement).textContent === 'Update'){
        let s=this.service.getServices();
         s[this.globalEditIndex].serviceName=this.eName;
         s[this.globalEditIndex].serviceDescription=this.eDescription;
         s[this.globalEditIndex]. serviceDuration=this.eDuration;
         s[this.globalEditIndex].servicePrice=this.ePrice;
         s[this.globalEditIndex].serviceProvider=this.eProvider;
         s[this.globalEditIndex].serviceStartdate=this.eStartdate;
         s[this.globalEditIndex].serviceEnddate=this.eEnddate;
         s[this.globalEditIndex].serviceStarttime=this.eStarttime;
         s[this.globalEditIndex].serviceEndtime=this.eEndtime
         s[this.globalEditIndex].blackotPeriod=this.eBlackout;
      this.service.setServices(s);
      this.serviceList=this.service.getServices();
  
      (document.querySelector('#submit-service-btn') as HTMLButtonElement).textContent='submit';
    }
    else{
      this.addS.serviceName=data.value.serviceName,
      this.addS.serviceDescription=data.value.serviceDescription,
      this.addS.serviceDuration=data.value.serviceDuration,
      this.addS.servicePrice=data.value.servicePrice,
      this.addS.serviceProvider=data.value.serviceProvider,
      this.addS.serviceStartdate=data.value.startdate,
      this.addS.serviceEnddate=data.value.enddate,
      this.addS.serviceStarttime=data.value.starttime,
      this.addS.serviceEndtime=data.value.endtime,
      this.addS.blackotPeriod=data.value.blackoutperiod,
        this.findS=this.serviceList.find(i=>i.serviceName === this.addS.serviceName);
     if(this.findS){
      alert('This Service is Already exixts');
     }
     else{
      this.serviceList.push(this.addS);
      this.service.setServices(this.serviceList)
     }
    }
   
    data.resetForm();
  }
  showForm(){
    (document.querySelector('#service-details') as HTMLDivElement).style.display='block';
    console.log(this.startD)
  }
  cancelForm(){
    (document.querySelector('#service-details') as HTMLDivElement).style.display='none';
  }
  deleteService(i:any){
    let s=this.service.getServices();
    s.splice(i,1);
    this.service.setServices(s);
    this.serviceList=this.service.getServices();
  }
  editService(i:any){
   this.globalEditIndex=i;
    this.eName=this.serviceList[i].serviceName;
    this.eDescription=this.serviceList[i].serviceDescription;
    this.eDuration=this.serviceList[i].serviceDuration;
    this.eStartdate=this.serviceList[i].serviceStartdate;
     this.eEnddate=this.serviceList[i].serviceEnddate;
     this.ePrice=this.serviceList[i].servicePrice;
     this.eProvider=this.serviceList[i].serviceProvider;
     this.eStarttime=this.serviceList[i].serviceStarttime;
     this.eEndtime=this.serviceList[i].serviceEndtime;
     this.eBlackout=this.serviceList[i].blackotPeriod;
    (document.querySelector('#service-details') as HTMLDivElement).style.display='block';
    (document.querySelector('#submit-service-btn') as HTMLButtonElement).textContent='Update'
  }

}
