import { NgModule } from '@angular/core';
import { DurationPipe } from './duration.pipe';
import { FilterPipe } from './filter.pipe';
import { OrderByPipe } from './order-by.pipe';

@NgModule({
  declarations: [DurationPipe, OrderByPipe, FilterPipe],
  exports: [DurationPipe, OrderByPipe, FilterPipe],
  providers: [FilterPipe],
  imports: [],
})
export class SharedPipeModule {}
