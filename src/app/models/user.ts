export class User {
    userName: string;
    userId: string;
    userMail: string;
    userChannels: Array<any>;

    constructor(obj?: any) {
        this.userName = obj ? obj.userName : '';
        this.userId = obj ? obj.userId : '';
        this.userMail = obj ? obj.userMail : '';
        this.userChannels = obj ? obj : [];
    }

    public toJSON() {
        return {
            userName: this.userName,
            userId: this.userId,
            userMail: this.userMail,
            userChannels: this.userChannels,
        }
    }
}