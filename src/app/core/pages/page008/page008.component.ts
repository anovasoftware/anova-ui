import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../services/api.service';
import {User} from '../../../models/user';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-page008',
  imports: [
    NgIf
  ],
  templateUrl: './page008.component.html',
  styleUrl: './page008.component.css'
})
export class Page008Component implements OnInit {
  pk = '';
  user: User | null = null;
  componentLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.pk = params.get('pk') || '';

      if (this.pk) {
        this.loadUser(this.pk);
      }
    });
  }

  private loadUser(recordId: string): void {
    this.api.get<any>(`base/user/${recordId}/`).subscribe({
      next: response => {
        this.user = response?.data?.record || null;
        console.log('User:', this.user);
        this.componentLoaded = true;
      },
      error: error => {
        console.error('Error loading user', error);
      }
    });
  }
}
