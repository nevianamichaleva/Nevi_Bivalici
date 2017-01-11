import { PublicationsService } from './../shared/publications.service';
import { Publication } from './../model/publication.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { database } from 'firebase';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
  providers: [PublicationsService]
})
export class PostFormComponent implements OnInit {
  tinyBody: any;
  myDBForm: FormGroup;


  constructor(private fb: FormBuilder, private publicationsService: PublicationsService) { }
 
  onSubmit() {
    this.myDBForm.patchValue({date: new Date()});
    this.myDBForm.patchValue({content: this.tinyBody});
    this.publicationsService.createNewPublication(this.myDBForm.value)
    .subscribe(
              () => {
                  console.log('Публикацията е записана');
              },
              err => console.log(`Грешка при запис ${err}`)
          );
  }

  ngOnInit() {
    this.myDBForm = this.fb.group({
            title: '',
            content: '',
            date: ''
        });
  }

  onBodyTextEditorKeyUp(textValue) {
    this.tinyBody = textValue;
  }
}
