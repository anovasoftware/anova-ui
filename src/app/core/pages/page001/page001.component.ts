import { Component, OnInit } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { FormConstants } from '../../../../constants/form_constants';
import { Router } from '@angular/router';
import { FormDialogService } from '../../../services/form-dialog.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ExchangeRateService } from '../../../services/financial.services';
import {AsyncPipe, DatePipe, DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-page001',
  standalone: true,
  imports: [
    HeroComponent,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatButton,
    MatSnackBarModule,
    NgIf,
    AsyncPipe,
    DecimalPipe,
    NgForOf,
    DatePipe,
    MatTooltip
  ],
  templateUrl: './page001.component.html',
  styleUrls: ['./page001.component.scss'],
})
export class Page001Component implements OnInit {
  constructor(
    private router: Router,
    private formDialog: FormDialogService,
    private snackBar: MatSnackBar,
    private exchangeRateService: ExchangeRateService
  ) {}

  ngOnInit(): void {
    this.exchangeRateService.loadExchangeRates();
  }

  get exchangeRateData$() {
    return this.exchangeRateService.exchangeRateData$;
  }

  onContact(event: MouseEvent) {
    const dialogRef = this.formDialog.openForm(
      FormConstants.CONTACT_US,
      'new',
      'create'
    );

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result?.success) {
        this.snackBar.open(
          'Your request has been submitted and will be addressed as soon as possible.',
          'OK',
          {
            duration: 9000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          }
        );
      }
    });
  }
  onRefreshRates(): void {
    this.exchangeRateService.refreshExchangeRates();

    this.snackBar.open(
      'Exchange rates refreshed. (Note: rates only updated every hour)',
      'OK',
      {
        duration: 7000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      }
    );
  }
}
