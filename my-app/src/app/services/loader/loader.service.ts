import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private subject = new BehaviorSubject<boolean>(false);
  show$ = this.subject.asObservable();

  show(): void {
    this.subject.next(true);
  }

  hide(): void {
    this.subject.next(false);
  }
}
