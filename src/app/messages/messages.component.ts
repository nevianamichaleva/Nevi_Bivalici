import { AlertService } from './../shared/alert/alert.service';
import { DataService } from './../shared/data.service';
import { Message } from './../model/message.model';
import { PublicationsService } from './../shared/publications.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Observable<Message[]>;

  constructor(
    private publicationsService: PublicationsService,
    private db: DataService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.messages = this.publicationsService.findAllMessages();
  }

  onDelete(key: string) {
    let answer = confirm("Потвърдете изтриването на публикацията!");
    if (answer == true) {
      this.db.deleteItemFromCollection('messages', key)
        .then(() => this.alertService.success('Съобщението е изтрито', true))
        .catch(err => this.alertService.error(`Грешка при запис ${err}`));
    }
  }
}
