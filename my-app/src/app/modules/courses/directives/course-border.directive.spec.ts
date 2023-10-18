import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CourseBorderDirective } from './course-border.directive';

@Component({
  template: ` <div [courseBorder]="course"></div> `,
})
class TestComponent {
  course: { creationDate: Date } | undefined;
}

describe('CourseBorderDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let divElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseBorderDirective, TestComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);

    divElement = fixture.debugElement.query(By.css('div'));
  });

  it('should apply green border for courses created within the last two weeks', () => {
    const currentDate = new Date();
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(currentDate.getDate() - 14);

    component = fixture.componentInstance;
    component.course = { creationDate: twoWeeksAgo };
    fixture.detectChanges();

    expect(divElement.styles['border']).toBe('1px solid green');
  });

  it('should apply blue border for courses created in the future', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 7);

    component = fixture.componentInstance;
    component.course = { creationDate: futureDate };
    fixture.detectChanges();

    expect(divElement.styles['border']).toBe('1px solid blue');
  });

  it('should not apply any border for courses created more than two weeks ago', () => {
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 21);

    component = fixture.componentInstance;
    component.course = { creationDate: oldDate };
    fixture.detectChanges();

    expect(divElement.styles['border']).toBeFalsy();
  });
});
