import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  user: { name: string } | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<{ name: string }>('/api/user-info').subscribe({
      next: (data) => this.user = data,
      error: () => this.user = { name: 'Guest' }
    });
  }

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }
}
