import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,  // ✅ Mark it as a standalone component
  imports: [CommonModule],  // ✅ Import required modules
  templateUrl: './login.component.html',
})
export class LoginComponent {

}
