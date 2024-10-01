import { Component } from '@angular/core';
import { ServicesService } from '../../Services/services.service';
import { CommonModule } from '@angular/common';
import { newUserM, service } from '../../../Modals/Modal';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-h',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './user-h.component.html',
  styleUrl: './user-h.component.css'
})
export class UserHComponent {
  
}
