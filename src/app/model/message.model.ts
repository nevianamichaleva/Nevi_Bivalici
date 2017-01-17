import { Observable } from 'rxjs/Rx';

export class Message {
    constructor(
        public $key: string,
        public email: string,
        public name: string,
        public notes: string
       ) { }

    static fromJsonList(array): Message[] {
        return array.map(Message.fromJson);
    }

    static fromJsonArray(json: any[]): Message[] {
        return json.map(Message.fromJson);
    }

    static fromJson({$key, email, name, notes}): Message {
        return new Message(
            $key,
            email,
            name,
            notes
            );
    }
}