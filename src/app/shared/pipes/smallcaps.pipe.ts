import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'smallcaps'
})

export class SmallCapsPipe implements PipeTransform {

    transform(value:any) {
        if (value) {
            return value.toLowerCase();
        }
        return value;
    }

}