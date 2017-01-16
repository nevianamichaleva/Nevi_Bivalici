import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'points'
})
export class PointsPipe implements PipeTransform {
    transform(str: string) {
        return str + "<span>...</span>";
    }
}