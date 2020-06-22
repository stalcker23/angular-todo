import { InjectionToken } from '@angular/core';

enum directionTypes {
  asc = 'asc',
  desc = 'desc',
  empty = ''
}

const DIRECTION_TYPES = new InjectionToken<object>('directionTypes');

export { DIRECTION_TYPES, directionTypes };
