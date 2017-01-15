import { Category } from './../model/category.model';
import { PublicationsService } from './../shared/publications.service';
import { Publication } from './../model/publication.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { database } from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  tinyBody: any;
  myDBForm: FormGroup;
  categoryForm: FormGroup;
  selectedFile: any;
  category: string;
  categories: Observable<Category[]>;
  showStyle: false;
  newCategory: string;

  constructor(private fb: FormBuilder, private publicationsService: PublicationsService) { }

  ngOnInit() {
    this.category = "Шиене";

    this.categories = this.publicationsService.findAllCategories();

    this.categoryForm = this.fb.group({
      name: ''
    })

    this.myDBForm = this.fb.group({
      title: '',
      image: '',
      category: '',
      content: '',
      choosen: '',
      date: ''
    });
  }

  getStyle() {
    if (this.showStyle) {
      return "";
    } else {
      return "none";
    }
  }
  onInput(val) {
    this.newCategory = val;
  }
  onBodyTextEditorKeyUp(textValue) {
    this.tinyBody = textValue;
  }

  onCategoryChange(deviceValue) {
    this.category = deviceValue;
  }

  onImageSelected(e: any) {
    this.selectedFile = e.target.files[0];
    //console.log(this.selectedFile);
  }

  onCategoryAdd() {
    this.categoryForm.patchValue({ name: this.newCategory });
    this.publicationsService.createNewCategory(this.categoryForm.value)
      .subscribe(
      () => {
        console.log('Категорията е записана');
      },
      err => console.log(`Грешка при запис ${err}`)
      )
  }

  onSubmit() {
    let currentdate = new Date();
    let datetime = currentdate.getDate() + '/'
      + (currentdate.getMonth() + 1) + '/'
      + currentdate.getFullYear() + ' @ '
      + currentdate.getHours() + ':'
      + currentdate.getMinutes() + ':'
      + currentdate.getSeconds();
    this.myDBForm.patchValue({ date: datetime });
    this.myDBForm.patchValue({ content: this.tinyBody });
    this.myDBForm.patchValue({ category: this.category });

    if (this.selectedFile) {
      let firebase = require('firebase');
      // Create a root reference
      let storageRef = firebase.storage().ref();

      // Create a reference to image name
      let imageRef = storageRef.child(this.selectedFile.name);

      imageRef.put(this.selectedFile)
        .then(snapshot => {
          this.myDBForm.value.image = snapshot.downloadURL;
          this.publicationsService.createNewPublication(this.myDBForm.value)
            .subscribe(
            () => {
              console.log('Публикацията е записана');
              this.myDBForm.reset();
            },
            err => console.log(`Грешка при запис ${err}`)
            )
        });
    } else {
      this.publicationsService.createNewPublication(this.myDBForm.value)
        .subscribe(
        () => {
          console.log('Публикацията е записана');
          this.myDBForm.reset();
        },
        err => console.log(`Грешка при запис ${err}`)
        )
    }
  }

}
