import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CowKeysPipe } from './pipes/cow-keys.pipe';
import { ObjectValuesPipe } from './pipes/object-values.pipe';
import { SortableHeaderDirective } from './directives/sortable-header.directive';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ CowKeysPipe, ObjectValuesPipe, SortableHeaderDirective ],
  exports: [ CowKeysPipe, ObjectValuesPipe, SortableHeaderDirective ],
})
export class SharedModule { }
