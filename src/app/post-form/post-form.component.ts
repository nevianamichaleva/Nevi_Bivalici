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
  selectedFile: any;

  constructor(private fb: FormBuilder, private publicationsService: PublicationsService) { }

  ngOnInit() {
    this.myDBForm = this.fb.group({
      title: '',
      image: '',
      category: '',
      content: '',
      date: ''
    });
  }

  onBodyTextEditorKeyUp(textValue) {
    this.tinyBody = textValue;
  }

  onImageSelected(e: any) {
    this.selectedFile = e.target.files[0];
    console.log(this.selectedFile);
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
