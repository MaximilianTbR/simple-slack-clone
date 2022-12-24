export class directChat {
    nameOfChat: string;
    participants: JSON;
    unread: boolean;
    messages: JSON;

    constructor(obj: any) {
        this.nameOfChat = obj.nameOfChat ? obj.nameOfChat : '';
        this.participants = obj.participants ? obj.participants : [];
        this.unread = obj.unread ? obj.unread : false;
        this.messages = obj.messages ? obj.messages : [];
    }

    public toJSON() {
        return {
            nameOfChat: this.nameOfChat,
            participants: this.participants,
            unread: this.unread,
            messages: this.messages,
        }
    }
}