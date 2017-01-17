import { PublicationsService } from './../shared/publications.service';
import { Publication } from './../model/publication.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-publication-detail',
  templateUrl: './publication-detail.component.html',
  styleUrls: ['./publication-detail.component.css']
})
export class PublicationDetailComponent implements OnInit {
publication: Observable<Publication>;
publicationKey: string;

  constructor(
    private route: ActivatedRoute,
    private publicationService: PublicationsService
    ) { }

  ngOnInit() {
    this.publicationKey = this.route.snapshot.params['id'];
    this.publication = this.publicationService.findPublicationByKey(this.publicationKey);
  }

}
