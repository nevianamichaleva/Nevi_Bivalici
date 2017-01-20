import { AdminPublicationsComponent } from './admin-publications/admin-publications.component';
import { FormeComponent } from './forme/forme.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { LoginComponent } from './shared/auth/login/login.component';
import { CategoryComponent } from './category/category.component';
import { PublicationDetailComponent } from './publication-detail/publication-detail.component';
import { ContactComponent } from './contact/contact.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PublicationsComponent } from './publications/publications.component';
import { NewPublicationComponent } from './new-publication/new-publication.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { EditPostComponent } from './edit-post/edit-post.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: PublicationsComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'forme', component: FormeComponent},
    {
        path: 'publication',
        children: [
            { path: ':id', component: PublicationDetailComponent }
        ]
    },
    { path: 'category/:id/:name', component: CategoryComponent },
    { path: 'loginforadmin', component: LoginComponent },
    { path: 'addnewpublication', component: PostFormComponent, canActivate: [AuthGuard] },
    { path: 'admin_publication', component: AdminPublicationsComponent, canActivate: [AuthGuard] },
    { path: 'editpost/:id', component: EditPostComponent, canActivate: [AuthGuard] },
    { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }