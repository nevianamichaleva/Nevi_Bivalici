import { PublicationsService } from './../shared/publications.service';
import { Publication } from './../model/publication.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-publication-all',
  templateUrl: './publication-all.component.html',
  styleUrls: ['./publication-all.component.css']
})
export class PublicationAllComponent implements OnInit {
publications: Observable<Publication[]>;
category: string;
  constructor(
    private router: ActivatedRoute,
    private publicationService: PublicationsService
    ) { }

  ngOnInit() {
    this.publications = this.publicationService.findAllPublications();
  }

}
