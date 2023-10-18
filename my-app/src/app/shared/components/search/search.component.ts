import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { debounceTime, distinctUntilChanged, filter, map, pairwise, Subscription } from 'rxjs';
import { CustomControlDirective } from '../../directives/custom-control.directive';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule],
  providers: [
    CustomControlDirective,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomControlDirective,
      multi: true,
    },
  ],
})
export class SearchComponent extends CustomControlDirective implements OnInit, OnDestroy {
  subscriptions = new Subscription();

  @Output() search = new EventEmitter<string>();

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    this.subscriptions.unsubscribe();
  }

  searchCourse() {
    this.subscriptions.add(
      this.control.valueChanges
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

  clearSearch() {
    this.control.setValue('');
    this.searchCourse();
  }
}
