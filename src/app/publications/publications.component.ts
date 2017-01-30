import { PublicationsService } from './../shared/publications.service';
import { Publication } from './../model/publication.model';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  @Input() searchpublications: Observable<Publication[]>;
  @Input() isFiltred: boolean;
  @Input() searchText: string;
  publications: Observable<Publication[]>;
  searchStr: string;

  constructor(private publicationsService: PublicationsService,
    private router: Router) { }

  ngOnInit() {
    this.publications = this.publicationsService.findLastestPublications();
  }
  onInput(e: any) {
    this.searchStr = e.target.value;
  }
  findRecords() {
    let queryParams = {};

    if (this.searchStr && this.searchStr !== '') {
      queryParams['text'] = this.searchStr;
    }
    this.router.navigate(['/publications', queryParams]);
  }
}
