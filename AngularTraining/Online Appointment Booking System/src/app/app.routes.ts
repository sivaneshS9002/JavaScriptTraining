import { Routes } from '@angular/router';
import { SignUpComponent } from "./sign-up/sign-up.component";
import { LoginComponent } from "./login/login.component";
import { AdminComponent } from './admin/admin.component';
import { AppointmentMComponent } from './admin/appointment-m/appointment-m.component';
import { ServiceMComponent } from './admin/service-m/service-m.component';
import { UserMComponent } from './admin/user-m/user-m.component';
import { UserHComponent } from './admin/user-h/user-h.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ListAppointmentComponent } from './user/list-appointment/list-appointment.component';
import { UserActivityComponent } from './admin/user-h/user-activity/user-activity.component';
import { UserHistoryComponent } from './admin/user-h/user-history/user-history.component';
import { ServicePopularityComponent } from './admin/user-h/service-popularity/service-popularity.component';
import { authGuard } from './auth.guard';
export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'SignUp',
        component: SignUpComponent,

    },
    {
        path:'Admin',
        component:AdminComponent,
        canActivate:[authGuard]
    },
    {
        path:'Apm',
        component:AppointmentMComponent,
        canActivate:[authGuard]
    }
    ,
    {
        path:'sM',
        component:ServiceMComponent,
        canActivate:[authGuard]
    },
    {
       path:'uM',
       component:UserMComponent,
       canActivate:[authGuard]
    }
    ,{
        path:'uH',
        component:UserHComponent,
        children:[
            {
                path:'',
                redirectTo:'UserA',
                pathMatch:'full'
            },
            {
               path:'UserA',
               component:UserActivityComponent
            },
            {
                path:'history',
                component:UserHistoryComponent
            },
            {
                path:'popularity',
                component:ServicePopularityComponent
            }

        ],
        canActivate:[authGuard]
    },
    {
        path:'Login',
        component:LoginComponent
    },
    {
        path:'User',
        component:UserComponent
    },
    {
        path:'Profile',
        component:ProfileComponent
    },
    {
        path:'Lap',
        component:ListAppointmentComponent
    }
];


