import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { debounceTime, distinctUntilChanged, filter, map, pairwise, Subject, Subscription } from 'rxjs';
import { ControlComponent } from '../control/control.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule],
  providers: [
    ControlComponent,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ControlComponent,
      multi: true,
    },
  ],
})
export class SearchComponent extends ControlComponent implements OnInit, OnDestroy {
  search$ = new Subject<string>();
  subscriptions = new Subscription();

  @Output() search = new EventEmitter<string>();

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();

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

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    this.subscriptions.unsubscribe();
  }

  searchCourse() {
    this.search.emit(this.control.value);
  }

  clearSearch() {
    this.control.setValue('');
    this.searchCourse();
  }
}
