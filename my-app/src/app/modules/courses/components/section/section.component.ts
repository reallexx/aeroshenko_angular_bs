import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent {
  searchString = '';

  @Output() search = new EventEmitter<string>();
  @Output() add = new EventEmitter<string>();

  searchCourse() {
    this.search.emit(this.searchString);
  }

  addCourse() {
    this.add.emit();
  }
}
