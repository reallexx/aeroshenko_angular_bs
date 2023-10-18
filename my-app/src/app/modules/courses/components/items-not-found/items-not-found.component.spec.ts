import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventService } from 'src/app/services/event.service';
import { ItemsNotFoundComponent } from './items-not-found.component';

describe('ItemsNotFoundComponent', () => {
  let component: ItemsNotFoundComponent;
  let fixture: ComponentFixture<ItemsNotFoundComponent>;
  let eventService: EventService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemsNotFoundComponent],
      providers: [EventService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsNotFoundComponent);
    component = fixture.componentInstance;
    eventService = TestBed.inject(EventService);
    fixture.detectChanges();
  });

  it('should emit clearFiltersEvent when clearFilters is called', () => {
    const clearFiltersSpy = spyOn(eventService.clearFiltersEvent, 'emit');

    component.clearFilters();

    expect(clearFiltersSpy).toHaveBeenCalled();
  });
});
