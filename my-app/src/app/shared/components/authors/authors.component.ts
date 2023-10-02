import { CommonModule } from '@angular/common';
import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BehaviorSubject, map, Subject, Subscription } from 'rxjs';
import { IAutor } from 'src/app/models/autor';
import { AutorsService } from 'src/app/services/autors.service';
import { ControlComponent } from '../control/control.component';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AutoCompleteModule],
  providers: [
    ControlComponent,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ControlComponent,
      multi: true,
    },
  ],
})
export class AuthorsComponent extends ControlComponent implements OnInit, OnDestroy {
  public $filteredAutors = new Subject<IAutor[]>();
  public $loading = new BehaviorSubject<boolean>(false);

  subscriptions = new Subscription();

  constructor(injector: Injector, private autorsService: AutorsService) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.subscriptions.add(
      this.control.valueChanges.subscribe((value) => {
        if (value) {
          if (value.length && typeof value[0] !== 'object') {
            this.$loading.next(true);
            this.autorsService
              .getList({ id: value })
              .pipe(map((response) => response.body as IAutor[]))
              .subscribe((selectedAutors) => {
                this.selectedAutors = selectedAutors;
                this.$loading.next(false);
              });
          } else {
            this.subscriptions.unsubscribe();
          }
        }
      }),
    );
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    this.subscriptions.unsubscribe();
  }

  get selectedAutors(): IAutor[] {
    return this.control.value;
  }

  set selectedAutors(value: IAutor[]) {
    this.control.setValue(value);
  }

  filterAutors(event: { originalEvent: Event; query: string }) {
    const query = event.query;
    this.autorsService
      .getList({ name_like: query })
      .pipe(map((response) => response.body as IAutor[]))
      .subscribe((filteredAutors) => {
        this.$filteredAutors.next(filteredAutors);
      });
  }
}
