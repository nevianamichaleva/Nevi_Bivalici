import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { Observable, Subject } from 'rxjs/Rx';
import { Publication } from '../model/publication.model';
import { FirebaseListFactoryOpts } from 'angularfire2/interfaces';
import { Http } from '@angular/http';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseRef } from 'angularfire2';
import { database } from 'firebase';

@Injectable()
export class PublicationsService {
sdkDb: any;

  constructor(private db: AngularFireDatabase,
        @Inject(FirebaseRef) fb,
        private http: Http
    ) {
        this.sdkDb = fb.database().ref();
    }
findAllPublications(): Observable<Publication[]> {
        return this.db.list('publications')
            .map(Publication.fromJsonArray);
    }
}
