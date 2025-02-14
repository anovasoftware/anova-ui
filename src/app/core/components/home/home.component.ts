import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,  // ✅ Mark it as a standalone component
  imports: [CommonModule],  // ✅ Import required modules
  templateUrl: './home.component.html',
})
export class HomeComponent {

}
