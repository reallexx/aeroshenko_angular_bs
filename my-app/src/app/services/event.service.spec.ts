import { TestBed } from '@angular/core/testing';
import { EventService } from './event.service';

describe('EventService', () => {
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventService],
    });

    eventService = TestBed.inject(EventService);
  });

  it('should emit clearFiltersEvent when clearFiltersEvent.emit() is called', () => {
    spyOn(eventService.clearFiltersEvent, 'emit');

    eventService.clearFiltersEvent.emit();

    expect(eventService.clearFiltersEvent.emit).toHaveBeenCalled();
  });
});
