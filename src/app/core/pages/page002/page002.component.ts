import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {HeroComponent} from '../page001/hero/hero.component';

@Component({
  selector: 'app-page002',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    HeroComponent,
  ],
  templateUrl: './page002.component.html',
  styleUrl: './page002.component.scss'
})

export class Page002Component implements OnInit, OnDestroy {
  highlights: string[] = [
    'Over 20 years of continuous operation',
    'Fully integrated enterprise-level platform',
    'Rock-solid and dependable',
    'Highly configurable',
  ];

  currentHighlightIndex = 0;
  currentHighlight = this.highlights[0];
  rotationInterval: any;

  ngOnInit(): void {
    this.rotationInterval = setInterval(() => {
      this.currentHighlightIndex =
        (this.currentHighlightIndex + 1) % this.highlights.length;
      this.currentHighlight = this.highlights[this.currentHighlightIndex];
    }, 3000); // 3 seconds per highlight
  }

  ngOnDestroy(): void {
    clearInterval(this.rotationInterval);
  }
}
