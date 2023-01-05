export class User {
    userName: string;
    userId: string;
    userChannels: Array<any>;
    userMessages: Array<any>;
    userMail: string;

    constructor(obj?: any) {
        this.userName = obj ? obj.userName : '';
        this.userId = obj ? obj.userId : '';
        this.userChannels = obj ? obj.userChannels : [];
        this.userMail = obj ? obj.userMail : '';
        this.userMessages = obj ? obj.userMessages : [];
    }

    public toJSON() {
        return {
            userName: this.userName,
            userId: this.userId,
            userChannels: this.userChannels,
            userMail: this.userMail,
            userMessages: this.userMessages
        }
    }
}