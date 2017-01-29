import { PublicationsService } from './../shared/publications.service';
import { Publication } from './../model/publication.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-found-publications',
  templateUrl: './found-publications.component.html',
  styleUrls: ['./found-publications.component.css']
})
export class FoundPublicationsComponent implements OnInit {
  searchpublications: Observable<Publication[]>;
  searchText: string;
  isFiltred: boolean;
  constructor(private publicationService: PublicationsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.isFiltred = true;
    this.route.params
      .subscribe((params: Params) => {
        this.searchText = params['text'] || '';
      });
      this.searchpublications = this.publicationService.findChoosenPublications();
  }

}
