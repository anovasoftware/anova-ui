import { Component, OnInit } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { GlobalService } from './services/global.service';
import {IdleService} from './services/idle.service';
import {AuthService} from './services/auth.service';  // 👈 Import it

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<router-outlet></router-outlet>',
  imports: [RouterModule]
})
export class AppComponent implements OnInit {
  constructor(
     private idleService: IdleService,
    private authService: AuthService,
    private globalService: GlobalService,
    private router: Router
  ) {}  // 👈 Inject it

  ngOnInit(): void {
    this.authService.initializeSession();
    this.idleService.onIdle.subscribe(() => this.handleIdleTimeout());

  }
  private handleIdleTimeout(): void {
    console.log('User is idle: logging out');
    this.authService.logout();
    // this.globalService.loadPublicMeta();
    this.router.navigate(['/navigator/001']);  // Your home page
  }
}
