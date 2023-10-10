import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BehaviorSubject, map, Subject, Subscription } from 'rxjs';
import { IAutor } from 'src/app/models/autor';
import { AutorsService } from 'src/app/services/autors.service';
import { CustomControlDirective } from '../../directives/custom-control.directive';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AutoCompleteModule],
  providers: [
    CustomControlDirective,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomControlDirective,
      multi: true,
    },
  ],
})
export class AuthorsComponent extends CustomControlDirective implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('autoComplete', { static: true, read: ElementRef }) autoComplete: ElementRef = {} as ElementRef;

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
          }
        }
      }),
    );
  }

  ngAfterViewInit() {
    const autoCompleteElement = this.autoComplete.nativeElement as HTMLElement;

    const classObserver = new MutationObserver(() => {
      const classList = Array.from(autoCompleteElement.classList);

      if (classList.includes('ng-touched')) {
        this.control.markAsTouched();
      }
      if (classList.includes('ng-dirty')) {
        this.control.markAsDirty();
      }
    });

    classObserver.observe(autoCompleteElement, { attributes: true });

    this.control.statusChanges.subscribe((status) => {
      if (status === 'INVALID') {
        autoCompleteElement.classList.add('ng-invalid');
      } else {
        autoCompleteElement.classList.remove('ng-invalid');
      }
    });
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
    this.subscriptions.add(
      this.autorsService
        .getList({ name_like: query })
        .pipe(map((response) => response.body as IAutor[]))
        .subscribe((filteredAutors) => {
          this.$filteredAutors.next(filteredAutors);
        }),
    );
  }
}
