import { ApplicationConfig } from '@angular/core';
import { getAppProviders } from './shared/providers/app-providers';

export const appConfig: ApplicationConfig = {
  providers: [
    getAppProviders()
  ]
};
