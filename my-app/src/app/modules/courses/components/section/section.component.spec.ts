import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventService } from 'src/app/services/event.service';
import { SectionComponent } from './section.component';

describe('SectionComponent', () => {
  let component: SectionComponent;
  let fixture: ComponentFixture<SectionComponent>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let eventService: EventService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionComponent],
      providers: [EventService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionComponent);
    component = fixture.componentInstance;
    eventService = TestBed.inject(EventService);
    fixture.detectChanges();
  });

  it('should emit search event with the search string', () => {
    const searchSpy = spyOn(component.search, 'emit');

    component.searchString = 'search query';
    component.searchCourse();

    expect(searchSpy).toHaveBeenCalledWith('search query');
  });

  it('should emit add event', () => {
    const addSpy = spyOn(component.add, 'emit');

    component.addCourse();

    expect(addSpy).toHaveBeenCalled();
  });
});
