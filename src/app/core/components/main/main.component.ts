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
  public user: { name: string } | null = null;

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // // ✅ Fetch user info
    // this.apiService.get('public/user/').subscribe({
    //   next: (data) => this.user = data,
    //   error: () => this.user = { name: 'Guest' }
    // });
  }
}
