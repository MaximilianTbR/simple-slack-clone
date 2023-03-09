export class privateChat {
    chatMessages: Array<any>;
    participants: Array<any>;

    constructor(obj?: any) {
        this.chatMessages = obj ? obj.chatMessages : [];
        this.participants = obj ? obj.participants : [];
    }

    public toJSON() {
        return {
            chatMessages: this.chatMessages,
            participants: this.participants,
        }
    }
}