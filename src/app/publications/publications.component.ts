import { PublicationsService } from './../shared/publications.service';
import { Publication } from './../model/publication.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css'],
  providers: [PublicationsService]
})
export class PublicationsComponent implements OnInit {
publications: Observable<Publication[]>;
  constructor(private publicationsService: PublicationsService) { }

  ngOnInit() {
    this.publications = this.publicationsService.findAllPublications();
  }

}
