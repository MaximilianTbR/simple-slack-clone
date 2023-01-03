export class User {
    userName: string;
    userId: string;
    userChannels: Array<any>;
    userMail: string;

    constructor(obj?: any) {
        this.userName = obj ? obj.channelName : '';
        this.userId = obj ? obj.channelDescription : '';
        this.userChannels = obj ? obj.channelMessages : [];
    }

    public toJSON() {
        return {
            userName: this.userName,
            userId: this.userId,
            userChannels: this.userChannels,
            userMail: this.userMail,
        }
    }
}