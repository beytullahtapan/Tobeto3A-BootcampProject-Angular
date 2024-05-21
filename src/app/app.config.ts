import { ApplicationConfig } from '@angular/core';
import { getAppProviders } from './shared/providers/app-providers';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    getAppProviders(), provideAnimationsAsync()
  ]
};
