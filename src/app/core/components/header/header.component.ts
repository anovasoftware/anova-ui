import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {GlobalService} from '../../../services/global.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  isLoggedIn = false;
  userName: string | null = null;
  version = 'TBA';
  user: { name: string } | null = null;

  constructor(
    private globalService: GlobalService
    ) {}

  ngOnInit(): void {
    this.globalService.user$.subscribe(global => {
      this.userName = global?.user?.name ?? 'Guest';
      this.isLoggedIn = global?.user?.loggedIn ?? false;
      this.version = global?.meta?.version;
    });
   // this.api.get('public/table/base/user').subscribe({
   //    next: (response) => {
   //      const user = response?.header?.user;
   //      this.isLoggedIn = user?.loggedIn ?? false;
   //      this.userName = this.isLoggedIn ? response?.header?.user?.name ?? 'User' : 'Guest';
   //    },
   //    error: () => {
   //      this.isLoggedIn = false;
   //      this.userName = 'Guest';
   //    }
   //  });
  }
  onLogin(): void {

  }

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }
}
