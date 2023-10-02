import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent implements OnInit, OnDestroy {
  constructor(private eventService: EventService) {}

  searchString = '';
  subscriptions = new Subscription();

  @Output() search = new EventEmitter<string>();
  @Output() add = new EventEmitter<string>();

  ngOnInit() {
    this.subscriptions.add(
      this.eventService.clearFiltersEvent.subscribe(() => {
        this.searchString = '';
        this.search.emit(this.searchString);
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  searchCourse() {
    this.search.emit(this.searchString);
  }

  addCourse() {
    this.add.emit();
  }
}
