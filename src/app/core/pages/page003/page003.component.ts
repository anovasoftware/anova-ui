// features.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Feature {
  title: string;
  tagline: string;
  icon: string;
  image: string;
  alt: string;
  points: string[];
  link: string | any[];
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './page003.component.html',
  styleUrls: ['./page003.component.scss'],
})
export class Page003Component {
  features: Feature[] = [
    {
      title: 'Passenger Management',
      tagline: 'Seamless guest journeys from booking to disembark.',
      icon: 'airline_seat_recline_normal',
      image: 'images/features/feature_pax.png',
      alt: 'Passenger manifest dashboard on a laptop',
      points: [
        'Fast manifest import & validation',
        'RFID-enabled onboard accounts',
        'Special needs & guest notes tracking',
        'Visual cabin board (status, occupancy, alerts)',
        'Onboard charges & folio management',
        'Flexible payments: credit, linked accounts, cash',
        'Settlement & reconciliation at disembark',
      ],
      link: ['/modules', 'passengers'],
    },
    {
      title: 'Crew Management',
      tagline: 'Empowering your crew with smart scheduling and compliance.',
      icon: 'groups',
      image: 'images/features/feature_crew.png',
      alt: 'Crew scheduling board',
      points: [
        'Roster planning & shift rotations',
        'Cabin assignments & accommodations',
        'Certification & license tracking with expirations',
        'Leave requests and approvals',
        'Payroll export & agency integrations',
      ],
      link: ['/modules', 'crew'],
    },
    {
      title: 'Point of Sale',
      tagline: 'Fast, flexible sales across every onboard outlet.',
      icon: 'point_of_sale',
      image: 'images/features/feature_pos.png',
      alt: 'Point of sale',
      points: [
        'Touchscreen-optimized sales screens',
        'RFID ready for quick transactions',
        'Role-based discounts & promo rules',
        'Split payments, voids, and returns',
        'Real-time stock checks via inventory link',
      ],
      link: ['/modules', 'crew'],
    },
    {
      title: 'Shore Excursions',
      tagline: 'Effortless booking and management of unforgettable experiences.',
      icon: 'tour',
      image: 'images/features/feature_shorex.png',
      alt: 'Shore excursions',
      points: [
        'Tour catalog with rich descriptions & pricing',
        'Live availability and capacity control',
        'Passenger booking & cancellation management',
        'Folio posting & settlement reporting',
      ],
      link: ['/modules', 'crew'],
    },
    {
      title: 'Onboard Payroll',
      tagline: 'Accurate payroll tailored for life at sea.',
      icon: 'account_balance',
      image: 'images/features/feature_payroll.png',
      alt: 'Onboard Payroll',
      points: [
        'Track earnings, deductions, and advances',
        'Manage multiple manning agencies',
        'Configurable payroll periods & items',
        'Exportable finance & compliance reports',
        'Integrated with crew contracts/HR',
      ],
      link: ['/modules', 'crew'],
    },
    {
      title: 'Cashbook/Foreign Exchange',
      tagline: 'Secure cash handling and hassle-free currency exchange.',
      icon: 'currency_exchange',
      image: 'images/features/feature_cash.png',
      alt: 'Cashbook',
      points: [
        'Manage multiple floats and safes',
        'Multi-currency balances & journals',
        'Any-to-any currency exchange',
        'Built-in exchange rate management',
        'Links to payroll, crew payments, and settlements',
      ],
      link: ['/modules', 'crew'],
    },
    {
      title: 'Inventory',
      tagline: 'Smarter stock control from galley to gift shop.',
      icon: 'local_shipping',
      image: 'images/features/feature_inventory.png',
      alt: 'Inventory',
      points: [
        'Track consumables, retail, and F&B stock',
        'Purchase orders & vendor management',
        'Transfers, adjustments, and wastage control',
        'Multi-currency valuation',
        'POS integration for real-time depletion',
      ],
      link: ['/modules', 'crew'],
    },
    {
      title: 'Gangway/Safety',
      tagline: 'Real-time access control and safety you can trust.',
      icon: 'verified_user',
      image: 'images/features/feature_gangway.png',
      alt: 'Gangway',
      points: [
        'Embark/disembark logging (RFID/barcode/magstripe)',
        'Muster drill participation tracking',
        'Port manning & visitor access management',
        'Compliance reporting for maritime authorities',
      ],
      link: ['/modules', 'crew'],
    },
  ];
}
