import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CowKeysPipe } from './pipes/cow-keys.pipe';
import { ObjectKeysPipe } from './pipes/object-keys.pipe';
import { SortableHeaderDirective } from './directives/sortable-header.directive';
import { ContentEditableDirective } from './directives/content-editable.directive';
import { DigitOnlyDirective } from './directives/digit-only.directive';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ CowKeysPipe, ObjectKeysPipe, SortableHeaderDirective, ContentEditableDirective, DigitOnlyDirective ],
  exports: [ CowKeysPipe, ObjectKeysPipe, SortableHeaderDirective, ContentEditableDirective, DigitOnlyDirective ],
})
export class SharedModule { }
