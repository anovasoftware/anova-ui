import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,  // ✅ Mark it as a standalone component
  imports: [CommonModule, RouterModule],  // ✅ Import required modules
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
    @Input() isOpen = true;

}
