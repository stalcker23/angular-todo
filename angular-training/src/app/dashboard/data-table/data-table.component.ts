import {
  Component,
  OnInit,
  Input,
  QueryList,
  ViewChildren,
  Inject,
  EventEmitter,
  Output,
  ViewEncapsulation,
  TemplateRef
 } from '@angular/core';
import { Cow } from 'src/app/core/models/cow';
import {
  directionTypes,
  DIRECTION_TYPES
} from 'src/app/core/enums/directionTypes.enum';
import { UtilsService } from 'src/app/core/services/utils.service';
import { ISortColumnEvent } from 'src/app/core/interfaces/sort-event.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DataTableComponent implements OnInit {
  @Input()
  public cows: Cow[];

  @Output() updateCow = new EventEmitter<any>();
  @Output() deleteCow = new EventEmitter<any>();
  @Output() addCow = new EventEmitter<any>();

  private defaultCows: Cow[];
  public cowProperties: any[];
  private globalDirection: directionTypes = this.directionTypesEnum.empty;

  constructor(
    private utilsService: UtilsService,
    private modalService: NgbModal,
    @Inject(DIRECTION_TYPES) public directionTypesEnum: typeof directionTypes
  ) {}

  public ngOnInit(): void {
    this.defaultCows = this.cows;
    this.cowProperties = Object.keys(this.cows[0]);
  }


  public onSort({column, direction}: ISortColumnEvent): void {
    if (direction === '' || column === '') {
      this.cows = this.defaultCows;
    } else {
      this.globalDirection = direction;
      this.cows = [...this.defaultCows].sort((cow1, cow2) => {
        const result = this.utilsService.compare(cow1[column], cow2[column]);
        return direction === this.directionTypesEnum.asc ? result : -result;
      });
    }
  }

  public onEditValue(value: string, cowPropertyKey: string, currentCow: Cow): void {
    const cowIndex = this.defaultCows.findIndex(cow => this.findCowByIds(cow, currentCow));
    this.cowsUpdatingDataSync(value, cowPropertyKey, currentCow);
    this.updateCow.next({value, cowPropertyKey, cowIndex});
  }

  public trackChanges(index): number {
    return index;
  }

  public isEditableField(cowProperty: string): boolean {
    return (cowProperty !== 'cowId' && cowProperty !== 'animalId' && cowProperty !== 'eventId');
  }

  public isDigitField(cowProperty: string): boolean {
    return (cowProperty !== 'lactationNumber' && cowProperty !== 'daysInLactation' && cowProperty !== 'ageInDays' && cowProperty !== 'minValueDateTime');
  }

  public openDeletingModal(content: TemplateRef<Cow>, currentCow: Cow): void {
    this.modalService.open(content, {
      windowClass: 'deleting-modal'
    }).result.then(() => {
      const cowIndex = this.cows.findIndex(cow => this.findCowByIds(cow, currentCow));
      this.cowsDeletingDataSync(currentCow, cowIndex);
      this.deleteCow.next(cowIndex);
    });
  }

  public AddNewCow(): void {
    this.addCow.next();
  }

  private cowsDeletingDataSync(currentCow: Cow, cowIndex: number): void {
    this.cows.splice(cowIndex, 1);
    if (this.globalDirection !== this.directionTypesEnum.empty) {
      const cowOriginalIndex = this.defaultCows.findIndex(cow => this.findCowByIds(cow, currentCow));
      this.defaultCows.splice(cowOriginalIndex, 1);
    }
  }

  private cowsUpdatingDataSync(value: string, cowPropertyKey: string, currentCow: Cow): void {
    const cowIndex = this.cows.findIndex(cow => this.findCowByIds(cow, currentCow));
    this.cows[cowIndex][cowPropertyKey] = value;
  }

  public findCowByIds(cow: Cow, currentCow: Cow) {
    return cow.cowId === currentCow.cowId &&
           cow.eventId === currentCow.eventId &&
           cow.animalId === currentCow.animalId;
  }
}
