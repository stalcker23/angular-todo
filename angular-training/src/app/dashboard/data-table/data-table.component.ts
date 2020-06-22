import {
  Component,
  OnInit,
  Input,
  QueryList,
  ViewChildren,
  Inject
 } from '@angular/core';
import { Cow } from 'src/app/core/models/cow';
import { SortableHeaderDirective } from 'src/app/shared/directives/sortable-header.directive';
import {
  directionTypes,
  DIRECTION_TYPES
} from 'src/app/core/enums/directionTypes.enum';
import { UtilsService } from 'src/app/core/services/utils.service';
import { ISortColumnEvent } from 'src/app/core/interfaces/sort-event.interface';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent implements OnInit {
  @Input()
  public cows: Cow[];

  private defaultCows: Cow[];
  public cowProperties: any[];

  @ViewChildren(SortableHeaderDirective)
  private headers: QueryList<SortableHeaderDirective>;

  constructor(
    private utilsService: UtilsService,
    @Inject(DIRECTION_TYPES) public directionTypesEnum: typeof directionTypes
  ) {}

  public ngOnInit(): void {
    this.defaultCows = this.cows;
    this.cowProperties = Object.keys(this.cows[0]);
  }


  public onSort({column, direction}: ISortColumnEvent): void {

    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = this.directionTypesEnum.empty;
      }
    });

    if (direction === '' || column === '') {
      this.cows = this.defaultCows;
    } else {
      this.cows = [...this.defaultCows].sort((a, b) => {
        const res = this.utilsService.compare(a[column], b[column]);
        return direction === this.directionTypesEnum.asc ? res : -res;
      });
    }
  }

  trackChanges(index): number {
    return index;
  }
}
