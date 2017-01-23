import { PublicationsService } from './../shared/publications.service';
import { Publication } from './../model/publication.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-choosen',
  templateUrl: './choosen.component.html',
  styleUrls: ['./choosen.component.css'],
  providers: [PublicationsService]
})
export class ChoosenComponent implements OnInit {
publications: Observable<Publication[]>;
  constructor(private publicationsService: PublicationsService) { }

  ngOnInit() {
    this.publications = this.publicationsService.findChoosenPublications();
  }

}
