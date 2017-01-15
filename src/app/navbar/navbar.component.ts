import { Category } from './../model/category.model';
import { PublicationsService } from './../shared/publications.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
categories: Observable<Category[]>;

  constructor(private publicationsService: PublicationsService) { }

  ngOnInit() {
    this.categories = this.publicationsService.findAllCategories();
  }

}
