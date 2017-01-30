import { Router } from '@angular/router';
import { AlertService } from './../shared/alert/alert.service';
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
  showStyle: boolean;
  newCategory: string;

  constructor(
    private fb: FormBuilder, 
    private publicationsService: PublicationsService, 
    private alertService: AlertService,
    private router: Router
    ) { }

  ngOnInit() {
    this.category = "Шиене";
    this.showStyle = false;
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
      date: '',
      status
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
      .then(
      () => {
        this.alertService.success('Категорията е записана', true);
      })
      .catch(err => this.alertService.error(`Грешка при запис ${err}`))
  }

  onSubmit() {
    let currentdate = new Date();
    
    this.myDBForm.patchValue({ date: currentdate.toString() });
    this.myDBForm.patchValue({ content: this.tinyBody });
    this.myDBForm.patchValue({ status: false });
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
            .then(
            () => {
              this.alertService.success('Публикацията е записана', true);
              this.myDBForm.reset();
              tinymce.activeEditor.setContent('');
            })
            .catch(err => this.alertService.error(`Грешка при запис ${err}`))
        });
    } else {
      this.publicationsService.createNewPublication(this.myDBForm.value)
        .then(
        () => {
          this.alertService.success('Публикацията е записана', true);
          this.myDBForm.reset();
          tinymce.activeEditor.setContent('');
          this.router.navigate(['/admin_publication']);
        })
        .catch(err => this.alertService.error(`Грешка при запис ${err}`))
    }
  }
  onStyle() {
    this.showStyle = !this.showStyle;
  }
}
