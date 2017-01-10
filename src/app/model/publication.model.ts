import { Observable } from 'rxjs/Rx';

export class Publication {
    constructor(
        public $key: string,
        public date: string,
        public text: string,
        public title: string
       ) { }

    static fromJsonList(array): Publication[] {
        return array.map(Publication.fromJson);
    }

    static fromJsonArray(json: any[]): Publication[] {
        return json.map(Publication.fromJson);
    }

    static fromJson({$key, date, text, title}): Publication {
        return new Publication(
            $key,
            date,
            text,
            title
            );
    }
}
