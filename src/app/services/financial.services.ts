import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ApiService} from './api.service';
import {ApiResponse} from '../models/api-response';
import {Currency, Job, ExchangeRate, ExchangeRateData} from '../models/financial.models';
import {TypeConstants} from '../../constants/type_constants';

@Injectable({providedIn: 'root'})
export class ExchangeRateService {
  protected readonly TypeConstants = TypeConstants;

  private exchangeRateDataSubject = new BehaviorSubject<ExchangeRateData | null>(null);
  exchangeRateData$ = this.exchangeRateDataSubject.asObservable();

  private loaded = false;
  private loading = false;

  constructor(private api: ApiService) {
  }

  loadExchangeRates(forceRefresh = false): void {
    if ((this.loaded || this.loading) && !forceRefresh) {
      return;
    }

    this.loading = true;

    this.api.get<ApiResponse<ExchangeRateData>>(
      `table/base/exchange_rate/?typeId=${this.TypeConstants.EXCHANGE_RATE_LATEST}`
    ).
    subscribe({
      next: (response) => {
        const data = response?.data || null;
        this.exchangeRateDataSubject.next(data);

        this.loaded = !!data;
        this.loading = false;
      },
      error: () => {
        this.exchangeRateDataSubject.next(null);
        this.loaded = false;
        this.loading = false;
      }
    });
  }

  refreshExchangeRates(): void {
    this.loadExchangeRates(true);
  }

  getExchangeRateData(): ExchangeRateData | null {
    return this.exchangeRateDataSubject.getValue();
  }

  // getRates(): ExchangeRate[] {
  //   return this.getExchangeRateData()?.rates || [];
  // }
  //
  // getHomeCurrency(): Currency | null {
  //   return this.getExchangeRateData()?.homeCurrency || null;
  // }
  //
  // getJob(): Job | null {
  //   return this.getExchangeRateData()?.job || null;
  // }
  //
  // isCached(): boolean {
  //   return this.getExchangeRateData()?.cached || false;
  // }

  // getRateByCode(code: string): ExchangeRate | null {
  //   return this.getExchangeRates().find(
  //     exchangeRate => exchangeRate.currency.code === code
  //   ) ?? null;
  // }
}
