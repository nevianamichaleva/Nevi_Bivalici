import { DataService } from './shared/data.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { firebaseConfig } from './environments/firebase.config';
import { AngularFireModule } from 'angularfire2/index';
import { ReactiveFormsModule } from '@angular/forms';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

import { AppComponent } from './app.component';
import { PublicationsComponent } from './publications/publications.component';
import { NewPublicationComponent } from './new-publication/new-publication.component';
import { PostFormComponent } from './post-form/post-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AlertModule } from 'ng2-bootstrap';
import { ChoosenComponent } from './choosen/choosen.component';

@NgModule({
  declarations: [
    AppComponent,
    PublicationsComponent,
    NewPublicationComponent,
    PostFormComponent,
    NavbarComponent,
    FooterComponent,
    ChoosenComponent
  ],
  imports: [
    BrowserModule,
    AlertModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
