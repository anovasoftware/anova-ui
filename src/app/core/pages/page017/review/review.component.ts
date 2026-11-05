import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from '@angular/material/card';
import {ReviewContext} from '../reservation-contexts';
import {Event} from '../../../../models/event.model';
import {DatePipe, JsonPipe} from '@angular/common';
import {MatDivider} from '@angular/material/list';
import {LookupService} from '../../../../services/lookup.service';
import {Lookups} from '../../../../models/grid';

@Component({
  selector: 'app-review',
  standalone: true,
  templateUrl: './review.component.html',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatCardSubtitle,
    DatePipe,
    MatDivider,
  ],
  styleUrl: './review.component.scss'
})
export class ReviewComponent {
  @Input() reviewContext: ReviewContext | null = null;

  constructor(
    public lookupService: LookupService
  ) {
  }

  get lookups(): Lookups {
    return this.reviewContext!.pricingContext.lookups;
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['reviewContext']) {
  //     console.log('Review received:', this.reviewContext);
  //     console.log('Review event:', this.reviewContext?.event);
  //   }
  // }

  // get event(): Event | null {
  //   // console.log(this.reviewContext);
  //   return this.reviewContext?.event ?? null;
  // }

}
