import { Publication } from './../model/publication.model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
publication: any;
  constructor() { }

  ngOnInit() {
  }
  
onBodyTextEditorKeyUp(textValue) {

    this.publication = textValue;
    console.log(this.publication);
  }
}
