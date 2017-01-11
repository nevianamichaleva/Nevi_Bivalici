import { Observable } from 'rxjs/Rx';

export class Publication {
    constructor(
        public $key: string,
        public title: string,
        public content: string,
        public date: string
       ) { }

    static fromJsonList(array): Publication[] {
        return array.map(Publication.fromJson);
    }

    static fromJsonArray(json: any[]): Publication[] {
        return json.map(Publication.fromJson);
    }

    static fromJson({$key, title, content, date}): Publication {
        return new Publication(
            $key,
            title,
            content,
            date
            );
    }
}
