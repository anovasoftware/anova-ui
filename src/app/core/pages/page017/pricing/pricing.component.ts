import {Component, Input} from '@angular/core';
import {ReservationPricing} from '../../../../models/event-category-price';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-pricing',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {
  @Input() reservationPricing: ReservationPricing | null = null;
}
