import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, RouterStateSnapshot, Routes } from '@angular/router';
import { CanActivate, Router} from '@angular/router';
import { LoginComponent } from './login/login.component';


export const authGuard= (route:ActivatedRoute, state:RouterStateSnapshot) => {
   return JSON.parse(localStorage.getItem('adminAcess') || 'true');
};
