import { AlertService } from './../shared/alert/alert.service';
import { DataService } from './../shared/data.service';
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

  constructor(
    private publicationsService: PublicationsService,
    private db: DataService,
    private alertService: AlertService
  ) { }

  onStatusChange(key, status) {
    //console.log(status);
    this.publicationsService.changeStatusPublication(key, status);
  }

  ngOnInit() {
    this.publications = this.publicationsService.findAllPublications();
  }

  onDelete(key) {
    let answer = confirm("Потвърдете изтриването на публикацията!");
    if (answer == true) {
      this.db.deleteItemFromCollection('publications', key)
      .then(() => this.alertService.success('Публицацията е изтрита', true))
      .catch(err => this.alertService.error(`Грешка при изтриване ${err}`));
    } 
  }

}
