import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICourse } from 'src/app/models/course';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
})
export class CourseEditComponent {
  @Input() course = {} as ICourse;

  @Output() cancel = new EventEmitter();

  cancelAction() {
    this.cancel.emit();
  }

  saveCourse() {
    console.log('saveCourse');
  }
}
