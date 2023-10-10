import { CommonModule } from '@angular/common';
import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CustomControlDirective } from '../../directives/custom-control.directive';
import { DurationPipe } from '../../pipes/duration.pipe';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, DurationPipe],
  providers: [
    CustomControlDirective,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomControlDirective,
      multi: true,
    },
  ],
})
export class DurationComponent extends CustomControlDirective implements OnInit, OnDestroy {
  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
