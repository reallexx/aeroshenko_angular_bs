import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent implements OnInit {
  constructor(private eventService: EventService) {}

  searchString = '';

  @Output() search = new EventEmitter<string>();
  @Output() add = new EventEmitter<string>();

  ngOnInit() {
    this.eventService.clearFiltersEvent.subscribe(() => {
      this.searchString = '';
      this.searchCourse();
    });
  }

  searchCourse() {
    this.search.emit(this.searchString);
  }

  addCourse() {
    this.add.emit();
  }
}
