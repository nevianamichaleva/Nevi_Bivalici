import { PublicationsService } from './../shared/publications.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
myForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private publicationsService: PublicationsService
    ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: '',
      name: '',
      notes: ''
    });
  }
  onSent() {
    this.publicationsService.createNewContactMessage(this.myForm.value)
      .then(() => {
        console.log('Съобщението е изпратено');
        this.myForm.reset();
      })
      .catch(err => console.log(`Грешка при изпращане на съобщение`));
  }

}
