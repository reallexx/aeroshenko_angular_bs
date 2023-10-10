import { Directive, forwardRef, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NgControl,
  NgModel,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ReplaySubject, takeUntil, tap } from 'rxjs';

@Directive({
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomControlDirective),
      multi: true,
    },
  ],
})
export class CustomControlDirective implements OnInit, OnDestroy {
  public control: FormControl = new FormControl();

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  private onChange: unknown;
  private onTouched: unknown;

  constructor(@Inject(Injector) private injector: Injector) {}

  public ngOnInit(): void {
    this.setComponentControl();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private setComponentControl(): void {
    const injectedControl = this.injector.get(NgControl);

    switch (injectedControl.constructor) {
      case NgModel: {
        const { control, update } = injectedControl as NgModel;

        this.control = control;

        this.control.valueChanges
          .pipe(
            tap((value) => update.emit(value)),
            takeUntil(this.destroyed$),
          )
          .subscribe();
        break;
      }
      case FormControlName: {
        this.control = this.injector.get(FormGroupDirective).getControl(injectedControl as FormControlName);
        break;
      }
      default: {
        this.control = (injectedControl as FormControlDirective).form as FormControl;
        break;
      }
    }
  }

  writeValue<T>(value: T): void {
    this.control.setValue(value);
  }

  registerOnChange<T>(fn: (value: T) => void): void {
    this.onChange = fn;
    this.control.valueChanges.subscribe(fn);
  }

  registerOnTouched<T>(fn: T): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }
}
