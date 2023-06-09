import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent {
  searchString = '';

  @Output() search = new EventEmitter<string>();

  searchCourse() {
    this.search.emit(this.searchString);
  }
}
