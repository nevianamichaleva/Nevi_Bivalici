import { Observable } from 'rxjs/Rx';

export class Publication {
    constructor(
        public $key: string,
        public title: string,
        public image: string,
        public category: string,
        public content: string,
        public date: string,
        public choosen: boolean
       ) { }

    static fromJsonList(array): Publication[] {
        return array.map(Publication.fromJson);
    }

    static fromJsonArray(json: any[]): Publication[] {
        return json.map(Publication.fromJson);
    }

    static fromJson({$key, title, image, category, content, date, choosen}): Publication {
        return new Publication(
            $key,
            title,
            image,
            category,
            content,
            date,
            choosen
            );
    }
}
