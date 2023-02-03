export class User {
    userName: string;
    userId: string;
    userMail: string;
    userChannels: Array<string>;
    isAdded: boolean;

    constructor(obj?: any) {
        this.userName = obj ? obj.userName : '';
        this.userId = obj ? obj.userId : '';
        this.userMail = obj ? obj.userMail : '';
        this.userChannels = obj ? obj.userChannels : [];
        this.isAdded = obj ? obj.isAdded : false;
    }

    public toJSON() {
        return {
            userName: this.userName,
            userId: this.userId,
            userMail: this.userMail,
            userChannels: this.userChannels,
            isAdded: this.isAdded
        }
    }
}