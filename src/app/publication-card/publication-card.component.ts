import { Component, Input } from '@angular/core';

@Component({
  selector: 'publication-card',
  templateUrl: './publication-card.component.html',
  styleUrls: ['./publication-card.component.css']
})
export class PublicationCardComponent {

  @Input()
  publication: Object;

}
