export class Channel {
    channelName: string;
    channelDescription: string;
    participants: Array<any>;
    //channelIndex: string;

    constructor(obj?: any) {
        this.channelName = obj ? obj.channelName : '';
        this.channelDescription = obj ? obj.channelDescription : '';
        this.participants = obj ? obj : [];
        //this.channelIndex = obj ? obj.messageIndex : '';
    }

    public toJSON() {
        return {
            channelName: this.channelName,
            channelDescription: this.channelDescription,
            participants: this.participants,
            //channelIndex: this.channelIndex
        }
    }
}