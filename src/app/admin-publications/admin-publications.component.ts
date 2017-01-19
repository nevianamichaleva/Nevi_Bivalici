import { PublicationsService } from './../shared/publications.service';
import { Publication } from './../model/publication.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-publications',
  templateUrl: './admin-publications.component.html',
  styleUrls: ['./admin-publications.component.css']
})
export class AdminPublicationsComponent implements OnInit {
publications: Observable<Publication[]>;

  constructor(private publicationsService: PublicationsService) { }
  
   onStatusChange(key, status) {
     //console.log(status);
    this.publicationsService.changeStatusPublication(key, status);
  }
  
  ngOnInit() {
    this.publications = this.publicationsService.findAllPublications();
  }

}
