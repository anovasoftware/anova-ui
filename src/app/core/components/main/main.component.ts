import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  templateUrl: './main.component.html',
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent
  ],
})
export class MainComponent implements OnInit {
  public message = 'Loading...';

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    console.log('MainComponent.ngOnInit');

    // ✅ Use generic get() call
    this.apiService.get('public/test-api/', { param1: 'yoyo' }).subscribe({
      next: (response) => {
        this.message = response.message;
        console.log('API response:', response);
      },
      error: (error) => {
        console.error('Failed to fetch message:', error);
        this.message = 'Error connecting to Django API';
      }
    });
  }
}
