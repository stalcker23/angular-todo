import { HostListener, OnInit, Directive, Input, EventEmitter, Output, HostBinding, Inject } from '@angular/core';
import { Cow } from 'src/app/core/models/cow';

import { DIRECTION_TYPES, directionTypes } from 'src/app/core/enums/directionTypes.enum';
import { ISortColumnEvent } from 'src/app/core/interfaces/sort-event.interface';

@Directive({
  selector: 'th[sortable]'
})
export class SortableHeaderDirective implements OnInit {
  @Input() sortable: Cow ;
  @Input() direction: directionTypes;
  @Output() sort = new EventEmitter<ISortColumnEvent>();

  @HostBinding('class.asc')
  get ascSorting(){
    return this.direction === this.directionTypesEnum.asc;
  }

  @HostBinding('class.desc')
  get descSorting(){
    return this.direction === this.directionTypesEnum.desc;
  }

  @HostBinding('class.sort')
  get emptySorting(){
    return this.direction === this.directionTypesEnum.empty;
  }

  private rotation: {[key: string]: directionTypes} = {
    asc: this.directionTypesEnum.desc,
    desc: this.directionTypesEnum.empty,
    '': this.directionTypesEnum.asc
  };

  constructor(@Inject(DIRECTION_TYPES) public directionTypesEnum: typeof directionTypes) {}

  public ngOnInit(){
    this.direction = this.directionTypesEnum.empty;
  }


  @HostListener('click') onClick() {
    this.rotate();
  }

  private rotate() {
    this.direction = this.rotation[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}
