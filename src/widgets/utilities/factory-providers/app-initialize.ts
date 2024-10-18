import { AuthService, NotificationService } from '../services';
import { EMPTY, Observable, of, tap } from 'rxjs';
import { CookieKey } from '../contants';
import { CookieService } from 'ngx-cookie-service';

export function initializeAppRouting(
  authService: AuthService,
  cookieService: CookieService,
  notificationService: NotificationService
): () => Observable<any> {
  return () => {
    if (!cookieService.get(CookieKey.AccessToken)) {
      return EMPTY;
    }
    return of({}).pipe(
      tap({
        next: (value) => {
          console.log('=> value = ', value);
        },
        error: (err) => {
          notificationService.setNotification({
            modifier: 'danger',
            message: err.message ?? 'Something went wrong',
          });
        },
      })
    );
  };
}
