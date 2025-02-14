import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,  // ✅ Mark it as a standalone component
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],  // ✅ Import Material modules
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() toggleSidebarEvent = new EventEmitter<void>();  // ✅ Emit event to parent

  toggleSidebar() {
    this.toggleSidebarEvent.emit();  // ✅ Notify parent to toggle sidebar
  }
}
