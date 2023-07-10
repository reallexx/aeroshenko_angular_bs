import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EventService {
  clearFiltersEvent: EventEmitter<void> = new EventEmitter<void>();
}
