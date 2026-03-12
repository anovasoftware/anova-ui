import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
// import {HeroComponent} from '../page001/hero/hero.component';

@Component({
  selector: 'app-page002',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    // HeroComponent,
  ],
  templateUrl: './page002.component.html',
  styleUrl: './page002.component.scss'
})

export class Page002Component implements OnInit, OnDestroy {
  highlights: string[] = [
    'Innovative and user-friendly',
    'Powerful and scalable',
    'Secure and reliable',
    'Customizable and adaptable',
    'Trusted shipboard software running in remote environments for over 20 years',
    'Fully integrated enterprise-level platform',
    'Rock-solid and dependable',
    'Highly configurable',
    'Flexible integration platform for expedition operations',
    'Advanced analytics and reporting capabilities',
    'Real-time data visualization and analysis',
    'Advanced security measures',
  ];

  currentHighlightIndex = 0;
  currentHighlight = this.highlights[0];
  rotationInterval: any;

  ngOnInit(): void {
    this.rotationInterval = setInterval(() => {
      this.currentHighlightIndex =
        (this.currentHighlightIndex + 1) % this.highlights.length;
      this.currentHighlight = this.highlights[this.currentHighlightIndex];
    }, 5000); // 3 seconds per highlight
  }

  ngOnDestroy(): void {
    clearInterval(this.rotationInterval);
  }
}
