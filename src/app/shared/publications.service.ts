import { Message } from './../model/message.model';
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

    private savePublicationImage(image) {
        return this.db.saveStorageItem(image.name, image)
            .then(dbImage => dbImage.downloadURL);
    }

    findAllPublications(): Observable<Publication[]> {
        return this.db.getCollection('publications')
            .map(Publication.fromJsonArray);
    }

    findAllCategories(): Observable<Category[]> {
        return this.db.getCollection('category')
            .map(Category.fromJsonArray);
    }

    findAllMessages(): Observable<Message[]> {
        return this.db.getCollection('messages')
            .map(Message.fromJsonArray);
    }

    findLastestPublications(count = 5) {
        let query = {
            limitToLast: count,
            orderByChild: 'status',
            equalTo: true
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

    createNewContactMessage(msg: any): firebase.database.ThenableReference {
        return this.db.addItemToCollection('messages', msg);
    }

    findPublicationsByCategory(id:string) {
        let query = {
            orderByChild: 'category',
            equalTo: id
        };
        return this.db.getCollection('publications', { query })
            .map(Publication.fromJsonArray);
    }

    changeStatusPublication(key: string, stat: boolean): firebase.Promise<void> {
        return this.db.updateItem(`publications/${key}`, { status: !stat });
    }

    updatePublication(publication: any, newData: any, newImage?: Object) {
        if (newImage) {
            return this.savePublicationImage(newImage)
                .then(imageURL => newData['image'] = imageURL)
                .then(() => this.db.updateItem(publication, newData));
        } else {
            delete newData.image;
            return this.db.updateItem(publication, newData);
        }
    };

}
