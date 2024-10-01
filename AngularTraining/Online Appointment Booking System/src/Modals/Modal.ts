export  interface newUserM{
   name:string,
   email:string,
   phoneNumber:number,
   password:string,
   isActive:boolean,
   role:'User' | 'Admin' | string,
   Booking:any[]
}
export interface Admin extends newUserM{
  
}

export interface service{
   serviceName:string,
   serviceDescription:string,
   serviceDuration:string,
   servicePrice:string,
   serviceProvider:string,
   serviceStartdate:string,
   serviceEnddate:string,
   serviceStarttime:string,
   serviceEndtime:string,
   blackotPeriod:string
}
export interface Booking{
   aName:string,
   aTime:string,
   aDate:string,
   aProvider:string,
   aStatus:'Confirmed' | 'Pending' | 'Cancelled' | 'Completed' | string;
}