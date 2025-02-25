import {Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import {ApiService} from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,  // ✅ Must be standalone
  template: '<router-outlet></router-outlet>',  // ✅ Ensures pages load
  imports: [RouterModule]  // ✅ Import RouterModule to use <router-outlet>
})

export class AppComponent {}
