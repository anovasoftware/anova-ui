// financial.models.ts

export interface Currency {
  currencyId: string;
  code: string;
}

export interface Job {
  jobId: string;
  description: string;
  jobExtensionId: string;
  lastRunTime: string | null;
}

export interface ExchangeRate {
  currency: Currency;
  rate: number;
}

export interface ExchangeRateData {
  cached: boolean;
  homeCurrency: Currency | null;
  job: Job | null;
  rates: ExchangeRate[];
}
