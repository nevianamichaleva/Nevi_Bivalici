import { Category } from './../model/category.model';
import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { Observable, Subject } from 'rxjs/Rx';
import { Publication } from '../model/publication.model';
import { FirebaseListFactoryOpts } from 'angularfire2/interfaces';
import { DataService } from './data.service';
import { Http } from '@angular/http';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseRef } from 'angularfire2';
import { database } from 'firebase';

@Injectable()
export class PublicationsService {
    sdkDb: any;

    constructor(private db: DataService,
    @Inject(FirebaseRef) fb,
        private http: Http
    ) { this.sdkDb = fb.database().ref();}

    findAllPublications(): Observable<Publication[]> {
        return this.db.getCollection('publications')
            .map(Publication.fromJsonArray);
    }

    findAllCategories(): Observable<Category[]> {
        return this.db.getCollection('category')
            .map(Category.fromJsonArray);
    }

    findLastestPublications(count = 5) {
        let query = {
            limitToLast: count
        };
        return this.db.getCollection('publications', { query })
            .map(Publication.fromJsonArray);
    }

    findPublicationByKey(publicationKey: string): Observable<Publication> {
        return this.db.getItem(`publications/${publicationKey}`)
            .map(Publication.fromJson);
    }

    createNewCategory(category: any): Observable<any> {
        const subject = new Subject();
        this.sdkDb.child('category').push(category)
        .then(
            val => {
                subject.next(val);
                subject.complete();

            },
            err => {
                subject.error(err);
                subject.complete();
            }
            );
        return subject.asObservable();
    }

    createNewPublication(publication: any): Observable<any> {
        const subject = new Subject();
        this.sdkDb.child('publications').push(publication)
        .then(
            val => {
                subject.next(val);
                subject.complete();

            },
            err => {
                subject.error(err);
                subject.complete();
            }
            );
        return subject.asObservable();
    }
}
