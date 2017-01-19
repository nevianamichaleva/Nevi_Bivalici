import { AuthGuard } from './shared/auth/auth.guard';
import { AuthService } from './shared/auth/auth.service';
import { AlertService } from './shared/alert/alert.service';
import { AlertComponent } from './shared/alert/alert.component';
import { SanitizeHtmlPipe } from './shared/pipes/sanitizeHTML.pipe';
import { PointsPipe } from './shared/pipes/points.pipe';
import { PublicationsService } from './shared/publications.service';
import { DataService } from './shared/data.service';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { firebaseConfig, authConfig } from './environments/firebase.config';
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
import { ChoosenComponent } from './choosen/choosen.component';
import { PublicationCardComponent } from './publication-card/publication-card.component';
import { ContactComponent } from './contact/contact.component';
import { PublicationDetailComponent } from './publication-detail/publication-detail.component';
import { CategoryComponent } from './category/category.component';
import { LoginComponent } from './shared/auth/login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { FormeComponent } from './forme/forme.component';

@NgModule({
  declarations: [
    AppComponent,
    PublicationsComponent,
    NewPublicationComponent,
    PostFormComponent,
    NavbarComponent,
    FooterComponent,
    ChoosenComponent,
    PublicationCardComponent,
    PointsPipe,
    SanitizeHtmlPipe,
    ContactComponent,
    PublicationDetailComponent,
    CategoryComponent,
    AlertComponent,
    LoginComponent,
    MessagesComponent,
    FormeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig, authConfig)
  ],
  providers: [DataService, PublicationsService, AlertService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
