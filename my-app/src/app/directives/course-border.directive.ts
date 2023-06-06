import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ICourse } from '../models/course';

@Directive({
  selector: '[courseBorder]',
})
export class CourseBorderDirective implements OnInit {
  creationDate: Date = new Date();
  @Input() set courseBorder(course: ICourse) {
    this.creationDate = course.creationDate;
  }

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const currentDate = new Date();
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(currentDate.getDate() - 14);

    if (this.creationDate < currentDate && this.creationDate >= twoWeeksAgo) {
      this.el.nativeElement.style.border = '1px solid green';
    } else if (this.creationDate > currentDate) {
      this.el.nativeElement.style.border = '1px solid blue';
    }
  }
}
