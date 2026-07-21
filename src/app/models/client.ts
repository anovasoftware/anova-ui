import {Event} from './event';

export interface ClientExtension {
  clientExtensionId: string;
  currencyId: string;
}

export interface Client {
  clientId: string;
  code: string;
  description: string;
  clientExtension?: ClientExtension | null;
}
