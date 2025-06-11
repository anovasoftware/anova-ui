import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlobalService } from './services/global.service';  // 👈 Import it

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<router-outlet></router-outlet>',
  imports: [RouterModule]
})
export class AppComponent implements OnInit {
  constructor(private userService: GlobalService) {}  // 👈 Inject it

  ngOnInit(): void {
    this.userService.loadGlobalState();  // 👈 Load user info once
  }
}
