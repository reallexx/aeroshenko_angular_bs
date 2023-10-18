import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe';
import { CourseItemComponent } from './course-item.component';

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DurationPipe],
      declarations: [CourseItemComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit edit event when editCourse is called', () => {
    const course = {
      id: 1,
      name: 'name',
      creationDate: new Date(),
      duration: 1,
      description: 'description',
      authors: [],
    };
    const editSpy = spyOn(component.edit, 'emit');

    component.editCourse(course);

    expect(editSpy).toHaveBeenCalledWith(course);
  });

  it('should emit delete event when deleteCourse is called', () => {
    const courseId = 1;
    const deleteSpy = spyOn(component.delete, 'emit');

    component.deleteCourse(courseId);

    expect(deleteSpy).toHaveBeenCalledWith(courseId);
  });
});
