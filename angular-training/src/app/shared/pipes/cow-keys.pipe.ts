import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cowKeys',  pure: false })
export class CowKeysPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return value.map((cowPropertyKey: string) => {
            return {
                original: cowPropertyKey,
                normalized: cowPropertyKey.split(/(?=[A-Z])/).join(' ')
            };
        });
    }
}
