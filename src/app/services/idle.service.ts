import { Injectable, NgZone } from '@angular/core';
import { Subject, timer, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IdleService {
  private idle$ = new Subject<void>();
  private timeoutMillis = 10 * 60 * 1000; // 10 minutes
  private timerSub: Subscription | null = null;

  constructor(private zone: NgZone) {
    this.startListeners();
  }

  get onIdle() {
    return this.idle$.asObservable();
  }

  private startListeners() {
    ['click', 'mousemove', 'keydown', 'scroll', 'touchstart']
      .forEach(event =>
        window.addEventListener(event, () => this.resetTimer(), true)
      );

    this.resetTimer();
  }

  private resetTimer() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }

    // Run timer outside Angular to avoid triggering change detection constantly
    this.zone.runOutsideAngular(() => {
      this.timerSub = timer(this.timeoutMillis).subscribe(() => {
        this.zone.run(() => this.idle$.next());
      });
    });
  }
}
