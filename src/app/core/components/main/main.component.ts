import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import {HeaderComponent} from '../header/header.component';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';  // ✅ Import RouterOutlet

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
  ],  // ✅ Ensure components are imported
})
export class MainComponent {}
