import { PublicationsService } from './../shared/publications.service';
import { Publication } from './../model/publication.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
publications: Observable<Publication[]>;
category: string;
  constructor(
    private router: ActivatedRoute,
    private publicationService: PublicationsService
    ) { }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      const id = params['id'];
      this.category = params['name'];

      this.publications = this.publicationService.findPublicationsByCategory(this.category);
    });
  }

}
