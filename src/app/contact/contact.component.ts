import { AlertService } from './../shared/alert/alert.service';
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
    private publicationsService: PublicationsService,
    private alertService: AlertService
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
        this.alertService.success('Съобщението е изпратено', true);
        this.myForm.reset();
      })
      .catch(err => this.alertService.error(`Грешка при изпращане на съобщение ${err}`));
  }

}
