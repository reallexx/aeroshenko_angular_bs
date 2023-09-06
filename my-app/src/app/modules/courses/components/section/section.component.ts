import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, map, Subject, Subscription, pairwise } from 'rxjs';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent implements OnInit, OnDestroy {
  constructor(private eventService: EventService) {}

  search$ = new Subject<string>();
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

    this.subscriptions.add(
      this.search$
        .pipe(
          debounceTime(250),
          map((value) => value.trim()),
          pairwise(),
          filter(([prevValue, currentValue]) => (prevValue.length !== 0 && currentValue.length === 0) || currentValue.length >= 3),
          distinctUntilChanged(),
        )
        .subscribe(([, currentValue]) => {
          this.search.emit(currentValue);
        }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  searchCourse() {
    this.search$.next(this.searchString);
  }

  addCourse() {
    this.add.emit();
  }
}
