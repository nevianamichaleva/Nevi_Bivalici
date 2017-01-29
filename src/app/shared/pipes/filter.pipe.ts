import { Publication } from './../../model/publication.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterBy'
})
export class PublicationFilterByPipe implements PipeTransform {
    transform(publications: Publication[], filter: string): any[] {
        if (publications) {
            if (!filter) {
                return publications;
            }
            filter = filter || '';
            
            return publications.filter(post => (post.content.toLowerCase().indexOf(filter.toLowerCase()) > -1
            || post.title.toLowerCase().indexOf(filter.toLowerCase()) > -1));
        }
    }
};