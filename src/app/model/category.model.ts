import { Observable } from 'rxjs/Rx';

export class Category {
    constructor(
        public $key: string,
        public name: string,
       ) { }

    static fromJsonList(array): Category[] {
        return array.map(Category.fromJson);
    }

    static fromJsonArray(json: any[]): Category[] {
        return json.map(Category.fromJson);
    }

    static fromJson({$key, name}): Category {
        return new Category(
            $key,
            name
            );
    }
}