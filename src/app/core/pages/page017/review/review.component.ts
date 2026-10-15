import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {ReviewContext} from '../reservation-contexts';
import {Event} from '../../../../models/event.model';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-review',
  standalone: true,
  templateUrl: './review.component.html',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
  ],
  styleUrl: './review.component.scss'
})
export class ReviewComponent{
  @Input() reviewContext: ReviewContext | null = null;

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
