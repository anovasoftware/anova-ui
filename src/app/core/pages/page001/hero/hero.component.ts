import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgIf} from '@angular/common';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterModule, NgIf,],
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit, OnDestroy {
  highlights: string[] = [
    'Hospitality software for remote and expedition environments!',
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
    }, 8000); // 8 seconds per highlight
  }
  ngOnDestroy(): void {
    clearInterval(this.rotationInterval);
  }

}
