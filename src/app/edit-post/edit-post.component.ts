import { AlertService } from './../shared/alert/alert.service';
import { Category } from './../model/category.model';
import { PublicationsService } from './../shared/publications.service';
import { Publication } from './../model/publication.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})

export class EditPostComponent implements OnInit {
  cont: string;
  genre: string;
  publication: Observable<Publication>;
  publicationKey: string;
  myDBForm: FormGroup;
  categories: Observable<Category[]>;
  selectedFile: any;
  tinyBody: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private publicationService: PublicationsService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.publicationKey = this.route.snapshot.params['id'];
    this.categories = this.publicationService.findAllCategories();
    this.publication = this.publicationService.findPublicationByKey(this.publicationKey);
    this.publication.
      subscribe((x) => {
        this.genre = x.category;
        this.cont = x.content;
        //console.log(this.genre);
        //console.log(this.cont);
      });
    setTimeout(() => {
      if (tinymce.activeEditor) {
        tinymce.activeEditor.setContent(this.cont);
      }
    }, 1000);

    this.myDBForm = this.fb.group({
      title: '',
      image: '',
      category: '',
      choosen: '',
      content: '',
      date: '',
      status: ''
    });
  }

  onImageSelected(e: any) {
    this.selectedFile = e.target.files[0];
  }

  onCategoryChange(e: any) {
    this.genre = e.target.value;
  }

  onBodyTextEditorChange(textValue) {
    this.cont = textValue;
  }

  onUpdatePost() {
    this.myDBForm.value.category = this.genre;
    this.myDBForm.value.content = this.cont;
    this.publicationService.updatePublication(this.publication, this.myDBForm.value, this.selectedFile)
      .then(() => this.alertService.success('Обявата е редактирана', true))
      .catch(err => this.alertService.error(`Грешка при редакция на обява ${err}`));
  }

  
}
