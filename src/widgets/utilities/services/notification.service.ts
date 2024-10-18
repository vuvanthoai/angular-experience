import { Injectable, Signal, signal } from '@angular/core';

export interface NotificationData {
  modifier?: 'success' | 'danger' | 'warning' | 'info' | 'primary';
  styleClass?: string;
  message?: string;
  description?: string;
  timing?: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _notification = signal<NotificationData>({});

  getNotification$(): Signal<NotificationData> {
    return this._notification;
  }

  setNotification(value: NotificationData) {
    this._notification.set(value);
  }
}
