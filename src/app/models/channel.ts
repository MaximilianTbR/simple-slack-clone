export class Channel {
    channelName: string;
    channelDescription: string;
    channelMessages: Array<any>;
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
        console.log('function works!')
        return {
            channelName: this.channelName,
            channelDescription: this.channelDescription,
            channelMessages: this.channelMessages,
            unread: this.unread,
            participants: this.participants
        }
    }
}