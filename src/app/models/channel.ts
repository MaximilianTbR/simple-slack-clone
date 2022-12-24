export class Channel {
    channelName: string;
    channelDescription: string;
    channelMessages: JSON;
    unread: boolean;
    participants: JSON;

    constructor(obj?: any) {
        this.channelName = obj ? obj.channelName : '';
        this.channelDescription = obj ? obj.channelDescription : '';
        this.channelMessages = obj ? obj.channelMessages : [];
        this.unread = obj ? obj.unread : false;
        this.participants = obj ? obj : [];
    }

    public toJSON() {
        return {
            channelName: this.channelName,
            channelDescription: this.channelDescription,
            channelMessages: this.channelMessages,
            unread: this.unread,
            participants: this.participants
        }
    }
}