import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,  // ✅ Mark it as a standalone component
  imports: [CommonModule],  // ✅ Import required modules
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {

}
