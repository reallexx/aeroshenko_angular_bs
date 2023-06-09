import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ICourse } from '../models/course';

@Directive({
  selector: '[courseBorder]',
})
export class CourseBorderDirective implements OnInit {
  private _creationDate: Date = new Date();
  @Input() set courseBorder(course: ICourse) {
    this._creationDate = course.creationDate;
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const currentDate = new Date();
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(currentDate.getDate() - 14);

    if (this._creationDate < currentDate && this._creationDate >= twoWeeksAgo) {
      this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid green');
    } else if (this._creationDate > currentDate) {
      this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid blue');
    }
  }
}
