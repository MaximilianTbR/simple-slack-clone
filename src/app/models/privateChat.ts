export class privateChat {
    chatMessages: Array<any>;
    participants: Array<any>;
    participantNames: Array<any>;

    constructor(obj?: any) {
        this.chatMessages = obj ? obj.chatMessages : [];
        this.participants = obj ? obj.participants : [];
        this.participantNames = obj ? obj.participantNames : [];
    }

    public toJSON() {
        return {
            chatMessages: this.chatMessages,
            participants: this.participants,
            participantNames: this.participantNames
        }
    }
}