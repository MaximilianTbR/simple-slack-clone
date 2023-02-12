export class User {
    userName: string;
    userId: string;
    userMail: string;
    userChannels: Array<string>;
    isAdded: boolean;
    status: string;

    constructor(obj?: any) {
        this.userName = obj ? obj.userName : '';
        this.userId = obj ? obj.userId : '';
        this.userMail = obj ? obj.userMail : '';
        this.userChannels = obj ? obj.userChannels : [];
        this.isAdded = obj ? obj.isAdded : false;
        this.status = obj ? obj.status : '';
    }

    public toJSON() {
        return {
            userName: this.userName,
            userId: this.userId,
            userMail: this.userMail,
            userChannels: this.userChannels,
            isAdded: this.isAdded,
            status: this.status,
        }
    }
}