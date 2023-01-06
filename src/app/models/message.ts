export class User {
    messageText: string;
    transmitterId: string;
    sendDate: Date;

    constructor(obj?: any) {
        this.messageText = obj ? obj.messageText : '';
        this.transmitterId = obj ? obj.transmitterId : '';
        this.sendDate = obj ? obj.sendDate : '';
    }

    public toJSON() {
        return {
            messageText: this.messageText,
            userId: this.transmitterId,
            sendDate: this.sendDate
        }
    }
}