import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'objectValues',  pure: false })
export class ObjectValuesPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return Object.values(value);
    }
}
