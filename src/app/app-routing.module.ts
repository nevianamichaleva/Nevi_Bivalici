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

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'addnewpublication', component: PostFormComponent, canActivate: [AuthGuard] },
    { path: 'home', component: PublicationsComponent },
    { path: 'contact', component: ContactComponent },
    {
        path: 'publication',
        children: [
            { path: ':id', component: PublicationDetailComponent }
        ]
    },
    { path: 'category/:id/:name', component: CategoryComponent },
    { path: 'loginforadmin', component: LoginComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }