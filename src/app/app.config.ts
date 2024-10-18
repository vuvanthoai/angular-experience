import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  InMemoryScrollingFeature,
  InMemoryScrollingOptions,
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthService, NotificationService } from '../widgets/utilities/services';
import { authInterceptor } from '../widgets/utilities/interceptors';
import { initializeAppRouting } from '../widgets/utilities/factory-providers';
import { CookieService } from 'ngx-cookie-service';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      appRoutes,
      inMemoryScrollingFeature,
      withEnabledBlockingInitialNavigation()
    ),
    provideAnimations(),
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: authInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppRouting,
      multi: true,
      deps: [AuthService, CookieService, NotificationService],
    },
  ],
};
