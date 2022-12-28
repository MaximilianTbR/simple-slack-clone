export class Channel {
    channelName: string;
    channelDescription: string;
    channelMessages: Array<any>;
    unread: boolean;
    participants: JSON;
    channelIndex: number;

    constructor(obj?: any) {
        this.channelName = obj ? obj.channelName : '';
        this.channelDescription = obj ? obj.channelDescription : '';
        this.channelMessages = obj ? obj.channelMessages : [];
        this.unread = obj ? obj.unread : false;
        this.participants = obj ? obj : [];
        this.channelIndex = obj ? obj.messageIndex : '';
    }

    public toJSON() {
        return {
            channelName: this.channelName,
            channelDescription: this.channelDescription,
            channelMessages: this.channelMessages,
            unread: this.unread,
            participants: this.participants,
            messageIndex: this.channelIndex
        }
    }
}