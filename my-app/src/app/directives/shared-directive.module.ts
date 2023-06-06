import { NgModule } from '@angular/core';
import { CourseBorderDirective } from './course-border.directive';

@NgModule({
  declarations: [CourseBorderDirective],
  exports: [CourseBorderDirective],
  imports: [],
})
export class SharedDirectiveModule {}
