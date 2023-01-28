export class privateChat {
    chatName: string;
    chatDescription: string;
    chatMessages: Array<any>;
    unread: boolean;
    participants: Array<any>;

    constructor(obj?: any) {
        this.chatName = obj ? obj.chatName : '';
        this.chatDescription = obj ? obj.chatDescription : '';
        this.chatMessages = obj ? obj.chatMessages : [];
        this.unread = obj ? obj.unread : false;
        this.participants = obj ? obj.participants : [];
    }

    public toJSON() {
        return {
            chatName: this.chatName,
            chatDescription: this.chatDescription,
            chatMessages: this.chatMessages,
            unread: this.unread,
            participants: this.participants,
        }
    }
}