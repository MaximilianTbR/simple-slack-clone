export class Message {
    message: string;

    constructor(obj?: any) {
        this.message = obj ? obj.message : '';
    }

    public toJSON() {
        return {
            message: this.message,
        }
    }
}